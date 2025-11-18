"use client";

import { useEffect, useState } from "react";

interface Topic {
    id: string;
    name: string;
}

export default function AdminMaterialPage() {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loadingTopics, setLoadingTopics] = useState(true);

    const [form, setForm] = useState({
        topic_id: "",
        title: "",
        source: "IA Internal Material Seed",
        content_url: "",
        summary: "",
        reading_time_min: "",
        difficulty_level: "1",
    });

    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");

    useEffect(() => {
        async function fetchTopics() {
            try {
                const res = await fetch("http://localhost:8000/topic/list");
                const data = await res.json();
                setTopics(data);
            } catch (err) {
                console.error("Erro ao buscar tópicos:", err);
            }
            setLoadingTopics(false);
        }
        fetchTopics();
    }, []);

    async function handleSubmit(e: any) {
        e.preventDefault();
        setLoading(true);
        setResponse("");

        const payload = {
            ...form,
            type: "teoria",
            reading_time_min: Number(form.reading_time_min),
            difficulty_level: Number(form.difficulty_level)
        };

        try {
            const res = await fetch("http://localhost:8000/study_material/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            setResponse(JSON.stringify(data, null, 2));
        } catch (error: any) {
            setResponse("Erro ao enviar: " + error.message);
        }

        setLoading(false);
    }

    return (
        <div className="max-w-2xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Admin — Criar Material de Estudo
            </h1>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-white p-6 rounded-xl shadow">

                {/* Topic Select */}
                <div className="flex flex-col gap-2">
                    <label className="font-medium text-gray-700">Selecione o Tópico</label>

                    {loadingTopics ? (
                        <div className="text-gray-600 text-sm">Carregando tópicos...</div>
                    ) : (
                        <select
                            className="p-3 border rounded-lg bg-gray-50 outline-none focus:border-indigo-500"
                            value={form.topic_id}
                            onChange={(e) => setForm({ ...form, topic_id: e.target.value })}
                            required
                        >
                            <option value="">Selecione...</option>
                            {topics.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                {/* Title */}
                <input
                    className="p-3 border rounded-lg bg-gray-50 outline-none focus:border-indigo-500"
                    placeholder="Título"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                />

                {/* Source */}
                <input
                    className="p-3 border rounded-lg bg-gray-50 outline-none focus:border-indigo-500"
                    placeholder="Fonte"
                    value={form.source}
                    onChange={(e) => setForm({ ...form, source: e.target.value })}
                />

                {/* Content URL */}
                <input
                    className="p-3 border rounded-lg bg-gray-50 outline-none focus:border-indigo-500"
                    placeholder="URL do conteúdo (ex: /materiais/operacoes)"
                    value={form.content_url}
                    onChange={(e) => setForm({ ...form, content_url: e.target.value })}
                />

                {/* Summary */}
                <textarea
                    className="p-3 border rounded-lg bg-gray-50 outline-none focus:border-indigo-500"
                    placeholder="Resumo"
                    rows={4}
                    value={form.summary}
                    onChange={(e) => setForm({ ...form, summary: e.target.value })}
                    required
                />

                {/* Reading Time */}
                <input
                    className="p-3 border rounded-lg bg-gray-50 outline-none focus:border-indigo-500"
                    placeholder="Tempo de leitura (min)"
                    type="number"
                    value={form.reading_time_min}
                    onChange={(e) => setForm({ ...form, reading_time_min: e.target.value })}
                    required
                />

                {/* Difficulty */}
                <select
                    className="p-3 border rounded-lg bg-gray-50 outline-none focus:border-indigo-500"
                    value={form.difficulty_level}
                    onChange={(e) => setForm({ ...form, difficulty_level: e.target.value })}
                >
                    <option value="1">1 - Básico</option>
                    <option value="2">2 - Intermediário</option>
                    <option value="3">3 - Avançado</option>
                </select>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition"
                >
                    {loading ? "Enviando..." : "Criar Material"}
                </button>
            </form>

            {/* Response */}
            {response && (
                <pre className="mt-8 bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                    {response}
                </pre>
            )}
        </div>
    );
}
