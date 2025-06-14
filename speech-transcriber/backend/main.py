from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from speech import transcribe_nepali
import shutil
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/upload-audio/")
async def upload_audio(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    nepali_text = transcribe_nepali(file_path)
    
    # Save to .txt file
    text_path = file_path.rsplit(".", 1)[0] + ".txt"
    with open(text_path, "w", encoding="utf-8") as f:
        f.write(nepali_text)

    return {"message": "Transcription successful", "text": nepali_text, "saved_to": text_path}
