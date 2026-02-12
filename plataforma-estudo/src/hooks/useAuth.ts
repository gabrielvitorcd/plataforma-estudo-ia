import { useEffect, useState } from "react";
import { createClientBrowser } from "@/lib/supabaseBrowser";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

type UseAuthReturn = {
    user: User | null;
    loading: boolean;
    error: string | null;
    signOut: () => Promise<void>;
};

export function useAuth(): UseAuthReturn {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const supabase = createClientBrowser();

    useEffect(() => {
        let isMounted = true;

        async function checkAuth() {
            try {
                const { data: sessionData } = await supabase.auth.getSession();

                if (!sessionData.session) {
                    router.push("/login");
                    return;
                }

                const { data: userData, error: userError } = await supabase.auth.getUser();

                if (userError || !userData.user) {
                    setError("Erro ao carregar usuário");
                    router.push("/login");
                    return;
                }

                if (isMounted) {
                    setUser(userData.user);
                    setError(null);
                }

            } catch (err) {
                console.error("Erro na autenticação:", err);
                if (isMounted) {
                    setError("Erro ao conectar com o servidor");
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        checkAuth();

        const { data: listener } = supabase.auth.onAuthStateChange(() => {
            checkAuth();
        });

        return () => {
            isMounted = false;
            listener.subscription.unsubscribe();
        };
    }, [router, supabase]);

    const signOut = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    return { user, loading, error, signOut };
}