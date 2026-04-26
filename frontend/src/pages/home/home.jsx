import React, { useState, useEffect } from "react";
import "./home.css";
import {
  Network, ShieldCheck, Activity, Sparkles,
  Wand2, ArrowRight, Zap, BarChart2, Globe, CheckCircle,
} from "lucide-react";
import SkillInput from "../../components/skillinput/skillinput";
import Recommendations from "../../components/recommendations/recommendations";

// ── Sub-components ────────────────────────────────────────────────────────────

function Aurora() {
  return (
    <div className="ai-aurora">
      <div className="ai-aurora-blob ai-aurora-blob-1" />
      <div className="ai-aurora-blob ai-aurora-blob-2" />
      <div className="ai-aurora-blob ai-aurora-blob-3" />
    </div>
  );
}

// function Navbar({ scrolled }) {
//   return (
//     <nav className={`ai-nav${scrolled ? " scrolled" : ""}`}>
//       <a href="/" className="ai-nav-logo">
//         <div className="ai-nav-logo-mark">AI</div>
//         InternAI
//       </a>
//       <div className="ai-nav-links">
//         <a href="#features">Features</a>
//         <a href="#demo">Try it</a>
//         <a href="#">Pricing</a>
//         <a href="#">Docs</a>
//       </div>
//       <a href="#demo" className="ai-nav-cta">
//         Get started <ArrowRight size={14} />
//       </a>
//     </nav>
//   );
// }

function FloatingCard() {
  const bars = [
    { label: "React",   width: "88%", delay: "0s"    },
    { label: "Python",  width: "74%", delay: "0.15s" },
    { label: "ML / AI", width: "91%", delay: "0.3s"  },
    { label: "Node.js", width: "62%", delay: "0.45s" },
  ];
  return (
    <div className="ai-float-card">
      <div className="ai-card-header">
        <div className="ai-card-title-row">
          <div className="ai-card-dots">
            <div className="ai-card-dot" style={{ background: "#FF5F57" }} />
            <div className="ai-card-dot" style={{ background: "#FFBD2E" }} />
            <div className="ai-card-dot" style={{ background: "#28C840" }} />
          </div>
          <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", fontFamily: "monospace", marginLeft: 6 }}>
            neural_engine.match()
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div className="ai-badge-dot" />
          <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.3)" }}>LIVE</span>
        </div>
      </div>

      <div className="ai-card-body">
        <div className="ai-scanner-beam" />
        {bars.map((b, i) => (
          <div className="ai-vector-row" key={i}>
            <span className="ai-vector-label">{b.label}</span>
            <div className="ai-vector-bar-bg">
              <div className="ai-vector-bar-fill" style={{ width: b.width, animationDelay: b.delay }} />
            </div>
            <span className="ai-vector-val">{b.width}</span>
          </div>
        ))}
        <div className="ai-match-row">
          <div className="ai-match-badge">
            <CheckCircle size={13} /> 98.4% Match
          </div>
          <span className="ai-match-label">384-dim · cosine</span>
        </div>
        <div className="ai-card-tags">
          <span className="ai-tag">Full-stack</span>
          <span className="ai-tag">Remote</span>
          <span className="ai-tag ai-tag-green">₹ Stipend</span>
          <span className="ai-tag">2026 Batch</span>
        </div>
      </div>
    </div>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="ai-section">
      <div>
        <div className="ai-section-label">
          <Sparkles size={12} /> Why InternAI
        </div>
        <h2 className="ai-section-h2">
          Built on vectors,<br />
          <span className="ai-grad-text">not keywords.</span>
        </h2>
        <p className="ai-section-sub">
          Traditional job boards match strings. We match meaning — understanding
          that "built React apps" and "front-end development" describe the same human.
        </p>
      </div>

      <div className="ai-features-grid">
        {/* Main card spanning 2 rows */}
        <div className="ai-feat ai-feat-main">
          <div className="ai-feat-icon ai-feat-icon-purple">
            <Network size={20} color="#A89FFF" />
          </div>
          <h3>384-Dimensional Semantic Mapping</h3>
          <p>
            Every skill you describe gets encoded into a high-dimensional vector
            embedding. We compute cosine similarity across thousands of roles in
            real time — surfacing opportunities that genuinely fit your technical
            context, not just your buzzwords.
          </p>
          <div className="ai-vector-canvas">
            {[
              { l: "context", v: 0.94, d: "0s"    },
              { l: "intent",  v: 0.87, d: "0.1s"  },
              { l: "domain",  v: 0.79, d: "0.2s"  },
              { l: "depth",   v: 0.91, d: "0.3s"  },
              { l: "recency", v: 0.65, d: "0.4s"  },
            ].map((r, i) => (
              <div className="ai-vector-row" key={i}>
                <span className="ai-vector-label">{r.l}</span>
                <div className="ai-vector-bar-bg">
                  <div className="ai-vector-bar-fill" style={{ width: `${r.v * 100}%`, animationDelay: r.d }} />
                </div>
                <span className="ai-vector-val">{Math.round(r.v * 100)}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ai-feat ai-feat-border-left">
          <div className="ai-feat-icon ai-feat-icon-green"><Zap size={18} color="#00D4A8" /></div>
          <h3>Real-time Sync</h3>
          <p>JSearch API integration keeps listings fresh. No stale postings.</p>
        </div>

        <div className="ai-feat ai-feat-border-left">
          <div className="ai-feat-icon ai-feat-icon-blue"><BarChart2 size={18} color="#38BDF8" /></div>
          <h3>Match Score</h3>
          <p>Every result comes with an explainable similarity score breakdown.</p>
        </div>

        <div className="ai-feat ai-feat-border-left ai-feat-border-top">
          <div className="ai-feat-icon ai-feat-icon-purple"><ShieldCheck size={18} color="#A89FFF" /></div>
          <h3>Vetted Roles</h3>
          <p>Recruiters and companies go through authenticity verification.</p>
        </div>

        <div className="ai-feat ai-feat-border-left ai-feat-border-top">
          <div className="ai-feat-icon ai-feat-icon-green"><Globe size={18} color="#00D4A8" /></div>
          <h3>Remote-first</h3>
          <p>Geo-aware search with hybrid and remote filters built in.</p>
        </div>
      </div>
    </section>
  );
}

// ── Main Page Component ────────────────────────────────────────────────────────

function Home() {
  const [results, setResults]     = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Scroll-aware navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // When SkillInput pushes results → show loading → then reveal Recommendations
  useEffect(() => {
    if (results.length > 0) {
      setShowResults(false);
      setIsThinking(true);
      const t = setTimeout(() => {
        setIsThinking(false);
        setShowResults(true);
      }, 1400);
      return () => clearTimeout(t);
    }
  }, [results]);

  return (
    <>
      <Aurora />
      <div className="ai-grid-overlay" />
      {/* <Navbar scrolled={scrolled} /> */}

      {/* ── HERO ── */}
      <section className="ai-hero">
        <div className="ai-hero-left">
          <div className="ai-badge">
            <div className="ai-badge-dot" />
            GPT-powered semantic matching is live
          </div>

          <h1 className="ai-hero-h1">
            Find internships<br />
            <span className="ai-grad-text">at neural speed.</span>
          </h1>

          <p className="ai-hero-sub">
            The first platform that understands technical context — not just
            keywords. Your skills, encoded in 384 dimensions and matched to
            the perfect role.
          </p>

          <div className="ai-hero-actions">
            <a href="#demo" className="ai-btn-primary">
              Start matching <Wand2 size={16} />
            </a>
            <a href="#features" className="ai-btn-secondary">
              How it works <ArrowRight size={14} />
            </a>
          </div>

          <div className="ai-hero-stats">
            <div className="ai-stat-item">
              <span className="ai-stat-num">12k+</span>
              <span className="ai-stat-label">Active listings</span>
            </div>
            <div className="ai-stat-divider" />
            <div className="ai-stat-item">
              <span className="ai-stat-num">98.4%</span>
              <span className="ai-stat-label">Match accuracy</span>
            </div>
            <div className="ai-stat-divider" />
            <div className="ai-stat-item">
              <span className="ai-stat-num">384d</span>
              <span className="ai-stat-label">Vector space</span>
            </div>
          </div>
        </div>

        <div className="ai-hero-right">
          <FloatingCard />
        </div>
      </section>

      {/* ── FEATURES ── */}
      <FeaturesSection />

      {/* ── DEMO TERMINAL ── */}
      <div id="demo" className="ai-terminal-wrap">
        <div className="ai-terminal-container">
          <div className="ai-terminal-header-text">
            <div className="ai-section-label" style={{ justifyContent: "center", marginBottom: "1rem" }}>
              <Activity size={12} /> Live Demo
            </div>
            <h2 className="ai-section-h2" style={{ textAlign: "center" }}>
              Type your skills.<br />
              <span className="ai-grad-text">Watch the engine work.</span>
            </h2>
          </div>

          <div className="ai-terminal">
            {/* Title bar */}
            <div className="ai-terminal-bar">
              <div className="ai-terminal-controls">
                <div className="ai-terminal-ctrl" style={{ background: "#FF5F57" }} />
                <div className="ai-terminal-ctrl" style={{ background: "#FFBD2E" }} />
                <div className="ai-terminal-ctrl" style={{ background: "#28C840" }} />
              </div>
              <span className="ai-terminal-name">neural_engine_v1.0 — match.js</span>
            </div>

            {/* Body */}
            <div className="ai-terminal-body">
              <p className="ai-terminal-h2">Initialize Discovery</p>
              <p className="ai-terminal-sub">Describe your stack. We'll handle the rest.</p>

              {/* SkillInput — calls setResults when API returns data */}
              <SkillInput setResults={setResults} />

              {/* Loading spinner */}
              {isThinking && (
                <div className="ai-loading">
                  <div className="ai-loading-track">
                    <div className="ai-loading-fill" />
                  </div>
                  <span className="ai-loading-text">encoding vectors...</span>
                </div>
              )}

              {/* Results — only shown after thinking is complete */}
              {!isThinking && showResults && results.length > 0 && (
                <Recommendations results={results} />
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className="ai-footer">
        © 2026 InternAI Project · Built for the Future
      </footer>
    </>
  );
}

export default Home;
