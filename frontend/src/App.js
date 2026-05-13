import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import Home from "./pages/Home";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function Shell({ children }) {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith("/admin");
    return (
        <>
            {!isAdmin && <Navbar />}
            {children}
            {!isAdmin && <Footer profile={{ name: "Anshul Bisht" }} />}
        </>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <HashRouter>
                <CustomCursor />
                <Toaster
                    position="bottom-right"
                    theme="dark"
                    toastOptions={{
                        style: {
                            background: "#0a0a0a",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "#fff",
                            fontFamily: "JetBrains Mono, monospace",
                            fontSize: "12px",
                            borderRadius: 0,
                        },
                    }}
                />
                <Shell>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/blog" element={<BlogList />} />
                        <Route path="/blog/:slug" element={<BlogDetail />} />
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route
                            path="/admin/dashboard"
                            element={<AdminDashboard />}
                        />
                    </Routes>
                </Shell>
            </HashRouter>
        </AuthProvider>
    );
}
