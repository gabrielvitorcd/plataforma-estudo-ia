"use client";

import { useEffect, useState } from "react";

interface Topic {
    id: string;
    name: string;
}

interface Track {
    id: string;
    name: string;
}

type SourceOption = {
    value: string;
    label: string;
}



export default function AdminMaterialPage() {
    const [track, setTrack] = useState<Track[]>([]);
    const [topics, setTopics] = useState<Topic[]>([]);
    const [sourceOptions, setSourceOptions] = useState<SourceOption[]>([]);
    const [loadingTopics, setLoadingTopics] = useState(true);

    const [form, setForm] = useState({
        topic_id: "",
        title: "",
        source: "",
        content_path: "",
        content_url_videos: "",
        summary: "",
        reading_time_min: "",
        difficulty_level: "1",
    });

    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");


    useEffect(() => {
        async function fetchTrack() {
            try {
                const res = await fetch("http://localhost:8000/track/list");
                const data = await res.json();
                setTrack(data);
            } catch (err) {
                console.error("Erro ao buscar track-list:", err);
            }
        } fetchTrack();
    }, []);

    useEffect(() => {
        async function fetchTopics() {
            try {
                const res = await fetch("http://localhost:8000/topic/list-enem");
                const data = await res.json();
                setTopics(data);
            } catch (err) {
                console.error("Erro ao buscar tópicos:", err);
            }
            setLoadingTopics(false);
        }
        fetchTopics();
    }, []);


    useEffect(() => {
        async function fetchSourceOptions() {
            try {
                const res = await fetch("http://localhost:8000/study_material/source-options");
                const data = await res.json();
                setSourceOptions(data);
            } catch (err) {
                console.log('Erro ao buscar source options', err);

            }
            //inserir setLoadingSourceOptions
        }
        fetchSourceOptions()
    }, [])

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
            <h1 className="text-3xl font-bold mb-6 text-white">
                Admin — Criar Material de Estudo
            </h1>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-purple-900 p-6 rounded-xl shadow">

                {/* Track Select */}
                <div>

                </div>





                {/* Topic Select */}
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Selecione o Tópico</label>

                    {loadingTopics ? (
                        <div className="text-gray-600 text-sm">Carregando tópicos...</div>
                    ) : (
                        <select
                            className="p-3 border rounded-lg bg-purple-400 outline-none focus:border-indigo-500"
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
                <div className="flex flex-col gap-2">
                    <label>Título do material</label>
                    <input
                        className="p-3 border rounded-lg bg-purple-400 outline-none focus:border-indigo-500"
                        placeholder="Título"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        required
                    />
                </div>

                {/* Source */}
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Selecione o tipo do material</label>
                    <select className="p-3 border rounded-lg bg-purple-400 outline-none focus:border-indigo-500"
                        value={form.source}
                        onChange={(e) => setForm({ ...form, source: e.target.value })}
                        required
                    >
                        <option value="">Selecione...</option>
                        {sourceOptions.map((t) => (
                            <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                    </select>
                </div>


                {/* Content Path */}
                {/* <input
                    className="p-3 border rounded-lg bg-gray-50 outline-none focus:border-indigo-500"
                    placeholder="URL do conteúdo (ex: /materiais/operacoes)"
                    value={form.content_}
                    onChange={(e) => setForm({ ...form, content_url: e.target.value })}
                /> */}

                {/* Content URL VIDEOS*/}
                {/* <textarea
                    className="p-3 border rounded-lg bg-gray-50 outline-none focus:border-indigo-500"
                    placeholder="Resumo"
                    rows={4}
                    value={form.summary}
                    onChange={(e) => setForm({ ...form, summary: e.target.value })}
                    required
                /> */}

                {/* Reading Time */}
                {/* <input
                    className="p-3 border rounded-lg bg-gray-50 outline-none focus:border-indigo-500"
                    placeholder="Tempo de leitura (min)"
                    type="number"
                    value={form.reading_time_min}
                    onChange={(e) => setForm({ ...form, reading_time_min: e.target.value })}
                    required
                /> */}

                {/* Difficulty */}
                {/* <select
                    className="p-3 border rounded-lg bg-gray-50 outline-none focus:border-indigo-500"
                    value={form.difficulty_level}
                    onChange={(e) => setForm({ ...form, difficulty_level: e.target.value })}
                >
                    <option value="1">1 - Básico</option>
                    <option value="2">2 - Intermediário</option>
                    <option value="3">3 - Avançado</option>
                </select> */}

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
