const BASE_URL = "http://localhost:5001"; 
export async function postIssue(data: {
  title: string;
  description: string;
  category: string;
  location: string;
  ward: number;
  isAnonymous: boolean;
  latitude?: number;
  longitude?: number;
  images: File[];
  audioBlob?: Blob | null;
  currName:string,
}) {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('category', data.category);
  formData.append('location', data.location);
  formData.append('ward', String(data.ward));
  formData.append('isAnonymous', String(data.isAnonymous));
  formData.append('currName', String(data.currName));

  if (data.latitude) formData.append('latitude', String(data.latitude));
  if (data.longitude) formData.append('longitude', String(data.longitude));
    console.log(formData.currName);
  data.images.forEach((image) => {
    formData.append('images', image);
  });

  if (data.audioBlob) {
    formData.append('audio', data.audioBlob, 'voice-note.webm');
  }

  const response = await fetch('http://localhost:5001/api/issue/create', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to submit issue');
  }

  return result;
}

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
  // Construct query parameters
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