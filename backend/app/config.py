import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
AUDIO_UPLOAD_FOLDER = os.path.join(BASE_DIR, "../uploads/audios")

os.makedirs(AUDIO_UPLOAD_FOLDER, exist_ok=True)
