import { createContext, useContext, useEffect, useState } from "react";
import { api, formatApiErrorDetail } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // null = loading
    const [ready, setReady] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await api.get("/auth/me");
                setUser(data);
            } catch {
                setUser(false);
            } finally {
                setReady(true);
            }
        })();
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await api.post("/auth/login", { email, password });
            if (data?.access_token) {
                localStorage.setItem("access_token", data.access_token);
            }
            setUser(data.user);
            return { ok: true };
        } catch (e) {
            return {
                ok: false,
                error: formatApiErrorDetail(e.response?.data?.detail) || e.message,
            };
        }
    };

    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } catch {
            /* ignore */
        }
        localStorage.removeItem("access_token");
        setUser(false);
    };

    return (
        <AuthContext.Provider value={{ user, ready, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
