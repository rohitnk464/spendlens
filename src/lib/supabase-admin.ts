import { createClient } from "@supabase/supabase-js";

// This client bypasses Row Level Security (RLS) entirely.
// It should ONLY be used in secure server environments (API routes, Server Components).
// NEVER expose this client or the SUPABASE_SERVICE_ROLE_KEY to the browser.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder_key",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
