import { useEffect, useState } from "react";
import { api } from "../lib/api";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Experience from "../components/sections/Experience";
import Projects from "../components/sections/Projects";
import Certifications from "../components/sections/Certifications";
import BlogSection from "../components/sections/BlogSection";
import Contact from "../components/sections/Contact";

export default function Home() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get("/portfolio")
            .then((res) => setData(res.data))
            .catch((e) => setError(e.message));
    }, []);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center font-mono text-sm text-red-400">
                Failed to load portfolio data: {error}
            </div>
        );
    }
    if (!data) {
        return (
            <div
                data-testid="home-loading"
                className="min-h-screen flex items-center justify-center font-mono text-sm text-zinc-500"
            >
                <span className="text-cyan-500">$</span>&nbsp;loading portfolio
                <span className="caret" />
            </div>
        );
    }

    return (
        <div data-testid="home-page">
            <Hero profile={data.profile} />
            <About profile={data.profile} stats={data.stats} />
            <Skills skills={data.skills} />
            <Experience experience={data.experience} />
            <Projects projects={data.projects} />
            <Certifications
                certifications={data.certifications}
                education={data.education}
            />
            <BlogSection />
            <Contact profile={data.profile} social={data.social} />
        </div>
    );
}
