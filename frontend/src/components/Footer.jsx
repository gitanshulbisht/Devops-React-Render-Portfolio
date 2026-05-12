import { Link } from "react-router-dom";

export default function Footer({ profile }) {
    const year = new Date().getFullYear();
    return (
        <footer
            data-testid="footer"
            className="relative border-t border-white/[0.06] py-10"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="font-mono text-xs text-zinc-500">
                        © {year} {profile?.name || "Anshul Bisht"} ·{" "}
                        <span className="text-cyan-500">all systems nominal</span>
                    </div>
                    <div className="font-mono text-xs text-zinc-600 flex items-center gap-4">
                        <span>built with React · FastAPI · Mongo</span>
                        <Link
                            to="/admin/login"
                            data-testid="footer-admin-link"
                            className="hover:text-cyan-500 transition-colors"
                        >
                            admin
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
