"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

type ApiUser = {
    id: string;
    email: string;
    role?: string;
    access_token: string;
};

export default function DashboardPage() {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userApiData, setUserApiData] = useState<ApiUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function loadUser() {
            let redirecting = false;
            try {
                // 🔹 Aguarda sessão do Supabase
                const { data: sessionData } = await supabase.auth.getSession();
                const session = sessionData?.session;

                console.log("🔑 Sessão atual:", session);

                if (!session) {
                    redirecting = true;
                    setError(null);
                    router.push("/login");
                    return;
                }

                // 🔹 Usuário atual
                const { data: userData } = await supabase.auth.getUser();
                const user = userData?.user;

                if (!user) {
                    setError("Usuário não autenticado. Redirecionando...");
                    router.push("/login");
                    return;
                }

                setUserEmail(user.email ?? null);

                // 🔹 Chamada autenticada para FastAPI
                const apiUser = await apiFetch<ApiUser>(
                    "/users/me",
                    undefined,
                    session.access_token
                );
                if (isMounted) setUserApiData(apiUser);
            } catch (err: unknown) {
                console.error(
                    "❌ Erro ao carregar dashboard:",
                    err instanceof Error ? err : String(err)
                );
                setError("Erro ao conectar com o servidor.");
            } finally {
                if (isMounted && !redirecting) setLoading(false);
            }
        }

        // Carrega dados ao montar
        loadUser();

        // 🔄 Recarrega quando o estado de autenticação mudar
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log("🔄 Auth state change:", _event, session);
            loadUser();
        });

        return () => {
            isMounted = false;
            listener.subscription.unsubscribe();
        };
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Carregando...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <div className="bg-white p-6 rounded shadow w-96 text-center">
                    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={() => router.push("/login")}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Ir para login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow w-96 text-center">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

                {userEmail && (
                    <>
                        <p className="mb-2">
                            Bem-vindo, <strong>{userEmail}</strong> 👋
                        </p>

                        {userApiData ? (
                            <div className="bg-gray-50 border rounded p-3 text-left mt-4">
                                <p><strong>ID:</strong> {userApiData.id}</p>
                                <p><strong>Email:</strong> {userApiData.email}</p>
                                <p><strong>Role:</strong> {userApiData.role ?? "authenticated"}</p>
                                <p className="mt-2 text-xs break-all"><strong>Token:</strong> {userApiData.access_token}</p>
                            </div>
                        ) : (
                            <p className="text-gray-600 mt-4">Carregando dados do servidor...</p>
                        )}
                    </>
                )}

                <button
                    onClick={handleLogout}
                    className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    Sair
                </button>
            </div>
        </div>
    );
}
