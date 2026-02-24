// src/lib/supabaseServer.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClientServer() {
    // In Next.js 15/16, cookies() must be awaited
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options?: any) {
                    // Note: In Server Components, you typically can't SET 
                    // cookies directly unless it's an Action or Route Handler.
                    try {
                        cookieStore.set(name, value, options);
                    } catch (error) {
                        // Handle server component set restrictions if necessary
                    }
                },
                remove(name: string, options?: any) {
                    try {
                        cookieStore.set(name, "", { maxAge: 0, ...options });
                    } catch (error) {
                        // Handle server component delete restrictions if necessary
                    }
                },
            },
        }
    );
}