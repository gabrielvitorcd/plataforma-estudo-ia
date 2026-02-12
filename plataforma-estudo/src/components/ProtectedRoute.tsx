"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

type ProtectedRouteProps = {
    children: React.ReactNode;
    fallback?: React.ReactNode;
};

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
    const { user, loading, error } = useAuth();
    const router = useRouter();

    if (loading) {
        return fallback ?? (
            <div className="flex items-center justify-center h-screen">
                <p>Carregando...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                    onClick={() => router.push("/login")}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Ir para login
                </button>
            </div>
        );
    }

    if (!user) {
        router.push("/login");
        return null;
    }

    return <>{children}</>;
}