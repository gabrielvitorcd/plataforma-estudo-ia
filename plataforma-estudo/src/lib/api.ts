import { createClientBrowser } from "@/lib/supabaseBrowser";

// 🔹 Cliente do Supabase para obter sessão se necessário
const supabase = typeof window !== "undefined" ? createClientBrowser() : null;

export async function apiFetch<TResponse>(
    url: string,
    options: RequestInit = {}
): Promise<TResponse> {
    // 1. Token vindo do header manual
    const headerToken =
        options.headers instanceof Headers
            ? options.headers.get("Authorization")?.replace("Bearer ", "")
            : undefined;

    // 2. Token vindo do localStorage
    const localToken =
        typeof window !== "undefined"
            ? localStorage.getItem("access_token") || undefined
            : undefined;

    // 3. Tentativa de obter token do Supabase (session)
    let sessionToken: string | undefined;

    if (supabase) {
        try {
            const { data } = await supabase.auth.getSession();
            sessionToken = data.session?.access_token;
        } catch {
            sessionToken = undefined;
        }
    }

    // 🔥 Token mais confiável vence (prioridade do header > session > localstorage)
    const finalToken = headerToken || sessionToken || localToken;

    if (!finalToken) {
        console.error("❌ Nenhum token encontrado — usuário não autenticado.");
        throw new Error("Usuário não autenticado");
    }

    // 4. Chamada para o backend
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${finalToken}`,
            "Content-Type": "application/json",
        },
    });

    // 5. Tratamento de erro
    if (!res.ok) {
        const errorText = await res.text();
        console.error("Erro na API:", res.status, errorText);

        // 🔥 Se o backend retornou 401 → o token expirou
        if (res.status === 401) {
            console.warn("⚠️ Token expirado. Fazendo logout automático...");
            if (supabase) await supabase.auth.signOut();
            if (typeof window !== "undefined") {
                localStorage.removeItem("access_token");
            }
        }

        throw new Error(`Erro na API: ${res.status}`);
    }

    return res.json() as Promise<TResponse>;
}
