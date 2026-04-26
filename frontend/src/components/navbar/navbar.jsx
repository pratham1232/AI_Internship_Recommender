import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BrainCircuit, LogOut, Layout, Activity, UserCircle } from "lucide-react";
import "./navbar.css";

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user"));

    // Shrink and blur navbar on scroll
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    // Don't show navbar links like "Technology" if we are already in a dashboard
    const isDashboard = location.pathname.includes("dashboard");

    return (
        <nav className={`neural-nav ${scrolled ? "nav-shrunk" : ""}`}>
            <div className="nav-inner container">
                {/* LOGO SECTION */}
                <Link to="/" className="nav-brand-elite">
                    <div className="brand-icon-glow">
                        <BrainCircuit size={22} color="white" strokeWidth={2.5} />
                    </div>
                    <span className="brand-text-elite">Intern<span>AI</span></span>
                </Link>

                {/* NAVIGATION ACTIONS */}
                <div className="nav-controls-cluster">
                    {!isDashboard && (
                        <div className="public-links">
                            <a href="#features" className="nav-link-elite">System</a>
                            <a href="#demo" className="nav-link-elite">Engine</a>
                        </div>
                    )}
                    
                    <div className="nav-v-separator"></div>

                    {!user ? (
                        <div className="auth-cluster-nav">
                            <Link to="/login" className="btn-nav-ghost">Sign In</Link>
                            <Link to="/signup" className="btn-nav-glow">Get Access</Link>
                        </div>
                    ) : (
                        <div className="user-hub-nav">
                            <div className="user-status-pill">
                                <div className="status-ping-small"></div>
                                <span>{user.name.split(' ')[0]}</span>
                            </div>
                            
                            <Link to={user.role === "student" ? "/student-dashboard" : "/recruiter-dashboard"}>
                                <button className="btn-portal-nav">
                                    <Layout size={14} /> <span>Portal</span>
                                </button>
                            </Link>

                            <button onClick={handleLogout} className="btn-terminate-nav" title="Terminate Session">
                                <LogOut size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;