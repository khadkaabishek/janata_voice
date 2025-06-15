import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, AlertTriangle, X, Mic, Trash2, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent, CardHeader, CardFooter } from '../components/ui/Card';
import { ISSUE_CATEGORIES } from '../data/mockData';
import { IssueCategory } from '../types';
import { postIssue } from '../services/issueService';

const ReportIssuePage: React.FC = () => {
  const navigate = useNavigate();
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<IssueCategory>('road');
  const [location, setLocation] = useState('');
  const [wardNumber, setWardNumber] = useState(5);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ form?: string }>({});
  const [geoLocation, setGeoLocation] = useState<{ latitude?: number; longitude?: number }>({});

  // Voice recording states
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Get user's geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeoLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.warn('Geolocation error:', error);
        }
      );
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).slice(0, 3 - previewImages.length);
      const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newFiles]);
      setPreviewImages(prev => [...prev, ...newPreviewUrls]);
    }
  };

  const removeImage = (index: number) => {
    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    const updatedFiles = images.filter((_, i) => i !== index);
    setPreviewImages(updatedPreviews);
    setImages(updatedFiles);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = event => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        // Clean up the stream
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Microphone access is required to record voice description.';
      alert(errorMessage);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const removeAudio = () => {
    setAudioBlob(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Basic validation
    if (!title || !description || images.length === 0) {
      setErrors({ form: 'Please fill all required fields and upload at least one image' });
      return;
    }
  
    setIsSubmitting(true);
    setErrors({});
  
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('location', location);
      formData.append('ward', String(wardNumber));
      formData.append('isAnonymous', String(isAnonymous));
      if (geoLocation.latitude) formData.append('latitude', String(geoLocation.latitude));
      if (geoLocation.longitude) formData.append('longitude', String(geoLocation.longitude));
  
      images.forEach((image, index) => {
        formData.append('images', image); // Must match backend field name
      });
  
      if (audioBlob) {
        formData.append('audio', audioBlob, 'voice-note.webm'); // Match backend expected name
      }
  
      const response = await fetch('http://localhost:5001/api/issue/create', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit issue');
      }
  
      setIsSuccess(true);
      resetForm();
    } catch (error: any) {
      console.error('Submission error:', error);
      setErrors({ form: error.message || 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('road');
    setLocation('');
    setWardNumber(5);
    setIsAnonymous(false);
    setImages([]);
    setPreviewImages([]);
    setAudioBlob(null);
  };

  return (
    <div className="py-6 px-2 md:px-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-800 mb-2">Report an Issue</h1>
        <p className="text-gray-600">
          Fill out the form below to report an issue in your ward. Your report will be reviewed by municipal authorities.
        </p>
      </div>

      {isSuccess ? (
        <Card>
          <CardContent className="py-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-success-light/20 text-success rounded-full mb-4">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-2xl font-bold text-success-dark mb-2">Report Submitted Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your report. Municipal authorities will review it and take appropriate action.
              You can track the status of your report in the Issues Dashboard.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="primary" onClick={() => navigate('/')}>Go to Dashboard</Button>
              <Button variant="outline" onClick={() => setIsSuccess(false)}>Report Another Issue</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <h2 className="text-xl font-semibold text-primary-700">Issue Details</h2>
            </CardHeader>

            <CardContent className="space-y-6">
              {errors.form && (
                <div className="p-4 bg-red-50 text-red-600 rounded-md border border-red-100">
                  <AlertTriangle className="inline mr-2" size={18} />
                  {errors.form}
                </div>
              )}

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Issue Title *</label>
                <input
                  id="title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Brief title describing the issue"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  id="description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide details about the issue"
                  rows={4}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Add Voice Description (Optional)</label>
                <div className="flex items-center gap-4">
                  {!isRecording && !audioBlob && (
                    <Button type="button" variant="outline" onClick={startRecording}>
                      <Mic className="mr-2" size={18} />
                      Record
                    </Button>
                  )}

                  {isRecording && (
                    <Button type="button" variant="destructive" onClick={stopRecording}>
                      <Mic className="mr-2 animate-pulse" size={18} />
                      Stop
                    </Button>
                  )}

                  {audioBlob && (
                    <div className="flex items-center gap-3">
                      <audio controls src={URL.createObjectURL(audioBlob)} />
                      <button type="button" onClick={removeAudio} className="text-red-500 hover:text-red-700">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    id="category"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value as IssueCategory)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {Object.entries(ISSUE_CATEGORIES).map(([value, { label }]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="ward" className="block text-sm font-medium text-gray-700 mb-1">Ward Number *</label>
                  <select
                    id="ward"
                    required
                    value={wardNumber}
                    onChange={(e) => setWardNumber(parseInt(e.target.value))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((ward) => (
                      <option key={ward} value={ward}>Ward {ward}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Specific Location</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Near City Hall, North side of Durbar Square"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                {geoLocation.latitude && (
                  <p className="mt-1 text-xs text-gray-500">
                    Your current location: {geoLocation.latitude?.toFixed(4)}, {geoLocation.longitude?.toFixed(4)}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Images * (1–3 images)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Camera size={48} className="mx-auto text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500">
                        <span>Upload images</span>
                        <input
                          id="image-upload"
                          name="image-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          disabled={previewImages.length >= 3}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>

                {previewImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {previewImages.map((src, index) => (
                      <div key={index} className="relative">
                        <img src={src} alt={`Preview ${index + 1}`} className="h-24 w-full object-cover rounded-md" />
                        <button
                          type="button"
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                          onClick={() => removeImage(index)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center">
                <input
                  id="anonymous"
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                  Submit anonymously (your name will not be displayed publicly)
                </label>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button 
                type="submit" 
                variant="primary" 
                disabled={isSubmitting}
                className="min-w-32"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : 'Submit Report'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  );
};

export default ReportIssuePage;