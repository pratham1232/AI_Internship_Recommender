const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const axios = require("axios"); 
const { PythonShell } = require("python-shell");

// DB Imports
const { connectDB, sequelize } = require("./config/db");
const Internship = require("./models/internship");
const authRoutes = require("./routes/auth");

const app = express();

// ✅ 1. MIDDLEWARE
app.use(cors()); 
app.use(express.json());

// ✅ 2. ROUTES CONFIG
app.use("/auth", authRoutes);

const upload = multer({ dest: "uploads/" });

// ✅ 3. DB CONNECTION & SYNC
connectDB();
sequelize.sync({ alter: true })
    .then(() => console.log("✅ Database Tables Synced"))
    .catch(err => console.error("❌ Database Sync Error:", err));

// ✅ 4. BASIC ROUTES 
app.get("/", (req, res) => {
    res.json({ message: "AI Internship Recommendation API Running..." });
});

// ✅ 5. INTERNSHIP MANAGEMENT
app.post("/add-internship", async (req, res) => {
  try {
    const { title, company, description, skills, location, duration, apply_link } = req.body;

    const data = await Internship.create({
      title,
      company,
      description,
      skills,
      location,
      duration,
      apply_link: apply_link || ""
    });

    res.json({ message: "Internship added successfully", data });
  } catch (err) {
    console.error("Add Internship Error:", err);
    res.status(500).json({ error: "Error adding internship" });
  }
});

app.get("/internships", async (req, res) => {
    try {
        const data = await Internship.findAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Could not fetch internships" });
    }
});

// ✅ 6. AI RECOMMENDATION API (FIXED LOGIC)
app.post("/recommend", async (req, res) => {
    try {
        const { skills } = req.body;
        console.log("🔍 Incoming recommendation request for:", skills);

        if (!skills) return res.status(400).json({ error: "Skills are required" });
        const skillString = Array.isArray(skills) ? skills.join(" ") : skills;

        // 1. Call Python AI
        const aiResponse = await axios.post("http://localhost:8000/recommend", {
            skills: skillString
        });

        const aiMatches = aiResponse.data.recommendations; 

        if (!aiMatches || aiMatches.length === 0) {
            console.log("⚠️ AI found zero matches.");
            return res.json({ recommendations: [] });
        }

        // 2. Fetch data from DB using IDs
        const matchedIds = aiMatches.map(m => m.id);
        const fullInternships = await Internship.findAll({
            where: { id: matchedIds }
        });

        // 3. Merge AI scores with DB data (Handling String vs Number ID issues)
        const finalResults = fullInternships.map(job => {
            // Use loose equality (==) to handle potential string/number mismatch from Python
            const match = aiMatches.find(m => m.id == job.id);
            
            return {
                ...job.toJSON(),
                match_score: match ? (match.score * 100).toFixed(1) : "0"
            };
        }).sort((a, b) => b.match_score - a.match_score); 

        console.log(`✅ Successfully matched ${finalResults.length} internships.`);
        res.json({ recommendations: finalResults });

    } catch (err) {
        console.error("❌ Recommendation Error:", err.message);
        res.status(500).json({ error: "AI Engine is offline. Please start ai-engine/app.py" });
    }
});

// ✅ 7. RESUME SKILL EXTRACTION API
app.post("/upload-resume", upload.single("resume"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No resume file uploaded" });

    const filePath = req.file.path;
    let options = { args: [filePath], pythonOptions: ['-u'] };

    PythonShell.run("ai-engine/extract_skills.py", options)
        .then(result => {
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath); 
            res.json({ skills: result });
        })
        .catch(err => {
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            res.status(500).json({ error: "Error extracting skills" });
        });
});

// ✅ 8. SYNC REAL INTERNSHIPS (FIXED TO INCLUDE APPLY_LINK)
app.get("/api/admin/sync-real-jobs", async (req, res) => {
    const RAPID_API_KEY = "89ba902116msh4dc6b3d0c77fcafp14fe9fjsn7788a84e3110"; 

    const options = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/search',
        params: {
            query: 'Software Engineering Intern in India',
            num_pages: '1',
            employment_types: 'INTERN'
        },
        headers: {
            'X-RapidAPI-Key': RAPID_API_KEY,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        const realJobs = response.data.data;
        let newJobsCount = 0;

        for (let job of realJobs) {
            const exists = await Internship.findOne({ 
                where: { title: job.job_title, company: job.employer_name } 
            });

            if (!exists) {
                const extractedSkills = job.job_highlights?.Qualifications 
                    ? job.job_highlights.Qualifications.join(", ") 
                    : "JavaScript, React, Node.js, Python"; 

                await Internship.create({
                    title: job.job_title,
                    company: job.employer_name,
                    description: job.job_description.substring(0, 1000),
                    skills: extractedSkills,
                    location: job.job_is_remote ? "Remote" : (job.job_city || "India"),
                    duration: "3-6 Months",
                    apply_link: job.job_apply_link // ✅ ADDED THIS LINE
                });
                newJobsCount++;
            }
        }
        res.json({ success: true, message: `Synced ${newJobsCount} new internships!` });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch real data" });
    }
}); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));