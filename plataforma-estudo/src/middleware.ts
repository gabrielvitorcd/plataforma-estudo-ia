import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();

    // Cria um cliente do Supabase que entende os cookies da sessão
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return req.cookies.get(name)?.value;
                },
            },
        }
    );

    const { data, error: authError } = await supabase.auth.getUser();
    if (authError) {
        console.error("Supabase middleware auth error:", authError.message);
    }
    const user = data?.user;
    const url = req.nextUrl.clone();

    // 🚫 Redireciona se não estiver logado e tentar acessar /dashboard
    if (!user && url.pathname.startsWith("/dashboard")) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    // 🔁 Redireciona se já estiver logado e tentar acessar /login ou /register
    if (user && ["/login", "/register"].includes(url.pathname)) {
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
    }

    return res;
}

export const config = {
    matcher: ["/dashboard/:path*", "/login", "/register"],
};
