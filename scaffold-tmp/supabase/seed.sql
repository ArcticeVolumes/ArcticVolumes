-- Test stock for development only. Real stock is set by the friend later
-- (admin panel). A missing row means 0 in stock, so the item cannot be bought.
insert into inventory (product_slug, size, stock_units) values
  ('bowtie', '12in', 10),
  ('bowtie', '24in', 10),
  ('bowtie', '36in', 10),
  ('bowtie', '48in', 10),
  ('bowtie', '60in', 10),
  ('bowtie', '72in', 10),
  ('split-rombus-trombus', '24in', 10),
  ('split-rombus-trombus', '36in', 10),
  ('split-rombus-trombus', '48in', 10),
  ('split-rombus-trombus', '60in', 10),
  ('split-rombus-trombus', '72in', 10)
on conflict (product_slug, size) do update set stock_units = excluded.stock_units;
