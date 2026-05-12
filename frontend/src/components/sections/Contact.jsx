import { useState } from "react";
import { Mail, MapPin, Phone, Send, Github, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { api, formatApiErrorDetail } from "../../lib/api";

export default function Contact({ profile, social }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [submitting, setSubmitting] = useState(false);

    const onChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            toast.error("Please fill in name, email and message.");
            return;
        }
        setSubmitting(true);
        try {
            await api.post("/contact", form);
            toast.success("Message sent. I'll get back to you soon.");
            setForm({ name: "", email: "", subject: "", message: "" });
        } catch (err) {
            toast.error(
                formatApiErrorDetail(err.response?.data?.detail) ||
                    "Could not send message. Please try again.",
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section
            id="contact"
            data-testid="contact-section"
            className="relative py-24 lg:py-32 border-t border-white/[0.06] overflow-hidden"
        >
            <div className="absolute inset-0 grid-bg grid-bg-fade opacity-50" aria-hidden />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-5">
                        <div className="font-mono text-xs text-cyan-500 uppercase tracking-[0.25em] mb-4">
                            07 — Contact
                        </div>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-white leading-[1.05] mb-6">
                            Let's design
                            <br />
                            <span className="text-cyan-500">your cloud.</span>
                        </h2>
                        <p className="text-zinc-400 leading-relaxed mb-10">
                            Open to AWS architecture reviews, EKS/SRE engagements,
                            DevSecOps consulting and full-time SRE roles. Send a note —
                            I read every message.
                        </p>

                        <ul className="space-y-4 font-mono text-sm">
                            <li className="flex items-center gap-3 text-zinc-300">
                                <span className="w-9 h-9 flex items-center justify-center border border-white/[0.08]">
                                    <Mail size={14} className="text-cyan-500" />
                                </span>
                                <a
                                    href={`mailto:${profile?.email}`}
                                    className="link-underline"
                                    data-testid="contact-email-link"
                                >
                                    {profile?.email}
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-zinc-300">
                                <span className="w-9 h-9 flex items-center justify-center border border-white/[0.08]">
                                    <Phone size={14} className="text-cyan-500" />
                                </span>
                                <span>{profile?.phone}</span>
                            </li>
                            <li className="flex items-center gap-3 text-zinc-300">
                                <span className="w-9 h-9 flex items-center justify-center border border-white/[0.08]">
                                    <MapPin size={14} className="text-cyan-500" />
                                </span>
                                <span>{profile?.location}</span>
                            </li>
                        </ul>

                        <div className="mt-8 flex items-center gap-3">
                            <a
                                href={social?.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid="contact-github"
                                className="w-10 h-10 flex items-center justify-center border border-white/10 text-zinc-400 hover:text-cyan-500 hover:border-cyan-500 transition-colors"
                                aria-label="GitHub"
                            >
                                <Github size={16} />
                            </a>
                            <a
                                href={social?.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid="contact-linkedin"
                                className="w-10 h-10 flex items-center justify-center border border-white/10 text-zinc-400 hover:text-cyan-500 hover:border-cyan-500 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={16} />
                            </a>
                        </div>
                    </div>

                    <form
                        onSubmit={onSubmit}
                        data-testid="contact-form"
                        className="lg:col-span-7 bg-[#070707] border border-white/[0.08] p-6 sm:p-8 lg:p-10"
                    >
                        <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-6">
                            // open: ~/messages/new.txt
                        </div>
                        <div className="grid sm:grid-cols-2 gap-5">
                            <FormField label="Name" htmlFor="contact-name">
                                <input
                                    id="contact-name"
                                    name="name"
                                    data-testid="contact-name-input"
                                    value={form.name}
                                    onChange={onChange}
                                    placeholder="Jane Doe"
                                    className="w-full bg-transparent border-b border-white/15 focus:border-cyan-500 outline-none py-2 text-white placeholder-zinc-600 font-mono text-sm transition-colors"
                                />
                            </FormField>
                            <FormField label="Email" htmlFor="contact-email">
                                <input
                                    id="contact-email"
                                    name="email"
                                    type="email"
                                    data-testid="contact-email-input"
                                    value={form.email}
                                    onChange={onChange}
                                    placeholder="jane@company.com"
                                    className="w-full bg-transparent border-b border-white/15 focus:border-cyan-500 outline-none py-2 text-white placeholder-zinc-600 font-mono text-sm transition-colors"
                                />
                            </FormField>
                        </div>
                        <div className="mt-5">
                            <FormField label="Subject" htmlFor="contact-subject">
                                <input
                                    id="contact-subject"
                                    name="subject"
                                    data-testid="contact-subject-input"
                                    value={form.subject}
                                    onChange={onChange}
                                    placeholder="EKS production readiness review"
                                    className="w-full bg-transparent border-b border-white/15 focus:border-cyan-500 outline-none py-2 text-white placeholder-zinc-600 font-mono text-sm transition-colors"
                                />
                            </FormField>
                        </div>
                        <div className="mt-5">
                            <FormField label="Message" htmlFor="contact-message">
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    data-testid="contact-message-input"
                                    value={form.message}
                                    onChange={onChange}
                                    placeholder="Tell me about your stack and the problem you're trying to solve…"
                                    rows={5}
                                    className="w-full bg-transparent border-b border-white/15 focus:border-cyan-500 outline-none py-2 text-white placeholder-zinc-600 font-mono text-sm resize-none transition-colors"
                                />
                            </FormField>
                        </div>
                        <div className="mt-8 flex items-center justify-between">
                            <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                                // emails delivered direct
                            </span>
                            <button
                                type="submit"
                                disabled={submitting}
                                data-testid="contact-submit-btn"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {submitting ? "Sending…" : "Send message"}
                                <Send size={14} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

function FormField({ label, htmlFor, children }) {
    return (
        <label htmlFor={htmlFor} className="block">
            <span className="block font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1">
                {label}
            </span>
            {children}
        </label>
    );
}
