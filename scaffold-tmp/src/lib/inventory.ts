import "server-only";
import { supabaseAdmin } from "@/lib/supabase-admin";

// Stock per size for one product, e.g. { "24in": 9, "36in": 10 }.
// A size with no row counts as 0. Returns null if the lookup fails, so the
// page can still render (checkout does the real stock check anyway).
export type StockBySize = Record<string, number>;

export async function getStockForProduct(slug: string): Promise<StockBySize | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from("inventory")
      .select("size, stock_units")
      .eq("product_slug", slug);

    if (error || !data) {
      console.error("Stock lookup failed:", error?.message);
      return null;
    }

    const stock: StockBySize = {};
    for (const row of data) stock[row.size] = row.stock_units;
    return stock;
  } catch (err) {
    console.error("Stock lookup failed:", err);
    return null;
  }
}
