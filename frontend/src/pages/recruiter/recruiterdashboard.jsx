import React, { useState } from "react";
import API from "../../services/api";
import { 
    PlusCircle, RotateCw, Briefcase, LayoutDashboard, 
    Settings, Users, LogOut, Building2, MapPin, 
    Clock, Sparkles, AlignLeft, Activity, Terminal, BrainCircuit,
    CheckCircle2, Send
} from "lucide-react";
import "./recruiterdashboard.css";

export default function RecruiterDashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [form, setForm] = useState({ 
        title: "", company: "", description: "", 
        skills: "", location: "Remote", duration: "3 Months" 
    });
    const [loading, setLoading] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);

    const handleSync = async () => {
        setLoading(true);
        try {
            const { data } = await API.get("/api/admin/sync-real-jobs");
            alert(data.message);
        } catch (err) {
            alert("Sync Protocol Failed. Verify API Node.");
        } finally {
            setLoading(false);
        }
    };

    const handlePost = async (e) => {
        e.preventDefault();
        setIsPublishing(true);
        try {
            await API.post("/add-internship", form);
            alert("Opportunity Broadcasted to Neural Network! 🚀");
            setForm({ title: "", company: "", description: "", skills: "", location: "Remote", duration: "3 Months" });
        } catch (err) {
            alert("Transmission Error. Check Database link.");
        } finally {
            setIsPublishing(false);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    // Style helper for the Live Preview Logo
    const getLogoColor = (name) => {
        const colors = ["#5B4EFF", "#00D4A8", "#9333EA", "#EA580C", "#0284C7"];
        const index = name ? name.length % colors.length : 0;
        return colors[index];
    };

    const skillTags = form.skills.split(",").filter(s => s.trim() !== "");

    return (
        <div className="neural-recruiter-container">
            {/* --- ATMOSPHERIC ELEMENTS --- */}
            <div className="dash-noise"></div>
            <div className="dash-glow-orb-rec"></div>

            {/* --- ELITE SIDEBAR --- */}
            <aside className="neural-sidebar">
                <div className="sidebar-brand-box">
                    <div className="brand-logo-glow">
                        <BrainCircuit size={22} color="white" strokeWidth={2.5} />
                    </div>
                    <span className="brand-name">Intern<span>AI</span></span>
                </div>
                
                <nav className="sidebar-links">
                    <div className="s-link active"><LayoutDashboard size={18} /> <span>Admin Console</span></div>
                    <div className="s-link"><Briefcase size={18} /> <span>My Postings</span></div>
                    <div className="s-link"><Users size={18} /> <span>Talent Pool</span></div>
                    <div className="s-link"><Settings size={18} /> <span>System Config</span></div>
                </nav>

                <div className="sidebar-bottom">
                    <div className="system-status-pill">
                        <div className="status-ping"></div>
                        <span>Network_Sync_Active</span>
                    </div>
                    <button onClick={handleLogout} className="btn-logout-pro">
                        <LogOut size={18} /> <span>Terminate</span>
                    </button>
                </div>
            </aside>

            {/* --- MAIN VIEWPORT --- */}
            <main className="dash-viewport">
                <header className="dash-header-top">
                    <div className="header-greeting">
                        <div className="ai-breadcrumb">ADMIN / INTERNSHIP / PUBLISH</div>
                        <h1>Broadcast Opportunity <span className="blink">_</span></h1>
                    </div>
                    
                    <div className="header-utility">
                        <button className="btn-sync-pro" onClick={handleSync} disabled={loading}>
                            <RotateCw size={16} className={loading ? "spin" : ""} /> 
                            <span>{loading ? "SYNCING..." : "SYNC_GLOBAL_JOBS"}</span>
                        </button>
                    </div>
                </header>

                <div className="recruiter-grid-v2">
                    {/* LEFT PANEL: INPUT FORM */}
                    <div className="form-panel">
                        <div className="neural-panel">
                            <div className="panel-head">
                                <PlusCircle size={16} className="text-indigo" />
                                <h3>Parameter Configuration</h3>
                            </div>
                            
                            <form className="pro-recruiter-form" onSubmit={handlePost}>
                                <div className="input-row-pro">
                                    <div className="input-group-pro">
                                        <label>Company Identification</label>
                                        <div className="input-wrapper-v2">
                                            <Building2 className="i-icon" size={16} />
                                            <input 
                                                placeholder="e.g. Google" required 
                                                value={form.company}
                                                onChange={e => setForm({...form, company: e.target.value})} 
                                            />
                                        </div>
                                    </div>
                                    <div className="input-group-pro">
                                        <label>Job Designation</label>
                                        <div className="input-wrapper-v2">
                                            <Briefcase className="i-icon" size={16} />
                                            <input 
                                                placeholder="e.g. Frontend Intern" required 
                                                value={form.title}
                                                onChange={e => setForm({...form, title: e.target.value})} 
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="input-group-pro">
                                    <label>Role Abstract (Description)</label>
                                    <div className="input-wrapper-v2">
                                        <AlignLeft className="i-icon-top" size={16} />
                                        <textarea 
                                            placeholder="Define responsibilities and growth potential..." required 
                                            value={form.description}
                                            onChange={e => setForm({...form, description: e.target.value})} 
                                        />
                                    </div>
                                </div>

                                <div className="input-group-pro">
                                    <label>Required Skill Vectors (Comma Separated)</label>
                                    <div className="input-wrapper-v2">
                                        <Sparkles className="i-icon" size={16} />
                                        <input 
                                            placeholder="React, Python, NLP, SQL..." required 
                                            value={form.skills}
                                            onChange={e => setForm({...form, skills: e.target.value})} 
                                        />
                                    </div>
                                </div>

                                <div className="input-row-pro">
                                    <div className="input-group-pro">
                                        <label>Deployment Node (Location)</label>
                                        <div className="input-wrapper-v2">
                                            <MapPin className="i-icon" size={16} />
                                            <input 
                                                placeholder="Remote / Hybrid / City" 
                                                value={form.location}
                                                onChange={e => setForm({...form, location: e.target.value})} 
                                            />
                                        </div>
                                    </div>
                                    <div className="input-group-pro">
                                        <label>Duration Cycle</label>
                                        <div className="input-wrapper-v2">
                                            <Clock className="i-icon" size={16} />
                                            <input 
                                                placeholder="e.g. 6 Months" 
                                                value={form.duration}
                                                onChange={e => setForm({...form, duration: e.target.value})} 
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className={`btn-publish-pro ${isPublishing ? "active" : ""}`}>
                                    {isPublishing ? "INITIALIZING..." : <><Send size={18} /> Broadcast to Network</>}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* RIGHT PANEL: LIVE STUDENT VIEW */}
                    <div className="preview-panel">
                        <div className="output-header-rec">
                            <div className="output-title">
                                <Terminal size={18} />
                                <span>STUDENT_VIEW_SIMULATION</span>
                            </div>
                            <div className="output-status">LIVE_PREVIEW</div>
                        </div>

                        <div className="preview-viewport">
                            <div className="mock-card-pro">
                                <div className="mock-card-top-row">
                                    <div className="match-pill-pro">
                                        <Sparkles size={14} />
                                        <span>98% Match Probability</span>
                                    </div>
                                    <div className="status-label-pro">ELITE_FIT</div>
                                </div>

                                <div className="mock-card-identity">
                                    <div className="mock-icon-box" style={{ backgroundColor: getLogoColor(form.company) }}>
                                        {form.company ? form.company[0].toUpperCase() : "?"}
                                    </div>
                                    <div className="mock-text-stack">
                                        <h4>{form.title || "Target Designation"}</h4>
                                        <p>{form.company || "Direct Recruiter"}</p>
                                    </div>
                                </div>

                                <div className="mock-meta-grid">
                                    <span><MapPin size={12} /> {form.location}</span>
                                    <span><Clock size={12} /> {form.duration}</span>
                                    <span><Activity size={12} /> Live Link</span>
                                </div>

                                <div className="mock-abstract">
                                    {form.description || "The neural abstract will generate here..."}
                                </div>

                                <div className="mock-tags-row">
                                    {skillTags.length > 0 ? (
                                        skillTags.slice(0, 3).map((s, i) => <span key={i} className="m-tag-pill">{s.trim()}</span>)
                                    ) : (
                                        <span className="m-tag-placeholder">Awaiting Skill Vectors...</span>
                                    )}
                                </div>

                                <button className="mock-apply-btn-pro" disabled>Apply via InternAI Console</button>
                            </div>

                            <div className="recruiter-tips">
                                <div className="tip-item">
                                    <CheckCircle2 size={14} className="text-cyan" />
                                    <span>AI uses Cosine Similarity for matches.</span>
                                </div>
                                <div className="tip-item">
                                    <CheckCircle2 size={14} className="text-cyan" />
                                    <span>Descriptions are tokenized instantly.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}