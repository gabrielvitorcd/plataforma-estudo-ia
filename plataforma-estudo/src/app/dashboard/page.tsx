"use client";

import { useEffect, useState } from "react";
import { createClientBrowser } from "@/lib/supabaseBrowser";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

type ApiUser = {
    id: string;
    email: string;
    role?: string;
    access_token: string;
};

const supabase = createClientBrowser();

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
                const apiUser = await apiFetch<ApiUser>("/users/me");

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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl text-center">
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

                {userEmail && (
                    <>
                        <p className="mb-6 text-lg">
                            Bem-vindo, <strong>{userEmail}</strong> 👋
                        </p>

                        {userApiData ? (
                            <div className="bg-gray-50 border rounded-lg p-4 text-left mb-8">
                                <p><strong>ID:</strong> {userApiData.id}</p>
                                <p><strong>Email:</strong> {userApiData.email}</p>
                                <p><strong>Role:</strong> {userApiData.role ?? "authenticated"}</p>
                            </div>
                        ) : (
                            <p className="text-gray-600 mb-8">Carregando dados do servidor...</p>
                        )}

                        {/* Cards centralizados */}
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                            {/* Card ENEM */}
                            <button
                                onClick={() => router.push("/dashboard/enem")}
                                className="w-64 h-40 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-md transition-transform transform hover:-translate-y-1"
                            >
                                <h2 className="text-2xl font-semibold mb-2">ENEM</h2>
                                <p className="text-sm opacity-90">Estudos e simulados do ENEM</p>
                            </button>

                            {/* Card Concursos */}
                            <button
                                onClick={() => router.push("/dashboard/concursos")}
                                className="w-64 h-40 bg-red-600 hover:bg-red-700 text-white rounded-2xl shadow-md transition-transform transform hover:-translate-y-1"
                            >
                                <h2 className="text-2xl font-semibold mb-2">Concursos</h2>
                                <p className="text-sm opacity-90">Preparação para concursos</p>
                            </button>
                        </div>
                    </>
                )}

                <button
                    onClick={handleLogout}
                    className="mt-10 bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors"
                >
                    Sair
                </button>
            </div>
        </div>
    );

}
