import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Terminal, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminLogin() {
    const { login, user, ready } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    if (ready && user && user !== false) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const res = await login(email.trim().toLowerCase(), password);
        setLoading(false);
        if (res.ok) {
            navigate("/admin/dashboard");
        } else {
            setError(res.error);
        }
    };

    return (
        <div
            data-testid="admin-login-page"
            className="min-h-screen flex items-center justify-center px-4 grid-bg relative"
        >
            <div className="absolute inset-0 grid-bg-fade pointer-events-none" />
            <div className="relative w-full max-w-md">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 font-mono text-xs text-zinc-500 hover:text-cyan-500 transition-colors uppercase tracking-widest mb-8"
                >
                    <ArrowLeft size={14} /> back to site
                </Link>
                <div className="bg-[#0a0a0a] border border-white/[0.08] p-8">
                    <div className="flex items-center gap-2 mb-2">
                        <Terminal className="w-4 h-4 text-cyan-500" />
                        <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                            ssh admin@portfolio
                        </span>
                    </div>
                    <h1 className="font-display text-2xl font-bold text-white mb-1">
                        Admin Console
                    </h1>
                    <p className="font-mono text-xs text-zinc-500 mb-8">
                        Authenticate to view submissions & manage posts.
                    </p>

                    <form onSubmit={onSubmit} className="space-y-5">
                        <div>
                            <label
                                htmlFor="login-email"
                                className="block font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1"
                            >
                                Email
                            </label>
                            <input
                                id="login-email"
                                data-testid="login-email-input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@anshulbisht.dev"
                                className="w-full bg-transparent border-b border-white/15 focus:border-cyan-500 outline-none py-2 text-white placeholder-zinc-600 font-mono text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="login-password"
                                className="block font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1"
                            >
                                Password
                            </label>
                            <input
                                id="login-password"
                                data-testid="login-password-input"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-transparent border-b border-white/15 focus:border-cyan-500 outline-none py-2 text-white placeholder-zinc-600 font-mono text-sm"
                                required
                            />
                        </div>

                        {error && (
                            <p
                                data-testid="login-error"
                                className="font-mono text-xs text-red-400"
                            >
                                ✗ {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            data-testid="login-submit-btn"
                            disabled={loading}
                            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white disabled:opacity-50 transition-colors"
                        >
                            {loading ? "Authenticating…" : "Authenticate"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
