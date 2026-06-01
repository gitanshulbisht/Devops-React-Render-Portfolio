import { useEffect, useState } from "react";
import { api, formatApiErrorDetail } from "../lib/api";
import { toast } from "sonner";
import { Plus, Trash2, Save, ChevronDown, ChevronUp } from "lucide-react";

const SECTIONS = [
    { id: "profile", label: "Profile" },
    { id: "stats", label: "Stats" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "certifications", label: "Certifications" },
    { id: "education", label: "Education" },
    { id: "social", label: "Social" },
];

export default function PortfolioEditor() {
    const [data, setData] = useState(null);
    const [active, setActive] = useState("profile");
    const [saving, setSaving] = useState(false);

    const load = async () => {
        try {
            const { data } = await api.get("/admin/portfolio");
            setData(data);
        } catch (e) {
            toast.error(formatApiErrorDetail(e.response?.data?.detail));
        }
    };

    useEffect(() => {
        load();
    }, []);

    const saveSection = async (sectionId, value) => {
        setSaving(true);
        try {
            await api.put(`/admin/portfolio/${sectionId}`, { data: value });
            setData((d) => ({ ...d, [sectionId]: value }));
            toast.success(`${sectionId} updated`);
        } catch (e) {
            toast.error(formatApiErrorDetail(e.response?.data?.detail));
        } finally {
            setSaving(false);
        }
    };

    if (!data)
        return (
            <div className="font-mono text-sm text-zinc-500 p-8 border border-white/[0.08]">
                loading content…
            </div>
        );

    return (
        <div data-testid="portfolio-editor">
            <div className="flex flex-wrap items-center gap-1 border-b border-white/[0.08] mb-6">
                {SECTIONS.map((s) => (
                    <button
                        key={s.id}
                        onClick={() => setActive(s.id)}
                        data-testid={`portfolio-subtab-${s.id}`}
                        className={`px-4 py-2 font-mono text-[11px] uppercase tracking-widest border-b-2 transition-colors ${
                            active === s.id
                                ? "border-cyan-500 text-cyan-500"
                                : "border-transparent text-zinc-500 hover:text-zinc-300"
                        }`}
                    >
                        {s.label}
                    </button>
                ))}
            </div>

            {active === "profile" && (
                <ProfileForm
                    value={data.profile}
                    onSave={(v) => saveSection("profile", v)}
                    saving={saving}
                />
            )}
            {active === "stats" && (
                <ArrayForm
                    title="Stats"
                    items={data.stats || []}
                    schema={[
                        { name: "label", label: "Label", type: "text" },
                        { name: "value", label: "Value", type: "text" },
                    ]}
                    empty={{ label: "", value: "" }}
                    onSave={(v) => saveSection("stats", v)}
                    saving={saving}
                    renderTitle={(it) => `${it.value || "—"} · ${it.label || ""}`}
                />
            )}
            {active === "skills" && (
                <ArrayForm
                    title="Skill Categories"
                    items={data.skills || []}
                    schema={[
                        { name: "category", label: "Category", type: "text" },
                        { name: "items", label: "Items (comma separated)", type: "csv" },
                    ]}
                    empty={{ category: "", items: [] }}
                    onSave={(v) => saveSection("skills", v)}
                    saving={saving}
                    renderTitle={(it) =>
                        `${it.category || "—"} (${it.items?.length || 0})`
                    }
                />
            )}
            {active === "experience" && (
                <ArrayForm
                    title="Experience"
                    items={data.experience || []}
                    schema={[
                        { name: "company", label: "Company", type: "text" },
                        { name: "role", label: "Role", type: "text" },
                        { name: "location", label: "Location", type: "text" },
                        { name: "start", label: "Start", type: "text" },
                        { name: "end", label: "End", type: "text" },
                        {
                            name: "highlights",
                            label: "Highlights (one per line)",
                            type: "lines",
                        },
                    ]}
                    empty={{
                        company: "",
                        role: "",
                        location: "",
                        start: "",
                        end: "",
                        highlights: [],
                    }}
                    onSave={(v) => saveSection("experience", v)}
                    saving={saving}
                    renderTitle={(it) =>
                        `${it.role || "—"} @ ${it.company || "—"}`
                    }
                />
            )}
            {active === "projects" && (
                <ArrayForm
                    title="Projects"
                    items={data.projects || []}
                    schema={[
                        { name: "title", label: "Title", type: "text" },
                        { name: "summary", label: "Summary", type: "textarea" },
                        { name: "tech", label: "Tech (comma separated)", type: "csv" },
                        { name: "metric", label: "Metric / Outcome", type: "text" },
                        {
                            name: "size",
                            label: "Card size",
                            type: "select",
                            options: ["large", "wide", "small", "tall"],
                        },
                    ]}
                    empty={{
                        title: "",
                        summary: "",
                        tech: [],
                        metric: "",
                        size: "small",
                    }}
                    onSave={(v) => saveSection("projects", v)}
                    saving={saving}
                    renderTitle={(it) => it.title || "—"}
                />
            )}
            {active === "certifications" && (
                <ArrayForm
                    title="Certifications"
                    items={data.certifications || []}
                    schema={[
                        { name: "name", label: "Name", type: "text" },
                        { name: "issuer", label: "Issuer", type: "text" },
                        {
                            name: "status",
                            label: "Status",
                            type: "select",
                            options: ["Active", "In Progress", "Planned"],
                        },
                        { name: "year", label: "Year", type: "text" },
                    ]}
                    empty={{ name: "", issuer: "", status: "Planned", year: "" }}
                    onSave={(v) => saveSection("certifications", v)}
                    saving={saving}
                    renderTitle={(it) => it.name || "—"}
                />
            )}
            {active === "education" && (
                <ArrayForm
                    title="Education"
                    items={data.education || []}
                    schema={[
                        { name: "degree", label: "Degree", type: "text" },
                        { name: "institution", label: "Institution", type: "text" },
                        { name: "year", label: "Year", type: "text" },
                    ]}
                    empty={{ degree: "", institution: "", year: "" }}
                    onSave={(v) => saveSection("education", v)}
                    saving={saving}
                    renderTitle={(it) => it.degree || "—"}
                />
            )}
            {active === "social" && (
                <SocialForm
                    value={data.social || {}}
                    onSave={(v) => saveSection("social", v)}
                    saving={saving}
                />
            )}
        </div>
    );
}

// ------------------- Profile -------------------
function ProfileForm({ value, onSave, saving }) {
    const [form, setForm] = useState(value);
    useEffect(() => setForm(value), [value]);

    const update = (k, v) => setForm({ ...form, [k]: v });

    return (
        <div className="border border-white/[0.08] p-6 space-y-5 max-w-3xl">
            <FieldText
                label="Name"
                value={form.name || ""}
                onChange={(v) => update("name", v)}
            />
            <FieldText
                label="Role"
                value={form.role || ""}
                onChange={(v) => update("role", v)}
            />
            <FieldText
                label="Tagline"
                value={form.tagline || ""}
                onChange={(v) => update("tagline", v)}
            />
            <FieldText
                label="Location"
                value={form.location || ""}
                onChange={(v) => update("location", v)}
            />
            <FieldText
                label="Email"
                value={form.email || ""}
                onChange={(v) => update("email", v)}
            />
            <FieldText
                label="Phone"
                value={form.phone || ""}
                onChange={(v) => update("phone", v)}
            />
            <FieldText
                label="Years experience"
                value={String(form.years_experience ?? "")}
                onChange={(v) =>
                    update("years_experience", v === "" ? "" : Number(v) || v)
                }
            />
            <FieldTextarea
                label="Summary"
                value={form.summary || ""}
                onChange={(v) => update("summary", v)}
                rows={5}
            />
            <SaveBar onSave={() => onSave(form)} saving={saving} />
        </div>
    );
}

// ------------------- Social -------------------
function SocialForm({ value, onSave, saving }) {
    const [form, setForm] = useState(value);
    useEffect(() => setForm(value), [value]);
    const update = (k, v) => setForm({ ...form, [k]: v });
    return (
        <div className="border border-white/[0.08] p-6 space-y-5 max-w-3xl">
            <FieldText
                label="GitHub URL"
                value={form.github || ""}
                onChange={(v) => update("github", v)}
            />
            <FieldText
                label="LinkedIn URL"
                value={form.linkedin || ""}
                onChange={(v) => update("linkedin", v)}
            />
            <FieldText
                label="Public email"
                value={form.email || ""}
                onChange={(v) => update("email", v)}
            />
            <SaveBar onSave={() => onSave(form)} saving={saving} />
        </div>
    );
}

// ------------------- Generic Array Editor -------------------
function ArrayForm({
    title,
    items,
    schema,
    empty,
    onSave,
    saving,
    renderTitle,
}) {
    const [list, setList] = useState(items);
    const [openIdx, setOpenIdx] = useState(-1);

    useEffect(() => setList(items), [items]);

    const update = (idx, key, val) => {
        const copy = [...list];
        copy[idx] = { ...copy[idx], [key]: val };
        setList(copy);
    };
    const remove = (idx) => setList(list.filter((_, i) => i !== idx));
    const add = () => {
        setList([...list, { ...empty }]);
        setOpenIdx(list.length);
    };
    const move = (idx, dir) => {
        const j = idx + dir;
        if (j < 0 || j >= list.length) return;
        const copy = [...list];
        [copy[idx], copy[j]] = [copy[j], copy[idx]];
        setList(copy);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg text-white">
                    {title}{" "}
                    <span className="font-mono text-xs text-zinc-500">
                        ({list.length})
                    </span>
                </h3>
                <button
                    onClick={add}
                    data-testid={`arrayform-add-${title}`}
                    className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/10 text-cyan-500 hover:bg-cyan-500/10 font-mono text-[11px] uppercase tracking-widest"
                >
                    <Plus size={12} /> Add
                </button>
            </div>

            <div className="space-y-2 mb-6">
                {list.length === 0 && (
                    <div className="border border-white/[0.08] p-6 font-mono text-sm text-zinc-500">
                        // empty — click Add
                    </div>
                )}
                {list.map((item, idx) => {
                    const open = openIdx === idx;
                    return (
                        <div
                            key={idx}
                            className="border border-white/[0.08] bg-[#0a0a0a]"
                        >
                            <div className="flex items-center justify-between p-3">
                                <button
                                    onClick={() => setOpenIdx(open ? -1 : idx)}
                                    className="flex items-center gap-2 text-left text-zinc-300 font-mono text-sm flex-1 min-w-0"
                                >
                                    {open ? (
                                        <ChevronUp size={14} className="text-cyan-500" />
                                    ) : (
                                        <ChevronDown size={14} />
                                    )}
                                    <span className="truncate">{renderTitle(item)}</span>
                                </button>
                                <div className="flex items-center gap-2 ml-3">
                                    <button
                                        onClick={() => move(idx, -1)}
                                        disabled={idx === 0}
                                        className="font-mono text-[10px] text-zinc-500 hover:text-cyan-500 disabled:opacity-30 px-1"
                                        title="Move up"
                                    >
                                        ↑
                                    </button>
                                    <button
                                        onClick={() => move(idx, 1)}
                                        disabled={idx === list.length - 1}
                                        className="font-mono text-[10px] text-zinc-500 hover:text-cyan-500 disabled:opacity-30 px-1"
                                        title="Move down"
                                    >
                                        ↓
                                    </button>
                                    <button
                                        onClick={() => remove(idx)}
                                        className="font-mono text-[10px] text-zinc-500 hover:text-red-400 inline-flex items-center gap-1 px-1"
                                    >
                                        <Trash2 size={11} />
                                    </button>
                                </div>
                            </div>
                            {open && (
                                <div className="border-t border-white/[0.08] p-5 space-y-4">
                                    {schema.map((f) => (
                                        <SchemaField
                                            key={f.name}
                                            field={f}
                                            value={item[f.name]}
                                            onChange={(v) => update(idx, f.name, v)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <SaveBar onSave={() => onSave(list)} saving={saving} />
        </div>
    );
}

function SchemaField({ field, value, onChange }) {
    if (field.type === "textarea") {
        return (
            <FieldTextarea
                label={field.label}
                value={value || ""}
                onChange={onChange}
                rows={3}
            />
        );
    }
    if (field.type === "select") {
        return (
            <label className="block">
                <span className="block font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1">
                    {field.label}
                </span>
                <select
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-transparent border border-white/15 focus:border-cyan-500 outline-none py-2 px-3 text-white font-mono text-sm"
                >
                    {field.options.map((o) => (
                        <option key={o} value={o} className="bg-[#0a0a0a]">
                            {o}
                        </option>
                    ))}
                </select>
            </label>
        );
    }
    if (field.type === "csv") {
        const str = Array.isArray(value) ? value.join(", ") : value || "";
        return (
            <FieldText
                label={field.label}
                value={str}
                onChange={(v) =>
                    onChange(
                        v
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean),
                    )
                }
            />
        );
    }
    if (field.type === "lines") {
        const str = Array.isArray(value) ? value.join("\n") : value || "";
        return (
            <FieldTextarea
                label={field.label}
                value={str}
                onChange={(v) =>
                    onChange(v.split("\n").map((s) => s.trim()).filter(Boolean))
                }
                rows={6}
            />
        );
    }
    return (
        <FieldText
            label={field.label}
            value={value || ""}
            onChange={onChange}
        />
    );
}

// ------------------- Field primitives -------------------
function FieldText({ label, value, onChange }) {
    return (
        <label className="block">
            <span className="block font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1">
                {label}
            </span>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-transparent border-b border-white/15 focus:border-cyan-500 outline-none py-2 text-white font-mono text-sm"
            />
        </label>
    );
}

function FieldTextarea({ label, value, onChange, rows = 3 }) {
    return (
        <label className="block">
            <span className="block font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1">
                {label}
            </span>
            <textarea
                rows={rows}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-transparent border border-white/15 focus:border-cyan-500 outline-none p-3 text-white font-mono text-sm resize-y"
            />
        </label>
    );
}

function SaveBar({ onSave, saving }) {
    return (
        <div className="flex items-center justify-end pt-4 border-t border-white/[0.06]">
            <button
                onClick={onSave}
                disabled={saving}
                data-testid="portfolio-save-btn"
                className="inline-flex items-center gap-2 px-5 py-2 bg-cyan-500 text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-white disabled:opacity-50"
            >
                <Save size={12} />
                {saving ? "Saving…" : "Save section"}
            </button>
        </div>
    );
}
