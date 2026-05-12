import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const PROJECT_IMAGES = [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80",
    "https://images.pexels.com/photos/16018144/pexels-photo-16018144.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/34803969/pexels-photo-34803969.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
];

// Bento sizing classes per index
const BENTO = [
    "md:col-span-2 md:row-span-2", // large
    "md:col-span-2 md:row-span-1", // wide
    "md:col-span-1 md:row-span-1", // small
    "md:col-span-1 md:row-span-2", // tall
];

export default function Projects({ projects }) {
    return (
        <section
            id="projects"
            data-testid="projects-section"
            className="relative py-24 lg:py-32 border-t border-white/[0.06]"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
                    <div>
                        <div className="font-mono text-xs text-cyan-500 uppercase tracking-[0.25em] mb-4">
                            04 — Selected Work
                        </div>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-white leading-[1.05]">
                            Production-grade outcomes.
                        </h2>
                    </div>
                    <p className="text-zinc-400 max-w-md text-sm font-mono">
                        // A small, opinionated set of platform and cloud projects with
                        clear, measurable business impact.
                    </p>
                </div>

                <div
                    className="grid md:grid-cols-3 md:auto-rows-[220px] gap-4 lg:gap-6"
                    data-testid="projects-grid"
                >
                    {projects?.map((p, i) => (
                        <motion.article
                            key={p.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            data-testid={`project-card-${i}`}
                            className={`${BENTO[i] || ""} group relative bg-[#0a0a0a] border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 overflow-hidden`}
                        >
                            {/* Background image */}
                            <div
                                className="absolute inset-0 opacity-25 group-hover:opacity-40 transition-opacity duration-500"
                                style={{
                                    backgroundImage: `url(${PROJECT_IMAGES[i % PROJECT_IMAGES.length]})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/85 to-[#0a0a0a]/30" />

                            <div className="relative h-full p-6 lg:p-8 flex flex-col justify-between">
                                <div className="flex items-start justify-between">
                                    <span className="font-mono text-[10px] text-cyan-500 uppercase tracking-widest">
                                        {String(i + 1).padStart(2, "0")} / 0
                                        {projects.length}
                                    </span>
                                    <ExternalLink
                                        size={16}
                                        className="text-zinc-600 group-hover:text-cyan-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <h3 className="font-display text-xl lg:text-2xl font-semibold text-white mb-2 tracking-tight">
                                        {p.title}
                                    </h3>
                                    <p className="text-sm text-zinc-400 leading-relaxed mb-4 max-w-md">
                                        {p.summary}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-mono text-[10px] text-cyan-500 px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/30 uppercase tracking-wider">
                                            {p.metric}
                                        </span>
                                        {p.tech.slice(0, 4).map((t) => (
                                            <span
                                                key={t}
                                                className="font-mono text-[10px] text-zinc-500 px-2 py-0.5 border border-white/[0.08] uppercase tracking-wider"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
