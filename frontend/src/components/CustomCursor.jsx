import { useEffect, useState } from "react";

export default function CustomCursor() {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [hovering, setHovering] = useState(false);

    useEffect(() => {
        const move = (e) => setPos({ x: e.clientX, y: e.clientY });
        const enter = (e) => {
            if (
                e.target.closest(
                    "a, button, input, textarea, [data-cursor='hover']",
                )
            ) {
                setHovering(true);
            }
        };
        const leave = (e) => {
            if (
                e.target.closest &&
                e.target.closest("a, button, input, textarea, [data-cursor='hover']")
            ) {
                setHovering(false);
            }
        };
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseover", enter);
        window.addEventListener("mouseout", leave);
        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseover", enter);
            window.removeEventListener("mouseout", leave);
        };
    }, []);

    return (
        <>
            <div
                aria-hidden="true"
                className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    transform: `translate(${pos.x - 4}px, ${pos.y - 4}px)`,
                }}
            >
                <div className="w-2 h-2 bg-cyan-500 rounded-full" />
            </div>
            <div
                aria-hidden="true"
                className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9998] transition-transform duration-200 ease-out"
                style={{
                    transform: `translate(${pos.x - (hovering ? 24 : 16)}px, ${pos.y - (hovering ? 24 : 16)}px) scale(${hovering ? 1.4 : 1})`,
                }}
            >
                <div
                    className={`w-8 h-8 border rounded-full ${
                        hovering
                            ? "border-cyan-500/80"
                            : "border-cyan-500/30"
                    }`}
                />
            </div>
        </>
    );
}
