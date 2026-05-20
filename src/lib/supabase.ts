import { createBrowserClient as createSupabaseBrowserClient } from '@supabase/ssr';
import {
  createServerClient as createSupabaseServerClient,
  type CookieMethodsServer,
} from '@supabase/ssr';
import { cookies } from 'next/headers';

// ─────────────────────────────────────────────────────────────────────
// Browser client (Client Components)
// ─────────────────────────────────────────────────────────────────────

/**
 * Create a Supabase client for use in Client Components (browser).
 * Uses a singleton pattern — safe to call multiple times.
 */
export function createBrowserClient() {
  return createSupabaseBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

// ─────────────────────────────────────────────────────────────────────
// Server client (Server Components, Server Actions, Route Handlers)
// ─────────────────────────────────────────────────────────────────────

/**
 * Create a Supabase client for use in Server Components, Server Actions,
 * and Route Handlers. Must be called per-request — never cache across requests.
 *
 * Uses the `getAll` / `setAll` cookie methods recommended by @supabase/ssr.
 * `cookies()` is async in Next.js 15+.
 */
export async function createServerClient() {
  const cookieStore = await cookies();

  return createSupabaseServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // `setAll` can throw in Server Components when headers are
            // read-only. This is expected — the middleware will handle
            // refreshing the session cookie instead.
          }
        },
      } satisfies CookieMethodsServer,
    },
  );
}
