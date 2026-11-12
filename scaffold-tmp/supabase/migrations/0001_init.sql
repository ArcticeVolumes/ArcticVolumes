-- Arctic Volumes: orders and inventory.
-- Products still live in code (src/content/site-content.ts) for now, so
-- these tables reference products by slug and size as plain text.

create type pack_type as enum ('single', 'pair');
create type order_status as enum ('pending', 'paid', 'confirmed', 'shipped', 'cancelled');

-- One stock pool per product and size. Color is chosen at order time, so it
-- is not part of inventory. A "pair" uses 2 units from the same pool.
create table inventory (
  product_slug text not null,
  size text not null,
  stock_units integer not null default 0 check (stock_units >= 0),
  updated_at timestamptz not null default now(),
  primary key (product_slug, size)
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  status order_status not null default 'pending',
  stripe_session_id text unique,
  stripe_payment_intent_id text,
  customer_email text,
  customer_name text,
  shipping_address jsonb,
  total_cents integer not null check (total_cents >= 0),
  currency text not null default 'cad',
  -- true when payment succeeded but stock could not be decremented
  -- (for example two customers bought the last unit at the same time)
  needs_review boolean not null default false,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_slug text not null,
  size text not null,
  pack pack_type not null,
  color text not null,
  quantity integer not null check (quantity > 0),
  -- inventory units this line consumes in total (pair = 2 per quantity)
  units integer not null check (units > 0),
  unit_price_cents integer not null check (unit_price_cents >= 0)
);

create index order_items_order_id_idx on order_items (order_id);

-- Row level security on, with no policies: the browser (publishable key)
-- cannot read or write these tables at all. Only server code using the
-- secret key can. Policies get added later only where we choose to.
alter table inventory enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Called by the Stripe webhook once payment succeeds. Runs as one atomic
-- step: locks the order, decrements stock, marks it paid. Safe to call
-- twice, because only a 'pending' order is processed.
create or replace function finalize_paid_order(
  p_order_id uuid,
  p_payment_intent text,
  p_email text,
  p_name text,
  p_address jsonb
) returns text
language plpgsql
as $$
declare
  v_status order_status;
  v_item record;
  v_review boolean := false;
begin
  select status into v_status from orders where id = p_order_id for update;
  if not found then
    return 'not_found';
  end if;
  if v_status <> 'pending' then
    return 'already_processed';
  end if;

  for v_item in
    select product_slug, size, sum(units)::int as units
    from order_items
    where order_id = p_order_id
    group by product_slug, size
  loop
    update inventory
    set stock_units = stock_units - v_item.units, updated_at = now()
    where product_slug = v_item.product_slug
      and size = v_item.size
      and stock_units >= v_item.units;
    if not found then
      v_review := true;
    end if;
  end loop;

  update orders
  set status = 'paid',
      paid_at = now(),
      stripe_payment_intent_id = p_payment_intent,
      customer_email = p_email,
      customer_name = p_name,
      shipping_address = p_address,
      needs_review = v_review
  where id = p_order_id;

  return case when v_review then 'paid_needs_review' else 'paid' end;
end;
$$;

revoke all on function finalize_paid_order(uuid, text, text, text, jsonb)
  from public, anon, authenticated;
