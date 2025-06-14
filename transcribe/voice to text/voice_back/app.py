from flask import Flask, request, jsonify
from flask_cors import CORS
import whisper
import os
import uuid

app = Flask(__name__)

# Allow CORS for your React frontend
CORS(app, origins=["http://localhost:5173"])

# Load Whisper model once
model = whisper.load_model("large")  # You can also use "base", "small", or "medium" for speed/memory

# Ensure necessary folders exist
UPLOAD_FOLDER = "uploads"
TRANSCRIPTION_FOLDER = "transcriptions"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(TRANSCRIPTION_FOLDER, exist_ok=True)

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    audio = request.files.get('audio')
    if not audio:
        return jsonify({'error': 'No audio file provided'}), 400

    # Create a unique filename
    filename = f"{uuid.uuid4().hex}_{audio.filename}"
    audio_path = os.path.join(UPLOAD_FOLDER, filename)
    audio.save(audio_path)

    try:
        # Transcribe using Whisper
        result = model.transcribe(audio_path, language="ne", task="transcribe")
        text = result.get('text', '').strip()

        # Save transcription to a .txt file
        txt_filename = f"{os.path.splitext(filename)[0]}.txt"
        txt_path = os.path.join(TRANSCRIPTION_FOLDER, txt_filename)
        with open(txt_path, 'w', encoding='utf-8') as f:
            f.write(text)

        return jsonify({'text': text})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        # Clean up uploaded audio file after transcription
        if os.path.exists(audio_path):
            os.remove(audio_path)

if __name__ == '__main__':
    app.run(debug=True, port=5009)
