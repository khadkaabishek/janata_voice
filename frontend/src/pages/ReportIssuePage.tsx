import React, { useState } from 'react';
import { Camera, MapPin, AlertTriangle, X } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent, CardHeader, CardFooter } from '../components/ui/Card';
import { ISSUE_CATEGORIES } from '../data/mockData';
import { IssueCategory } from '../types';

const ReportIssuePage: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<IssueCategory>('road');
  const [location, setLocation] = useState('');
  const [wardNumber, setWardNumber] = useState(5); // Default to user's ward
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files);
      
      // Create URLs for preview
      const newPreviewUrls = newImages.map(file => URL.createObjectURL(file));
      
      // Limit to 3 images
      const updatedPreviews = [...previewImages, ...newPreviewUrls].slice(0, 3);
      setPreviewImages(updatedPreviews);
      
      // In a real app, we would upload these to a server
      // For this demo, we'll just use the preview URLs
      setImages(updatedPreviews);
    }
  };
  
  const removeImage = (index: number) => {
    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    setPreviewImages(updatedPreviews);
    setImages(updatedPreviews);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setIsSuccess(false);
        setTitle('');
        setDescription('');
        setCategory('road');
        setLocation('');
        setWardNumber(5);
        setIsAnonymous(false);
        setImages([]);
        setPreviewImages([]);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="py-6 px-2 md:px-6">
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
              <AlertTriangle size={32} />
            </div>
            <h2 className="text-2xl font-bold text-success-dark mb-2">Report Submitted Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your report. Municipal authorities will review it and take appropriate action.
              You can track the status of your report in the Issues Dashboard.
            </p>
            <Button 
              variant="primary" 
              onClick={() => setIsSuccess(false)}
            >
              Report Another Issue
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <h2 className="text-xl font-semibold text-primary-700">Issue Details</h2>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Issue Title *
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Brief title describing the issue"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  id="description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide details about the issue"
                  rows={4}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    id="category"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value as IssueCategory)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {Object.entries(ISSUE_CATEGORIES).map(([value, { label }]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="ward" className="block text-sm font-medium text-gray-700 mb-1">
                    Ward Number *
                  </label>
                  <select
                    id="ward"
                    required
                    value={wardNumber}
                    onChange={(e) => setWardNumber(parseInt(e.target.value))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((ward) => (
                      <option key={ward} value={ward}>
                        Ward {ward}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Specific Location
                </label>
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
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Images * (1-3 images)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Camera size={48} className="mx-auto text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="image-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500"
                      >
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
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
                
                {previewImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {previewImages.map((src, index) => (
                      <div key={index} className="relative">
                        <img
                          src={src}
                          alt={`Preview ${index + 1}`}
                          className="h-24 w-full object-cover rounded-md"
                        />
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
                size="lg"
                isLoading={isSubmitting}
                disabled={isSubmitting || previewImages.length === 0}
              >
                Submit Report
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  );
};

export default ReportIssuePage;