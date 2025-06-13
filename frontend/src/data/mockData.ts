import { Issue, User, DiscussionMessage, WardPerformance, IssueCategory, IssueStatus } from '../types';

// Mock Issues
export const MOCK_ISSUES: Issue[] = [
  {
    id: '1',
    title: 'Broken streetlight on Durbar Marg',
    description: 'The streetlight near the Durbar Marg intersection has been broken for 2 weeks, causing safety concerns at night.',
    category: 'electricity',
    status: 'pending',
    wardNumber: 1,
    location: 'Durbar Marg, near King\'s Way junction',
    votes: 24,
    reportedBy: 'user-1',
    reportedAt: '2025-04-15T10:30:00Z',
    images: ['https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg'],
    isAnonymous: false
  },
  {
    id: '2',
    title: 'Garbage not collected for a week',
    description: 'Garbage has not been collected in the Thamel area for over a week, creating health hazards.',
    category: 'garbage',
    status: 'in-progress',
    wardNumber: 3,
    location: 'Thamel, near Fire Street',
    votes: 56,
    reportedBy: 'user-2',
    reportedAt: '2025-04-10T14:20:00Z',
    images: ['https://images.pexels.com/photos/2768961/pexels-photo-2768961.jpeg'],
    isAnonymous: false
  },
  {
    id: '3',
    title: 'Pothole on Kamaladi Road',
    description: 'Large pothole forming on Kamaladi Road near the bank junction. Multiple vehicles have been damaged.',
    category: 'road',
    status: 'in-progress',
    wardNumber: 2,
    location: 'Kamaladi Road, opposite Nepal Bank',
    votes: 38,
    reportedBy: 'user-3',
    reportedAt: '2025-04-08T09:15:00Z',
    images: ['https://images.pexels.com/photos/5409751/pexels-photo-5409751.jpeg'],
    isAnonymous: true
  },
  {
    id: '4',
    title: 'Water supply disruption in Kalimati',
    description: 'No water supply in Kalimati area for the past 3 days. Affecting hundreds of households.',
    category: 'water',
    status: 'pending',
    wardNumber: 5,
    location: 'Kalimati residential area',
    votes: 87,
    reportedBy: 'user-4',
    reportedAt: '2025-04-14T11:45:00Z',
    images: ['https://images.pexels.com/photos/1089928/pexels-photo-1089928.jpeg'],
    isAnonymous: false
  },
  {
    id: '5',
    title: 'Collapsed wall near public school',
    description: 'A section of the perimeter wall of the public school has collapsed and needs immediate attention.',
    category: 'infrastructure',
    status: 'resolved',
    wardNumber: 4,
    location: 'Public School, Balaju',
    votes: 43,
    reportedBy: 'user-5',
    reportedAt: '2025-04-05T10:00:00Z',
    images: ['https://images.pexels.com/photos/1573324/pexels-photo-1573324.jpeg'],
    isAnonymous: false
  },
  {
    id: '6',
    title: 'Sewage overflow on New Road',
    description: 'Sewage overflowing onto New Road creating unsanitary conditions for pedestrians and businesses.',
    category: 'sanitation',
    status: 'pending',
    wardNumber: 3,
    location: 'New Road, near central junction',
    votes: 62,
    reportedBy: 'user-6',
    reportedAt: '2025-04-13T13:30:00Z',
    images: ['https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg'],
    isAnonymous: true
  }
];

// Mock Users
export const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    name: 'Aarav Sharma',
    email: 'aarav@example.com',
    wardNumber: 1,
    role: 'citizen',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
  },
  {
    id: 'user-2',
    name: 'Sita Rai',
    email: 'sita@example.com',
    wardNumber: 3,
    role: 'citizen',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
  },
  {
    id: 'admin-1',
    name: 'Nabin Thapa',
    email: 'nabin@kathmandumetro.gov.np',
    wardNumber: 0,
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
  },
  {
    id: 'ward-admin-1',
    name: 'Rajesh KC',
    email: 'rajesh@kathmandumetro.gov.np',
    wardNumber: 2,
    role: 'ward-admin',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg'
  }
];

// Mock Discussion Messages
export const MOCK_DISCUSSIONS: DiscussionMessage[] = [
  {
    id: 'msg-1',
    content: 'I would like to bring attention to the increasing garbage problem in Ward 3. Can we organize a community cleanup?',
    userId: 'user-2',
    userName: 'Sita Rai',
    userRole: 'citizen',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    createdAt: '2025-04-14T09:30:00Z',
    replies: [
      {
        id: 'msg-2',
        content: 'That\'s a great initiative. The municipality is planning a cleanup drive next weekend. We welcome community participation.',
        userId: 'admin-1',
        userName: 'Nabin Thapa',
        userRole: 'admin',
        userAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
        createdAt: '2025-04-14T10:15:00Z',
      },
      {
        id: 'msg-3',
        content: 'I can help organize volunteers from our local youth club.',
        userId: 'user-1',
        userName: 'Aarav Sharma',
        userRole: 'citizen',
        userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
        createdAt: '2025-04-14T11:00:00Z',
      }
    ]
  },
  {
    id: 'msg-4',
    content: 'The water supply issue in Ward 5 has been ongoing for too long. What steps is the municipality taking to address this?',
    userId: 'user-4',
    userName: 'Maya Gurung',
    userRole: 'citizen',
    createdAt: '2025-04-13T14:20:00Z',
    replies: [
      {
        id: 'msg-5',
        content: 'We are aware of the issue and have dispatched a repair team. The main pipeline had a leak which is being fixed. Service should resume by tomorrow.',
        userId: 'ward-admin-1',
        userName: 'Rajesh KC',
        userRole: 'ward-admin',
        userAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
        createdAt: '2025-04-13T15:45:00Z',
      }
    ]
  }
];

// Mock Ward Performance Data
export const MOCK_WARD_PERFORMANCE: WardPerformance[] = [
  {
    wardNumber: 1,
    totalIssues: 120,
    resolvedIssues: 105,
    resolutionRate: 87.5,
    rank: 3,
    status: 'best-performing'
  },
  {
    wardNumber: 2,
    totalIssues: 145,
    resolvedIssues: 132,
    resolutionRate: 91.0,
    rank: 1,
    status: 'best-performing'
  },
  {
    wardNumber: 3,
    totalIssues: 98,
    resolvedIssues: 65,
    resolutionRate: 66.3,
    rank: 5,
    status: 'average'
  },
  {
    wardNumber: 4,
    totalIssues: 156,
    resolvedIssues: 137,
    resolutionRate: 87.8,
    rank: 2,
    status: 'best-performing'
  },
  {
    wardNumber: 5,
    totalIssues: 110,
    resolvedIssues: 62,
    resolutionRate: 56.4,
    rank: 6,
    status: 'underperforming'
  },
  {
    wardNumber: 6,
    totalIssues: 87,
    resolvedIssues: 70,
    resolutionRate: 80.5,
    rank: 4,
    status: 'average'
  }
];

// Categories with labels and colors
export const ISSUE_CATEGORIES: Record<IssueCategory, { label: string, icon: string }> = {
  'road': { label: 'Road Issues', icon: 'road' },
  'water': { label: 'Water Supply', icon: 'droplets' },
  'electricity': { label: 'Electricity', icon: 'zap' },
  'garbage': { label: 'Garbage Collection', icon: 'trash-2' },
  'infrastructure': { label: 'Infrastructure', icon: 'building' },
  'sanitation': { label: 'Sanitation', icon: 'shower-head' },
  'public-safety': { label: 'Public Safety', icon: 'shield-alert' },
  'other': { label: 'Other Issues', icon: 'more-horizontal' }
};

// Status with labels and colors
export const ISSUE_STATUSES: Record<IssueStatus, { label: string, color: string }> = {
  'pending': { label: 'Pending', color: 'warning' },
  'in-progress': { label: 'In Progress', color: 'primary-500' },
  'resolved': { label: 'Resolved', color: 'success' }
};

// Municipality data
export const MUNICIPALITY = {
  id: 'ktm-metro',
  name: 'Kathmandu Metropolitan City',
  totalWards: 32,
  province: 'Bagmati',
  district: 'Kathmandu'
};