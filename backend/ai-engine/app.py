"""
Improved AI engine.
- Caches job embeddings in memory (keyed by (id, skills) hash) so we don't
  re-embed thousands of jobs on every request.
- Returns top 20 matches sorted by similarity.
- Uses a higher-quality model option via env var AI_MODEL.
"""
import os
import hashlib
from flask import Flask, request, jsonify
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import mysql.connector
import numpy as np

app = Flask(__name__)
CORS(app)

MODEL_NAME = os.environ.get("AI_MODEL", "all-MiniLM-L6-v2")
print(f"Loading model: {MODEL_NAME}")
model = SentenceTransformer(MODEL_NAME)

# id -> (skills_hash, embedding)
_embed_cache: dict[int, tuple[str, np.ndarray]] = {}

def get_db():
    return mysql.connector.connect(
        host=os.environ.get("DB_HOST", "localhost"),
        user=os.environ.get("DB_USER", "root"),
        password=os.environ.get("DB_PASS", "ranu@1122"),
        database=os.environ.get("DB_NAME", "internshipdb"),
    )

def hash_skills(s: str) -> str:
    return hashlib.md5(s.encode("utf-8")).hexdigest()

def get_job_embeddings(jobs):
    """Return matrix of embeddings, embedding only what's not cached."""
    to_embed_idx, to_embed_text = [], []
    for i, j in enumerate(jobs):
        h = hash_skills(j["skills"] or "")
        cached = _embed_cache.get(j["id"])
        if not cached or cached[0] != h:
            to_embed_idx.append(i)
            to_embed_text.append((j["skills"] or "").lower())

    if to_embed_text:
        new_emb = model.encode(to_embed_text, normalize_embeddings=True)
        for k, idx in enumerate(to_embed_idx):
            j = jobs[idx]
            _embed_cache[j["id"]] = (hash_skills(j["skills"] or ""), new_emb[k])

    return np.vstack([_embed_cache[j["id"]][1] for j in jobs])

@app.route("/recommend", methods=["POST"])
def recommend():
    try:
        data = request.get_json(force=True)
        skills = data.get("skills", "")
        if isinstance(skills, list):
            skills = ", ".join(skills)
        skills = (skills or "").lower().strip()
        if not skills:
            return jsonify({"recommendations": []})

        conn = get_db()
        cur = conn.cursor(dictionary=True)
        cur.execute("SELECT id, skills FROM Internships")
        jobs = cur.fetchall()
        cur.close()
        conn.close()

        if not jobs:
            return jsonify({"recommendations": []})

        job_emb = get_job_embeddings(jobs)
        user_emb = model.encode([skills], normalize_embeddings=True)
        scores = cosine_similarity(user_emb, job_emb)[0]

        results = [
            {"id": jobs[i]["id"], "score": float(scores[i])}
            for i in range(len(jobs))
            if scores[i] > 0.15
        ]
        results.sort(key=lambda r: r["score"], reverse=True)
        return jsonify({"recommendations": results[:20]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/health")
def health():
    return {"ok": True, "model": MODEL_NAME, "cached_jobs": len(_embed_cache)}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
