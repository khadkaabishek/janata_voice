from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import speech_recognition as sr
from googletrans import Translator
from gtts import gTTS
import os
import tempfile

app = Flask(__name__)
CORS(app)

@app.route('/transcribe', methods=['POST'])
def transcribe():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400

    audio_file = request.files['audio']

    # Save the uploaded audio file temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_audio:
        audio_path = temp_audio.name
        audio_file.save(audio_path)

    # Speech Recognition
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_path) as source:
        audio = recognizer.record(source)
        try:
            original_text = recognizer.recognize_google(audio, language="en")
        except sr.UnknownValueError:
            return jsonify({'error': 'Could not understand the audio'}), 400
        except sr.RequestError as e:
            return jsonify({'error': f'Google API error: {e}'}), 500

    # Translation (EN ➝ NE)
    translator = Translator()
    translated_text = translator.translate(original_text, src='en', dest='ne').text

    # Text-to-speech (Nepali)
    tts = gTTS(text=translated_text, lang='ne')
    output_audio_path = os.path.join(tempfile.gettempdir(), "translated.mp3")
    tts.save(output_audio_path)

    return jsonify({
        'original_text': original_text,
        'translated_text': translated_text,
        'audio_url': f'http://localhost:5009/audio'  # separate route to serve it
    })

@app.route('/audio', methods=['GET'])
def get_audio():
    file_path = os.path.join(tempfile.gettempdir(), "translated.mp3")
    if os.path.exists(file_path):
        return send_file(file_path, mimetype="audio/mpeg")
    else:
        return jsonify({"error": "Audio not found"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5009)
