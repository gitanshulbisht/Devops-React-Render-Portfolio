import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";

export default function Experience({ experience }) {
    return (
        <section
            id="experience"
            data-testid="experience-section"
            className="relative py-24 lg:py-32 border-t border-white/[0.06]"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-14">
                    <div className="font-mono text-xs text-cyan-500 uppercase tracking-[0.25em] mb-4">
                        03 — Trajectory
                    </div>
                    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-white leading-[1.05]">
                        Seven years on call.
                    </h2>
                </div>

                <div className="relative">
                    <div className="absolute left-0 sm:left-[140px] top-0 bottom-0 w-px bg-white/[0.08]" />
                    <ul className="space-y-12">
                        {experience?.map((job, i) => (
                            <motion.li
                                key={`${job.company}-${i}`}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                data-testid={`experience-item-${i}`}
                                className="relative pl-6 sm:pl-[170px]"
                            >
                                <div className="absolute left-[-4px] sm:left-[133px] top-1.5 w-2.5 h-2.5 bg-cyan-500" />
                                <div className="hidden sm:block absolute left-0 top-0 font-mono text-xs text-zinc-500 uppercase tracking-wider">
                                    {job.start}
                                    <br />
                                    <span className="text-zinc-700">→ {job.end}</span>
                                </div>
                                <div className="sm:hidden font-mono text-xs text-zinc-500 mb-2">
                                    {job.start} → {job.end}
                                </div>
                                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-white">
                                        {job.role}
                                    </h3>
                                    <span className="text-cyan-500 font-mono text-sm">
                                        @ {job.company}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 mb-4 text-xs text-zinc-500 font-mono">
                                    <span className="inline-flex items-center gap-1">
                                        <MapPin size={11} /> {job.location}
                                    </span>
                                    <span className="inline-flex items-center gap-1">
                                        <Briefcase size={11} /> Full-time
                                    </span>
                                </div>
                                <ul className="space-y-2">
                                    {job.highlights.map((h, idx) => (
                                        <li
                                            key={idx}
                                            className="flex gap-3 text-zinc-400 leading-relaxed text-sm sm:text-[15px]"
                                        >
                                            <span className="text-cyan-500 font-mono shrink-0 mt-0.5">
                                                ›
                                            </span>
                                            <span>{h}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
