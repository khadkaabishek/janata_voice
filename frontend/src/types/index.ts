// Issue Types
export type IssueStatus = 'pending' | 'in-progress' | 'resolved';

export type IssueCategory = 
  | 'road' 
  | 'water' 
  | 'electricity' 
  | 'garbage' 
  | 'infrastructure' 
  | 'sanitation'
  | 'public-safety'
  | 'other';

export type Issue = {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  status: IssueStatus;
  wardNumber: number;
  location?: string;
  votes: number;
  reportedBy: string;
  reportedAt: string;
  images: string[];
  isAnonymous: boolean;
  longitude?: number;
  latitude?: number;
};

// User Types
export type UserRole = 'citizen' | 'admin' | 'ward-admin';

export type User = {
  id: string;
  name: string;
  email: string;
  wardNumber: number;
  role: UserRole;
  avatar?: string;
};

// Discussion Types
export type DiscussionMessage = {
  id: string;
  content: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  userAvatar?: string;
  createdAt: string;
  attachments?: string[];
  replies?: DiscussionMessage[];
};

// Analytics Types
export type WardPerformance = {
  wardNumber: number;
  totalIssues: number;
  resolvedIssues: number;
  resolutionRate: number;
  rank: number;
  status: 'best-performing' | 'average' | 'underperforming';
};

// Municipality data
export type Municipality = {
  id: string;
  name: string;
  totalWards: number;
  province: string;
  district: string;
};