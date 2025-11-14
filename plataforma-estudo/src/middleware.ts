// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
    // Criar resposta que pode manipular cookies
    const res = NextResponse.next();

    // Cliente do Supabase **específico para middleware**
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return req.cookies.get(name)?.value;
                },
                set(name: string, value: string, options: any) {
                    // Cookies precisam ser setados no response
                    res.cookies.set(name, value, options);
                },
                remove(name: string, options: any) {
                    res.cookies.set(name, "", {
                        maxAge: 0,
                        ...options,
                    });
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const url = req.nextUrl.clone();

    // Rota protegida
    if (!user && url.pathname.startsWith("/dashboard")) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    // Se já está logado e tentar acessar login ou register → redireciona
    if (user && ["/login", "/register"].includes(url.pathname)) {
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
    }

    return res;
}

export const config = {
    matcher: ["/dashboard/:path*", "/login", "/register"],
};
