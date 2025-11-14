// lib/supabaseClient.ts
import { createBrowserClient, createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase: SupabaseClient =
    typeof window !== "undefined"
        ? createBrowserClient(supabaseUrl, supabaseKey)
        : createServerClient(supabaseUrl, supabaseKey, {
            cookies: {} as any, // Next.js Client Component não usa cookies, fallback tranquilo
        });
