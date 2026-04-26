import React, { useState } from "react";
import axios from "axios";
import { Search, Sparkles, Command, Cpu, Zap } from "lucide-react";
import "./skillinput.css";

function SkillInput({ setResults }) {
    const [skills, setSkills] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!skills.trim()) return;
        setLoading(true);
        try {
            const skillsArray = skills.split(",").map(s => s.trim());
            const res = await axios.post("http://localhost:5000/recommend", { skills: skillsArray });
            
            if (res.data && res.data.recommendations) {
                setResults(res.data.recommendations);
            }
        } catch (err) {
            console.error("Search error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="neural-input-wrapper">
            <div className={`neural-console-bar ${loading ? "console-busy" : ""}`}>
                <div className="console-prefix">
                    {loading ? (
                        <div className="neural-pulse-loader"></div>
                    ) : (
                        <Cpu size={18} className="text-indigo-glow" />
                    )}
                </div>

                <input 
                    type="text" 
                    autoFocus
                    placeholder="Enter skills (e.g. React, Python, NLP) to generate embeddings..."
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="console-input"
                />

                <div className="console-suffix">
                    <div className="kbd-hint">
                        <Command size={10} />
                        <span>ENTER</span>
                    </div>
                    <button 
                        onClick={handleSearch} 
                        disabled={loading || !skills.trim()} 
                        className="btn-neural-execute"
                    >
                        {loading ? (
                            "ENCODING..."
                        ) : (
                            <>
                                <Sparkles size={16} /> 
                                <span>Compute Match</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
            
            <div className="console-status-row">
                <div className="status-item">
                    <Zap size={12} className="text-cyan" />
                    <span>Latent Semantic Analysis Active</span>
                </div>
                <div className="status-item separator">|</div>
                <div className="status-item">
                    <span>Precision: 384-dim vectors</span>
                </div>
            </div>
        </div>
    );
}

export default SkillInput;