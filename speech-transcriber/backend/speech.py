import pyaudio
import numpy as np
import whisper
import threading

# Audio Configuration
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 16000
CHUNK = 1024  # Number of audio frames per buffer

# Initialize Whisper Model
model = whisper.load_model("base")  # You can use "tiny", "small", "medium", etc.

def process_audio(audio_data, model):
    """Process audio data and transcribe using Whisper."""
    # Convert raw audio to numpy array
    audio_array = np.frombuffer(audio_data, dtype=np.int16).astype(np.float32) / 32768.0
    # Run transcription
    result = model.transcribe(audio_array, fp16=False)
    print("Transcription:", result["text"])

def listen_and_transcribe():
    """Capture live audio and transcribe in real-time."""
    audio = pyaudio.PyAudio()

    # Open a stream to capture live audio
    stream = audio.open(format=FORMAT, channels=CHANNELS, rate=RATE,
                        input=True, frames_per_buffer=CHUNK)

    print("Listening... (Press Ctrl+C to stop)")

    try:
        while True:
            # Read a chunk of audio data
            audio_data = stream.read(CHUNK, exception_on_overflow=False)

            # Transcribe in a separate thread to keep it responsive
            transcription_thread = threading.Thread(target=process_audio, args=(audio_data, model))
            transcription_thread.start()
    except KeyboardInterrupt:
        print("\nStopping...")
        stream.stop_stream()
        stream.close()
        audio.terminate()

if __name__ == "__main__":
    listen_and_transcribe()
