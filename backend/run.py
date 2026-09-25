import uvicorn
import os
import sys

# Ensure backend root is on sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

if __name__ == "__main__":
    print("==================================================")
    print("  NEXORA Enterprise E-Commerce FastAPI Server")
    print("  URL: http://127.0.0.1:8000")
    print("  Docs: http://127.0.0.1:8000/docs")
    print("==================================================")
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
