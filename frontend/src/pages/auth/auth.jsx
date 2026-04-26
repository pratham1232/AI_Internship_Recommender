import React from "react";
import "./auth.css";
import { BrainCircuit, Sparkles, ShieldCheck, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="neural-auth-wrapper">
            {/* --- ATMOSPHERIC BACKGROUND --- */}
            <div className="auth-background">
                <div className="auth-glow auth-glow-1"></div>
                <div className="auth-glow auth-glow-2"></div>
                <div className="auth-grid-pattern"></div>
                <div className="auth-noise"></div>
            </div>

            <div className="auth-container-main">
                {/* BRANDING TOP */}
                <header className="auth-top-branding">
                    <Link to="/" className="auth-nav-logo">
                        <div className="logo-hex-glow">
                            <BrainCircuit size={22} color="white" strokeWidth={2.5} />
                        </div>
                        <span className="logo-brand-text">Intern<span>AI</span></span>
                    </Link>
                </header>

                {/* THE GLASS CARD */}
                <main className="auth-glass-card">
                    {/* Security Status Header */}
                    <div className="auth-status-bar">
                        <div className="auth-status-pill">
                            <div className="pulse-dot-green"></div>
                            <span>Neural_Protocol_Active</span>
                        </div>
                        <Activity size={14} className="text-dim" />
                    </div>

                    <div className="auth-card-body">
                        <div className="auth-text-header">
                            <div className="auth-icon-badge">
                                <Sparkles size={16} />
                            </div>
                            <h1>{title}</h1>
                            <p>{subtitle}</p>
                        </div>

                        {/* Login/Signup forms are injected here */}
                        <div className="auth-form-injection">
                            {children}
                        </div>
                    </div>

                    {/* Bottom Security Footer */}
                    <div className="auth-card-security-footer">
                        <ShieldCheck size={14} />
                        <span>End-to-End Encrypted Session</span>
                    </div>
                </main>

                {/* PAGE FOOTER */}
                <footer className="auth-page-footer">
                    <p>© 2026 InternAI Neural Systems • v2.4.0-Stable</p>
                </footer>
            </div>
        </div>
    );
};

export default AuthLayout;