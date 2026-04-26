import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./auth";
import { 
    User, Mail, Lock, Eye, EyeOff, 
    Loader2, Rocket, UserCircle, ShieldCheck 
} from "lucide-react";

function Signup() {
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        
        if (form.password.length < 6) {
            return alert("Security Protocol: Password must be at least 6 characters.");
        }

        setIsLoading(true);
        try {
            // Ensure role is lowercase for database compatibility
            const payload = { ...form, role: form.role.toLowerCase() };
            const res = await axios.post("http://localhost:5000/auth/signup", payload);
            
            alert("Account Initialized successfully! 🚀");
            navigate("/login");
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Registration failed. Database rejected the request.";
            alert(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout 
            title="Create Identity" 
            subtitle="Register your technical profile to the InternAI neural network."
        >
            <form onSubmit={handleSignup} className="auth-form-pro">
                
                {/* NAME INPUT */}
                <div className="input-group-pro">
                    <label>Full Name</label>
                    <div className="input-wrapper-inner">
                        <User className="input-icon" size={18} />
                        <input 
                            type="text" 
                            required 
                            placeholder="Pratham Mishra" 
                            onChange={(e) => setForm({ ...form, name: e.target.value })} 
                        />
                    </div>
                </div>

                {/* EMAIL INPUT */}
                <div className="input-group-pro">
                    <label>Network Email</label>
                    <div className="input-wrapper-inner">
                        <Mail className="input-icon" size={18} />
                        <input 
                            type="email" 
                            required 
                            placeholder="name@university.edu" 
                            onChange={(e) => setForm({ ...form, email: e.target.value })} 
                        />
                    </div>
                </div>

                {/* PASSWORD INPUT */}
                <div className="input-group-pro">
                    <label>Secure Access Key</label>
                    <div className="input-wrapper-inner">
                        <Lock className="input-icon" size={18} />
                        <input 
                            type={showPassword ? "text" : "password"} 
                            required 
                            placeholder="••••••••" 
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

                {/* ROLE SELECT */}
                <div className="input-group-pro">
                    <label>System Permissions (Role)</label>
                    <div className="input-wrapper-inner">
                        <UserCircle className="input-icon" size={18} />
                        <select 
                            value={form.role} 
                            onChange={(e) => setForm({ ...form, role: e.target.value })}
                            className="select-pro"
                        >
                            <option value="student">Student / Intern</option>
                            <option value="recruiter">Recruiter / Partner</option>
                        </select>
                    </div>
                </div>

                <div className="signup-policy">
                    <ShieldCheck size={14} className="text-green" />
                    <span>By joining, you agree to our Neural Data Protocol.</span>
                </div>

                <button 
                    type="submit" 
                    className={`btn-auth-submit ${isLoading ? "loading" : ""}`}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <><Loader2 className="spin" size={18} /> Initializing...</>
                    ) : (
                        <>Initialize Account <Rocket size={18} /></>
                    )}
                </button>

                <div className="auth-footer-redirect">
                    <span>Already in the system?</span>
                    <Link to="/login" className="signup-highlight">Login here</Link>
                </div>
            </form>
        </AuthLayout>
    );
}

export default Signup;