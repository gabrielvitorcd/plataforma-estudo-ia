"use client";

import { useAuth } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
// import { apiFetch } from "@/lib/api";

// type ApiUser = {
//     id: string;
//     email: string;
//     role?: string;
// };

function DashboardContent() {
    const { user, signOut } = useAuth(); // 🎯 Hook customizado!
    const router = useRouter();
    // const [apiData, setApiData] = useState<ApiUser | null>(null);

    // useEffect(() => {
    //     // 🔹 Busca dados adicionais da API
    //     async function loadApiData() {
    //         try {
    //             const data = await apiFetch<ApiUser>("/users/me");
    //             setApiData(data);
    //         } catch (err) {
    //             console.error("Erro ao buscar dados da API:", err);
    //         }
    //     }
    //     loadApiData();
    // }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl text-center">
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

                <p className="mb-6 text-lg">
                    Bem-vindo, <strong>{user?.email}</strong> 👋
                </p>

                {/* {apiData && (
                    <div className="bg-gray-50 border rounded-lg p-4 text-left mb-8">
                        <p><strong>ID:</strong> {apiData.id}</p>
                        <p><strong>Email:</strong> {apiData.email}</p>
                        <p><strong>Role:</strong> {apiData.role ?? "authenticated"}</p>
                    </div>
                )}
 */}
                {/* Cards */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                    <button
                        onClick={() => router.push("/dashboard/enem")}
                        className="w-64 h-40 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-md"
                    >
                        <h2 className="text-2xl font-semibold mb-2">ENEM</h2>
                        <p className="text-sm opacity-90">Estudos e simulados</p>
                    </button>

                    <button
                        onClick={() => router.push("/dashboard/concursos")}
                        className="w-64 h-40 bg-red-600 hover:bg-red-700 text-white rounded-2xl shadow-md"
                    >
                        <h2 className="text-2xl font-semibold mb-2">Concursos</h2>
                        <p className="text-sm opacity-90">Preparação</p>
                    </button>
                </div>

                <button
                    onClick={signOut}
                    className="mt-10 bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900"
                >
                    Sair
                </button>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <DashboardContent />
        </ProtectedRoute>
    );
}