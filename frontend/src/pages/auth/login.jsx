import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./auth";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post("http://localhost:5000/auth/login", form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            
            // Success animation or delay could go here
            navigate(res.data.user.role === "student" ? "/student-dashboard" : "/recruiter-dashboard");
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Invalid credentials. Please try again.";
            alert(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout 
            title="System Login" 
            subtitle="Securely access your semantic matching dashboard."
        >
            <form onSubmit={handleLogin} className="auth-form-pro">
                {/* EMAIL INPUT */}
                <div className="input-group-pro">
                    <label>Identification (Email)</label>
                    <div className="input-wrapper-inner">
                        <Mail className="input-icon" size={18} />
                        <input 
                            type="email" 
                            required 
                            placeholder="name@university.edu" 
                            autoComplete="email"
                            onChange={(e) => setForm({ ...form, email: e.target.value })} 
                        />
                    </div>
                </div>

                {/* PASSWORD INPUT */}
                <div className="input-group-pro">
                    <div className="label-row">
                        <label>Access Key (Password)</label>
                        <span className="forgot-pass-link">Forgot?</span>
                    </div>
                    <div className="input-wrapper-inner">
                        <Lock className="input-icon" size={18} />
                        <input 
                            type={showPassword ? "text" : "password"} 
                            required 
                            placeholder="••••••••" 
                            autoComplete="current-password"
                            onChange={(e) => setForm({ ...form, password: e.target.value })} 
                        />
                        <button 
                            type="button" 
                            className="btn-toggle-visibility"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <div className="remember-me-row">
                    <label className="checkbox-container">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        Keep session active
                    </label>
                </div>

                <button 
                    type="submit" 
                    className={`btn-auth-submit ${isLoading ? "loading" : ""}`}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <><Loader2 className="spin" size={18} /> Validating...</>
                    ) : (
                        <>Initialize Session <ArrowRight size={18} /></>
                    )}
                </button>

                <div className="auth-footer-redirect">
                    <span>New to the system?</span>
                    <Link to="/signup" className="signup-highlight">Request Access</Link>
                </div>
            </form>
        </AuthLayout>
    );
}

export default Login;