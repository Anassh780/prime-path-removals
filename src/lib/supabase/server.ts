import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Server-side Supabase client.
 *
 * Prefers the service-role key (server only — never exposed to the browser).
 * Returns null when Supabase is not configured, so callers can respond with an
 * honest "not connected" error instead of faking a successful submission.
 */
export function getSupabaseServerClient(): SupabaseClient | null {
  if (!supabaseUrl) return null;
  const key = serviceRoleKey ?? anonKey;
  if (!key) return null;

  return createClient(supabaseUrl, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const isSupabaseConfigured = Boolean(
  supabaseUrl && (serviceRoleKey ?? anonKey),
);
