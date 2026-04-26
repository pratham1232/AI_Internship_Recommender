import React, { useState } from "react";
import axios from "axios";
import { UploadCloud, FileText, CheckCircle, RefreshCcw } from "lucide-react";
import "./resumeupload.css";

function ResumeUpload({ setResults }) {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("idle"); // idle, uploading, success

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setStatus("idle");
    };

    const handleUpload = async () => {
        if (!file) return alert("Please select a PDF file first.");

        setStatus("uploading");
        const formData = new FormData();
        formData.append("resume", file);

        try {
            // 1. Upload Resume to get extracted skills from NLP
            const uploadRes = await axios.post("http://localhost:5000/upload-resume", formData);
            const extractedSkills = uploadRes.data.skills;

            // 2. Automatically call the recommendation engine with those skills
            const recommendRes = await axios.post("http://localhost:5000/recommend", { 
                skills: extractedSkills 
            });

            setResults(recommendRes.data.recommendations);
            setStatus("success");
        } catch (err) {
            console.error(err);
            alert("Error parsing resume. Ensure your Backend & AI are running.");
            setStatus("idle");
        }
    };

    return (
        <div className="resume-upload-card">
            <div className="upload-icon-wrapper">
                {status === "success" ? (
                    <CheckCircle size={40} className="text-green" />
                ) : (
                    <FileText size={40} className="text-indigo" />
                )}
            </div>
            
            <h3>AI Resume Parser</h3>
            <p>Upload your PDF to automatically extract skills and match roles.</p>

            <div className="upload-zone">
                <input 
                    type="file" 
                    id="resumeFile" 
                    hidden 
                    accept=".pdf" 
                    onChange={handleFileChange} 
                />
                <label htmlFor="resumeFile" className="file-label">
                    {file ? file.name : "Choose PDF Resume"}
                </label>

                <button 
                    onClick={handleUpload} 
                    disabled={status === "uploading" || !file}
                    className={`btn-upload-ai ${status}`}
                >
                    {status === "uploading" ? (
                        <><RefreshCcw size={16} className="spin" /> Processing...</>
                    ) : (
                        <><UploadCloud size={16} /> Analyze Resume</>
                    )}
                </button>
            </div>
        </div>
    );
}

export default ResumeUpload;