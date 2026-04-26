import React from "react";
import { MapPin, ExternalLink, Sparkles, Clock, Briefcase, ChevronRight, CheckCircle2 } from "lucide-react";
import "./recommendations.css";

function Recommendations({ results }) {
    if (!results || results.length === 0) return null;

    const formatScore = (score) => {
        const num = parseFloat(score);
        const final = num <= 1 ? num * 100 : num;
        return Math.round(final);
    };

    // Style helper matching the Aurora/Cyber theme
    const getMatchStyle = (score) => {
        if (score >= 85) return { color: "#00D4A8", bg: "rgba(0, 212, 168, 0.1)", border: "rgba(0, 212, 168, 0.3)" };
        if (score >= 60) return { color: "#5B4EFF", bg: "rgba(91, 78, 255, 0.1)", border: "rgba(91, 78, 255, 0.3)" };
        return { color: "#A89FFF", bg: "rgba(168, 159, 255, 0.1)", border: "rgba(168, 159, 255, 0.3)" };
    };

    return (
        <div className="neural-results-wrapper">
            <div className="neural-results-header">
                <div className="neural-count-pill">
                    <div className="neural-ping">
                        <div className="neural-ping-ring"></div>
                        <div className="neural-ping-dot"></div>
                    </div>
                    <span>{results.length} Neural Matches Localized</span>
                </div>
            </div>

            <div className="neural-results-grid">
                {results.map((job, index) => {
                    const score = formatScore(job.match_score);
                    const mStyle = getMatchStyle(score);
                    const isTopMatch = score >= 90;

                    return (
                        <div key={index} className={`neural-card ${isTopMatch ? 'neural-card-top' : ''}`}>
                            {/* Match Probability Header */}
                            <div className="neural-card-status">
                                <div className="neural-score-badge" style={{ 
                                    color: mStyle.color, 
                                    backgroundColor: mStyle.bg,
                                    borderColor: mStyle.border 
                                }}>
                                    <Sparkles size={14} />
                                    <span>{score}% Match Probability</span>
                                </div>
                                {isTopMatch && <div className="neural-top-label">ELITE_FIT</div>}
                            </div>

                            {/* Job Identity */}
                            <div className="neural-card-identity">
                                <div className="neural-comp-icon">
                                    {job.company ? job.company[0] : "A"}
                                </div>
                                <div className="neural-title-stack">
                                    <h3 className="neural-job-title">{job.title}</h3>
                                    <p className="neural-comp-name">{job.company}</p>
                                </div>
                            </div>

                            {/* Technical Metadata */}
                            <div className="neural-meta-grid">
                                <div className="neural-meta-item">
                                    <MapPin size={12} /> {job.location || "Remote"}
                                </div>
                                <div className="neural-meta-item">
                                    <Clock size={12} /> {job.duration || "3-6 Months"}
                                </div>
                                <div className="neural-meta-item">
                                    <Briefcase size={12} /> {job.employment_type || "Internship"}
                                </div>
                            </div>

                            {/* Abstract/Description */}
                            <p className="neural-card-abstract">
                                {job.description 
                                    ? job.description.substring(0, 110) + "..." 
                                    : "Predictive analysis suggests high technical alignment with your current skill vector."}
                            </p>

                            {/* Skill Vector Tags */}
                            <div className="neural-tags-row">
                                {job.skills && job.skills.split(',').slice(0, 3).map((s, i) => (
                                    <span key={i} className="neural-tag-pill">
                                        {s.trim()}
                                    </span>
                                ))}
                                {job.skills && job.skills.split(',').length > 3 && (
                                    <span className="neural-tag-more">+{job.skills.split(',').length - 3}</span>
                                )}
                            </div>

                            {/* Action Footer */}
                            <div className="neural-card-footer">
                                <button 
                                    className="neural-apply-btn"
                                    onClick={() => job.apply_link && window.open(job.apply_link, "_blank")}
                                >
                                    Initialize Application
                                    <ChevronRight size={16} />
                                </button>
                                <button className="neural-icon-btn" title="Save Cluster">
                                    <CheckCircle2 size={18} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Recommendations;