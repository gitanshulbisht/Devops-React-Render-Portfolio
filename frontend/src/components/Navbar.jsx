import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Terminal } from "lucide-react";

const sections = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "certs", label: "Certs" },
    { id: "blog", label: "Writings" },
    { id: "contact", label: "Contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const onHome = location.pathname === "/";

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToSection = (id) => {
        setOpen(false);
        if (!onHome) {
            navigate("/");
            // wait for Home to mount before scrolling
            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
            return;
        }
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <nav
            data-testid="navbar"
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-black/70 backdrop-blur-xl border-b border-white/[0.06]"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link
                        to="/"
                        data-testid="nav-logo"
                        className="flex items-center gap-2 text-white"
                    >
                        <Terminal className="w-5 h-5 text-cyan-500" />
                        <span className="font-mono text-sm tracking-tight">
                            <span className="text-cyan-500">~</span>/anshul.bisht
                            <span className="text-cyan-500"> $</span>
                        </span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-1">
                        {sections.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => scrollToSection(s.id)}
                                data-testid={`nav-link-${s.id}`}
                                className="px-3 py-1.5 text-sm text-zinc-400 hover:text-cyan-500 transition-colors font-mono"
                            >
                                {s.label}
                            </button>
                        ))}
                        <Link
                            to="/blog"
                            data-testid="nav-blog"
                            className="px-3 py-1.5 text-sm text-zinc-400 hover:text-cyan-500 transition-colors font-mono"
                        >
                            Blog
                        </Link>
                        <a
                            href={`${process.env.PUBLIC_URL}/Anshul_Bisht_Resume.docx`}
                            download
                            data-testid="nav-resume-download"
                            className="ml-4 inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                        >
                            <span>Resume</span>
                            <span className="text-base">↓</span>
                        </a>
                    </div>

                    <button
                        data-testid="nav-mobile-toggle"
                        onClick={() => setOpen(!open)}
                        className="lg:hidden text-white p-2"
                        aria-label="Toggle menu"
                    >
                        {open ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {open && (
                <div
                    data-testid="nav-mobile-menu"
                    className="lg:hidden bg-black/95 border-t border-white/[0.06] backdrop-blur-xl"
                >
                    <div className="px-4 py-4 flex flex-col gap-1">
                        {sections.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => scrollToSection(s.id)}
                                className="text-left px-3 py-2 text-zinc-300 hover:text-cyan-500 font-mono text-sm"
                            >
                                {s.label}
                            </button>
                        ))}
                        <Link
                            to="/blog"
                            onClick={() => setOpen(false)}
                            className="px-3 py-2 text-zinc-300 hover:text-cyan-500 font-mono text-sm"
                        >
                            Blog
                        </Link>
                        <a
                            href={`${process.env.PUBLIC_URL}/Anshul_Bisht_Resume.docx`}
                            download
                            className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 bg-cyan-500 text-black font-mono text-xs font-bold uppercase tracking-wider"
                        >
                            Resume ↓
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
