import React, { useState, useEffect } from "react";
import SkillInput from "../../components/skillinput/skillinput";
import Recommendations from "../../components/recommendations/recommendations";
import ResumeUpload from "../../components/common/resumeupload";
import { 
    LayoutDashboard, User, Briefcase, Search, TrendingUp, 
    Sparkles, LogOut, BrainCircuit, Bell, CheckCircle2, 
    FileText, Activity, Terminal, Fingerprint
} from "lucide-react";
import "./studentdashboard.css";

function StudentDashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    useEffect(() => {
        if (results.length > 0) {
            setIsSearching(true);
            const timer = setTimeout(() => setIsSearching(false), 1400);
            return () => clearTimeout(timer);
        }
    }, [results]);

    return (
        <div className="neural-dash-container">
            {/* --- ATMOSPHERIC LAYERS --- */}
            <div className="dash-noise"></div>
            <div className="dash-glow-orb"></div>

            {/* --- ELITE SIDEBAR --- */}
            <aside className="neural-sidebar">
                <div className="sidebar-brand-box">
                    <div className="brand-logo-glow">
                        <BrainCircuit size={22} color="white" strokeWidth={2.5} />
                    </div>
                    <span className="brand-name">Intern<span>AI</span></span>
                </div>
                
                <nav className="sidebar-links">
                    <div className="s-link active"><LayoutDashboard size={18} /> <span>Console</span></div>
                    <div className="s-link"><Briefcase size={18} /> <span>Applications</span></div>
                    <div className="s-link"><Search size={18} /> <span>Global Hub</span></div>
                    <div className="s-link"><User size={18} /> <span>Profile</span></div>
                </nav>

                <div className="sidebar-bottom">
                    <div className="system-status-pill">
                        <div className="status-ping"></div>
                        <span>Core_Online</span>
                    </div>
                    <button onClick={handleLogout} className="btn-logout-pro">
                        <LogOut size={18} /> <span>Terminate</span>
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="dash-viewport">
                <header className="dash-header-top">
                    <div className="header-greeting">
                        <div className="ai-breadcrumb">SYSTEM / USER / {user?.role?.toUpperCase()}</div>
                        <h1>Initiate Discovery, {user?.name?.split(' ')[0]} <span className="blink">_</span></h1>
                    </div>
                    
                    <div className="header-utility">
                        <div className="notif-box">
                            <Bell size={20} />
                            <span className="notif-alert"></span>
                        </div>
                        <div className="user-profile-cluster">
                            <div className="user-avatar-hex">{user?.name ? user.name[0] : "S"}</div>
                            <div className="user-meta">
                                <span className="u-role">Authorized</span>
                                <span className="u-id">UID: 20462</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="dash-content-layout">
                    {/* LEFT PANEL: INPUT & PARAMETERS */}
                    <div className="control-panel">
                        
                        {/* Profile Analysis */}
                        <div className="neural-panel profile-analysis">
                            <div className="panel-head">
                                <TrendingUp size={16} className="text-indigo" />
                                <h3>Vector Strength</h3>
                            </div>
                            <div className="vector-meter">
                                <div className="meter-track">
                                    <div className="meter-fill" style={{ width: '85%' }}></div>
                                </div>
                                <div className="meter-labels">
                                    <span>85% Semantic Match Rate</span>
                                    <button className="btn-optimize">OPTIMIZE</button>
                                </div>
                            </div>
                        </div>

                        {/* Resume Input */}
                        <div className="neural-panel resume-upload-module">
                            <div className="panel-head">
                                <FileText size={16} className="text-cyan" />
                                <h3>Neural Skill Parser</h3>
                            </div>
                            <div className="module-content">
                                <ResumeUpload setResults={setResults} />
                            </div>
                        </div>

                        {/* Manual Engine Input */}
                        <div className="neural-panel match-engine-module">
                            <div className="panel-head">
                                <Sparkles size={16} className="text-purple" />
                                <h3>Manual Search Kernel</h3>
                            </div>
                            <div className="module-content">
                                <SkillInput setResults={setResults} />
                            </div>
                            <div className="engine-micro-stats">
                                <div className="stat-line">
                                    <CheckCircle2 size={12} className="text-green" />
                                    <span>Latency: 12ms</span>
                                </div>
                                <div className="stat-line">
                                    <CheckCircle2 size={12} className="text-green" />
                                    <span>Tokenization: Stable</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: LIVE OUTPUT */}
                    <div className="output-panel">
                        <div className="output-header">
                            <div className="output-title">
                                <Terminal size={18} />
                                <span>MATCH_RESULTS_STREAM</span>
                            </div>
                            <div className="output-count">{results.length} Nodes Found</div>
                        </div>

                        <div className="output-viewport">
                            {isSearching ? (
                                <div className="neural-loader-overlay">
                                    <div className="scanner-line"></div>
                                    <div className="loader-text-stack">
                                        <Activity size={32} className="loader-pulse-icon" />
                                        <p>Mapping technical DNA to global opportunities...</p>
                                        <span className="code-font">EXECUTING_COSINE_SIMILARITY</span>
                                    </div>
                                </div>
                            ) : results.length > 0 ? (
                                <div className="results-scroll-area">
                                    <Recommendations results={results} />
                                </div>
                            ) : (
                                <div className="dash-empty-state">
                                    <Fingerprint size={60} className="empty-glow-icon" />
                                    <h3>Awaiting Identity Sync</h3>
                                    <p>Upload a resume or define your technical stack to begin matching.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default StudentDashboard;