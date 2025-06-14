import React, { useState, useRef } from 'react';

const App: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const checkPermissions = async () => {
    try {
      const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      return result.state;
    } catch (err) {
      return err;
    }
  };

  const startRecording = async () => {
    try {
      setError('');
      
      // Check if we're in a secure context
      if (!window.isSecureContext) {
        throw new Error('Microphone access requires HTTPS or localhost');
      }
      
      // Check permissions first
      const permissionState = await checkPermissions();
      if (permissionState === 'denied') {
        throw new Error('Microphone permission denied. Please allow microphone access in your browser settings.');
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      // Clear previous chunks
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = async () => {
        try {
          setIsLoading(true);
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          
          // Create FormData for API call
          const formData = new FormData();
          formData.append('audio', audioBlob, 'audio.webm');
          
          // Replace with your actual API endpoint
          const response = await fetch('http://localhost:5009/transcribe', {
            method: 'POST',
            body: formData,
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          setTranscription(data.text || 'No transcription received');
          
        } catch (err) {
          setError(`Transcription failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
          setIsLoading(false);
          // Clean up stream
          if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
          }
        }
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
    } catch (err) {
      setError(`Recording failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const clearTranscription = () => {
    setTranscription('');
    setError('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Nepali Voice to Text
      </h1>
      
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isLoading}
          className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors ${
            isRecording 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-blue-500 hover:bg-blue-600'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Processing...' : isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
        
        {isRecording && (
          <div className="flex items-center space-x-2 text-red-500">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm">Recording...</span>
          </div>
        )}
        
        {transcription && (
          <div className="w-full mt-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-700">Transcription:</h2>
              <button
                onClick={clearTranscription}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear
              </button>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-gray-800 whitespace-pre-wrap">{transcription}</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="w-full mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm font-semibold">Error:</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
            <div className="mt-2 text-xs text-red-500">
              <p><strong>Troubleshooting tips:</strong></p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Make sure you're using HTTPS or localhost</li>
                <li>Check browser permissions (microphone icon in address bar)</li>
                <li>Try refreshing the page and clicking "Allow" when prompted</li>
                <li>Ensure your microphone is connected and working</li>
              </ul>
            </div>
          </div>
        )}
        
        <div className="text-xs text-gray-500 mt-4 text-center">
          <p>🔒 Secure context: {window.isSecureContext ? 'Yes' : 'No (HTTPS required)'}</p>
          <p>🎤 Browser supports audio: {navigator.mediaDevices ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  );
};

export default App;