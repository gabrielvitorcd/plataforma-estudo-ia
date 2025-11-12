"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            return;
        }

        setSuccess("Conta criada com sucesso! Você já pode entrar.");
        setTimeout(() => {
            router.push("/login");
        }, 1500);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleRegister}
                className="bg-white p-6 rounded shadow-md w-80"
            >
                <h1 className="text-2xl font-bold mb-4 text-center">Criar Conta</h1>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 rounded mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Senha"
                    className="w-full border p-2 rounded mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Criar Conta
                </button>

                <p className="text-sm text-center mt-3">
                    Já tem conta?{" "}
                    <a href="/login" className="text-blue-600 underline">
                        Entrar
                    </a>
                </p>
            </form>
        </div>
    );
}
