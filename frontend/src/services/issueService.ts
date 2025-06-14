const BASE_URL = "http://localhost:5001"; 
export const postIssue = async (issueData: {
  title: string;
  description: string;
  images: File[];
  location: string;
  isAnonymous: boolean;
  audioBlob: Blob | null;
  ward: number;
  category: string;
  latitude?: number;
  longitude?: number;
}) => {
  const formData = new FormData();
  
  // Append basic fields
  formData.append('title', issueData.title);
  formData.append('description', issueData.description);
  formData.append('location', issueData.location);
  formData.append('isAnonymous', String(issueData.isAnonymous));
  formData.append('ward', String(issueData.ward));
  formData.append('category', issueData.category);

  // Append geolocation if available
  if (issueData.latitude) formData.append('latitude', String(issueData.latitude));
  if (issueData.longitude) formData.append('longitude', String(issueData.longitude));

  // Append images
  issueData.images.forEach((image) => {
    formData.append('images', image);
  });

  // Append audio if exists
  if (issueData.audioBlob) {
    formData.append('audio', issueData.audioBlob, 'voice-description.webm');
  }

  const response = await fetch(`${ BASE_URL }/api/issues`, {
    method: 'POST',
    body: formData,
    credentials: 'include', // if you need to send cookies
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to submit issue');
  }

  return response.json();
};
export interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'in-progress' | 'resolved';
  wardNumber: number;
  votes: number;
  reportedAt: string;
  reportedBy?: string;
  latitude?: number;
  longitude?: number;
  imageUrls?: string[];
}

export const fetchIssues = async (filters: {
  search?: string;
  category?: string;
  status?: string;
  ward?: number;
  sortBy?: string;
  critical?: boolean;
  myReports?: boolean;
}): Promise<Issue[]> => {
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  if (filters.category) params.append('category', filters.category);
  if (filters.status) params.append('status', filters.status);
  if (filters.ward) params.append('ward', filters.ward.toString());
  if (filters.sortBy) params.append('sortBy', filters.sortBy);
  if (filters.critical) params.append('critical', 'true');
  if (filters.myReports) params.append('my', 'true');

  const response = await fetch(`${BASE_URL}/api/issues?${params.toString()}`, {
    credentials: 'include', // if you need to send cookies
  });

  if (!response.ok) {
    throw new Error('Failed to fetch issues');
  }

  return response.json();
};