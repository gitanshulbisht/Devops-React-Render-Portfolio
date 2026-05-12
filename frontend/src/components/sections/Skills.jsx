import { motion } from "framer-motion";

export default function Skills({ skills }) {
    return (
        <section
            id="skills"
            data-testid="skills-section"
            className="relative py-24 lg:py-32 border-t border-white/[0.06]"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
                    <div>
                        <div className="font-mono text-xs text-cyan-500 uppercase tracking-[0.25em] mb-4">
                            02 — Stack
                        </div>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-white leading-[1.05]">
                            The tools I reach for.
                        </h2>
                    </div>
                    <p className="text-zinc-400 max-w-md font-mono text-sm">
                        // Categorized by where they live in the platform lifecycle —
                        from cloud primitives to GitOps, observability and DevSecOps.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06]">
                    {skills?.map((group, i) => (
                        <motion.div
                            key={group.category}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: (i % 4) * 0.05 }}
                            data-testid={`skill-group-${i}`}
                            className="bg-[#070707] p-6 lg:p-8 hover:bg-[#0a0a0a] transition-colors group"
                        >
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="font-display text-lg font-semibold text-white">
                                    {group.category}
                                </h3>
                                <span className="font-mono text-[10px] text-zinc-600 tracking-widest">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                            </div>
                            <ul className="flex flex-wrap gap-1.5">
                                {group.items.map((item) => (
                                    <li
                                        key={item}
                                        className="font-mono text-xs text-zinc-400 px-2.5 py-1 border border-white/[0.08] hover:border-cyan-500/60 hover:text-cyan-400 transition-colors"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
