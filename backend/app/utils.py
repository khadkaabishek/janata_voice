import uuid
import os
from fastapi import UploadFile
from config import AUDIO_UPLOAD_FOLDER
import shutil

def save_audio(file: UploadFile) -> str:
    ext = os.path.splitext(file.filename)[1]
    filename = f"{uuid.uuid4().hex}{ext}"
    path = os.path.join(AUDIO_UPLOAD_FOLDER, filename)

    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return filename
