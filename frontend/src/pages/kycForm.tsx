import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, FileText } from 'lucide-react';
import Card, { CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../utils/user';

const KYCForm = () => {
    const { isverifyPending } = useAuth();
   const navigate = useNavigate();
  // Controlled form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nid, setNid] = useState('');
  const [nidCard, setNidCard] = useState<File | null>(null);

  const [nidPreview, setNidPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNidCard(e.target.files[0]);
      setNidPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setNidCard(null);
      setNidPreview(null);
    }
  };

  const validateForm = () => {
    if (!fullName.trim()) {
      setErrorMessage('Full name is required');
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Valid email is required');
      return false;
    }
    if (!phone.trim() || phone.length < 10) {
      setErrorMessage('Valid phone number is required');
      return false;
    }
    if (!nid.trim() || nid.length < 5) {
      setErrorMessage('NID number is required');
      return false;
    }
    if (!nidCard) {
      setErrorMessage('NID card image is required');
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('nid', nid);
      if (nidCard) formData.append('nidCard', nidCard);

      const response = await fetch('http://localhost:5001/submitkyc', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit KYC');
      }

      // const result = await response.json();
      // console.log('Success:', result);
      // alert('KYC submitted successfully!');
      
      // Reset form
      // setFullName('');
      // setEmail('');
      // setPhone('');
      // setNid('');
      // setNidCard(null);
      // setNidPreview(null);
      isverifyPending();
     
      navigate('/dashboard/issues');
    } catch (error: any) {
      setErrorMessage(error.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-6 sm:px-10 lg:px-12 bg-gray-50">
      <div className="max-w-xl w-full sm:max-w-2xl">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-primary-700">KYC Form</h2>
            <p className="text-sm text-gray-500">Fill in your details for verification.</p>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10 block w-full py-2 border rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="John Doe"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 block w-full py-2 border rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="you@example.com"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10 block w-full py-2 border rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="98XXXXXXXX"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* NID Number */}
              <div>
                <label htmlFor="nid" className="block text-sm font-medium text-gray-700 mb-1">
                  NID Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="nid"
                    type="text"
                    value={nid}
                    onChange={(e) => setNid(e.target.value)}
                    className="pl-10 block w-full py-2 border rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="1234-5678-9012"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* NID Card Upload */}
              <div>
                <label htmlFor="nidCard" className="block text-sm font-medium text-gray-700 mb-1">
                  Upload NID Card
                </label>
                <input
                  id="nidCard"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full py-2 px-3 border rounded-md text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                  disabled={isSubmitting}
                />
                {/* Optional Image Preview */}
                {nidPreview && (
                  <img
                    src={nidPreview}
                    alt="NID Preview"
                    className="mt-2 rounded-md border w-48 object-contain"
                  />
                )}
              </div>

              {/* Show error if any */}
              {errorMessage && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
              )}
            </CardContent>

            <CardFooter>
              <Button type="submit" fullWidth variant="primary" isLoading={isSubmitting}>
                Submit KYC
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default KYCForm;
