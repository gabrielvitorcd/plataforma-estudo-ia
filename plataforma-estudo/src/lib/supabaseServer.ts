// src/lib/supabaseServer.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClientServer() {
    // Em alguns ambientes do Next 16 o TypeScript acha que cookies() é uma Promise,
    // então fazemos um cast para any pra não ter erro de tipo.
    const cookieStore = cookies() as any;

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options?: any) {
                    cookieStore.set(name, value, options);
                },
                remove(name: string, options?: any) {
                    cookieStore.set(name, "", { maxAge: 0, ...options });
                },
            },
        }
    );
}
