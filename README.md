# AI Internship Recommender — Full Project

- `frontend/` — React + TanStack Start (indigo-violet UI)
- `backend/`  — Node.js + Express API + Python AI engine (TF-IDF)

## Quick start

### 1. Python AI engine (port 8000)
    cd backend/ai-engine
    pip install flask scikit-learn sentence-transformers pdfplumber numpy
    python app.py

### 2. Node.js backend (port 5000)
    cd backend
    npm install
    # configure config/db.js with your MySQL creds
    node server.js

### 3. Frontend (port 5173)
    cd frontend
    npm install
    npm run dev

Frontend talks to http://localhost:5000 by default. Override via:
    echo "VITE_API_URL=http://your-host:5000" > frontend/.env

## Roles
- Student  → /student : paste skills or upload PDF resume → ranked matches.
- Recruiter → /recruiter : post internships, sync Kaggle/JSearch jobs.
