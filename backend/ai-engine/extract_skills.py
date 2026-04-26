import sys
import re
import fitz  # PyMuPDF

# Expanded skill dictionary — add more as needed
SKILLS = [
    # Languages
    "python", "java", "javascript", "typescript", "c++", "c#", "go", "rust",
    "ruby", "php", "kotlin", "swift", "scala", "r", "matlab",
    # Web / Frontend
    "react", "next.js", "vue", "angular", "svelte", "html", "css", "tailwind",
    "redux", "vite", "webpack",
    # Backend
    "node", "express", "django", "flask", "fastapi", "spring", "rails",
    "graphql", "rest api",
    # Data / ML
    "machine learning", "deep learning", "data science", "nlp",
    "tensorflow", "pytorch", "scikit-learn", "pandas", "numpy", "matplotlib",
    "computer vision", "transformers", "huggingface",
    # DB
    "sql", "mysql", "postgresql", "mongodb", "redis", "sqlite", "firebase",
    "supabase",
    # Cloud / DevOps
    "aws", "azure", "gcp", "docker", "kubernetes", "ci/cd", "git", "github",
    "linux",
    # Other
    "figma", "agile", "scrum", "rest", "microservices",
]

def extract(file_path: str):
    doc = fitz.open(file_path)
    text = " ".join(page.get_text() for page in doc).lower()
    text = re.sub(r"\s+", " ", text)
    found = []
    for skill in SKILLS:
        # word-boundary match so "go" doesn't match "google"
        pattern = r"(?<![a-z])" + re.escape(skill) + r"(?![a-z])"
        if re.search(pattern, text):
            found.append(skill)
    return found

if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(1)
    for s in extract(sys.argv[1]):
        print(s, flush=True)
