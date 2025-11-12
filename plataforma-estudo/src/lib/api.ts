// src/lib/api.ts
export async function apiFetch<TResponse>(
    url: string,
    options: RequestInit = {},
    accessToken?: string
): Promise<TResponse> {
    const token = accessToken;

    if (!token) {
        console.error("❌ Nenhum token encontrado — usuário não autenticado.");
        throw new Error("Usuário não autenticado");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`, // 🔹 Header que o backend espera
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error("Erro na API:", res.status, errorText);
        throw new Error(`Erro na API: ${res.status}`);
    }

    return res.json() as Promise<TResponse>;
}
