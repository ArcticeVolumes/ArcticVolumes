import "server-only";
import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client using the SECRET key. It bypasses row level
// security, so it must never run in the browser. The "server-only" import
// makes the build fail if a client component imports this file.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!url || !secretKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY. Add them to .env.local."
  );
}

export const supabaseAdmin = createClient(url, secretKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
