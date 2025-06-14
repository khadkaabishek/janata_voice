import React, { useState, useRef } from 'react';

const VoiceRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [translated, setTranslated] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks: Blob[] = [];

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunks.length = 0;

    mediaRecorder.ondataavailable = event => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      const formData = new FormData();
      formData.append('audio', audioBlob, 'voice.wav');

      try {
        const response = await fetch('http://localhost:5009/transcribe', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
setTranscript(result.original_text);
setTranslated(result.translated_text);

// Play the returned audio
const audio = new Audio(result.audio_url);
audio.play();
      } catch (error) {
        console.error('Transcription failed:', error);
      }
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  return (
    <div>
      <h2>🎤 Voice to Nepali Translator</h2>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? '⏹ Stop Recording' : '🎙 Start Recording'}
      </button>
      <p>🗣 Original: {transcript}</p>
      <p>🔁 Translated: {translated}</p>
    </div>
  );
};

export default VoiceRecorder;
