# Backend fixes

Replace these files in your backend folder:

- `models/internship.js` — removed stray `z` that broke the export.
- `ai-engine/extract_skills.py` — much bigger skill dictionary + word-boundary matching.
- `ai-engine/app.py` — caches job embeddings (huge speedup on repeated calls), normalized cosine, returns top 20.

## Run order
1. `cd backend && npm install`
2. `cd ai-engine && pip install flask flask-cors sentence-transformers scikit-learn mysql-connector-python pymupdf numpy`
3. Start AI engine: `python ai-engine/app.py`   (port 8000)
4. Start API:       `node server.js`            (port 5000)
5. Start frontend (this Lovable project) — it calls http://localhost:5000.

If the frontend cannot reach `localhost:5000`, set `VITE_API_URL` to your deployed backend URL.
