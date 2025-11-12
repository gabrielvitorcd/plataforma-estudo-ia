"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function EnemPage() {
    const [loading, setLoading] = useState(false);
    const [last, setLast] = useState<any>(null);

    async function startSession(subject_slug: string) {
        setLoading(true);
        const token = (await supabase.auth.getSession()).data.session?.access_token;
        const res = await fetch(`/api/proxy/study/enem/sessions?subject_slug=${subject_slug}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setLast(data);
        setLoading(false);
    }

    async function sendAttempt(subject_slug: string, correct: boolean) {
        setLoading(true);
        const token = (await supabase.auth.getSession()).data.session?.access_token;
        const res = await fetch(`/api/proxy/study/enem/attempts?subject_slug=${subject_slug}&correct=${correct}&duration_ms=25000`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setLast(data);
        setLoading(false);
    }

    return (
        <main className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">ENEM • Estudo</h1>
            <div className="flex gap-2">
                <button disabled={loading} onClick={() => startSession("matematica")} className="px-4 py-2 rounded bg-black text-white">Iniciar sessão (Matemática)</button>
                <button disabled={loading} onClick={() => sendAttempt("matematica", true)} className="px-4 py-2 rounded border">Registrar acerto</button>
                <button disabled={loading} onClick={() => sendAttempt("matematica", false)} className="px-4 py-2 rounded border">Registrar erro</button>
            </div>
            <pre className="bg-neutral-950 text-neutral-100 p-3 rounded">{JSON.stringify(last, null, 2)}</pre>
        </main>
    );
}
