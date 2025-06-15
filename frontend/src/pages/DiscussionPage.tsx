import React, { useState, useEffect } from 'react';
import { Send, Image } from 'lucide-react';
import Card, { CardContent, CardHeader, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { formatRelativeTime } from '../utils/dateFormatter';

type Reply = {
  _id: string;
  content: string;
  repliedBy: {
    name: string;
    role: string;
    avatar?: string;
  };
  createdAt: string;
};

type Discussion = {
  _id: string;
  content: string;
  commentedBy: {
    name: string;
    role: string;
    avatar?: string;
  };
  type: 'ward' | 'municipality';
  createdAt: string;
  replies: Reply[];
};

type UserProfile = {
  data: {
    user: {
      name: string;
      wardNo: number;
      avatar?: string;
      role?: string;
    };
  };
};

const Sidebar: React.FC = () => (
  <aside className="space-y-6">
    {/* ...sidebar code as in your example... */}
  </aside>
);

const DiscussionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'municipality' | 'ward'>('ward');
  const [message, setMessage] = useState('');
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile on mount
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        setUserData(null);
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching user data with token:', token.substring(0, 20) + '...');
        
        const response = await fetch('http://localhost:5001/api/users/me', {
          method: 'GET',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error:', response.status, errorText);
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log('User data received:', data);
        
        // Validate the data structure
        if (data && data.data && data.data.user) {
          setUserData(data);
          setError(null);
        } else {
          console.error('Invalid user data structure:', data);
          setUserData(null);
          setError('Invalid user data received');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setUserData(null);
        setError(err instanceof Error ? err.message : 'Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Fetch discussions from backend
  useEffect(() => {
    const fetchDiscussions = async () => {
      const token = localStorage.getItem('token');
      
      try {
        const response = await fetch(`http://localhost:5001/api/discussion/type/${activeTab}`, {
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          }
        });

        if (response.status === 401) {
          throw new Error("Unauthorized");
        }

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Discussions data received:', data);
        
        if (Array.isArray(data)) {
          setDiscussions(data);
        } else if (Array.isArray(data.discussions)) {
          setDiscussions(data.discussions);
        } else {
          console.error('Invalid discussions data structure:', data);
          setDiscussions([]);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching discussions:', err);
        setDiscussions([]);
        setError(err instanceof Error ? err.message : "Failed to fetch discussions from server.");
      }
    };

    fetchDiscussions();
  }, [activeTab]);

  // Submit a new comment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setError("You must be logged in to comment.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/discussion/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: message, type: activeTab })
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("You must be logged in to comment.");
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const newComment = await response.json();
      setDiscussions([newComment, ...discussions]);
      setMessage('');
      setError(null);
    } catch (err) {
      console.error('Error posting comment:', err);
      setError(err instanceof Error ? err.message : "Failed to post comment.");
    }
  };

  // Submit a reply
  const handleReply = async (discussionId: string) => {
    if (!replyContent.trim()) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setError("You must be logged in to reply.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/discussion/reply/${discussionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: replyContent })
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("You must be logged in to reply.");
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const updatedDiscussion = await response.json();
      setDiscussions(discussions =>
        discussions.map(d =>
          d._id === updatedDiscussion._id ? updatedDiscussion : d
        )
      );
      setReplyingTo(null);
      setReplyContent('');
      setError(null);
    } catch (err) {
      console.error('Error posting reply:', err);
      setError(err instanceof Error ? err.message : "Failed to post reply.");
    }
  };

  const renderUserBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge variant="primary">Admin</Badge>;
      case 'ward-admin':
        return <Badge variant="success">Ward Admin</Badge>;
      default:
        return <Badge variant="default">Citizen</Badge>;
    }
  };

  // Use userData for name in the comment box and optimistic UI
  const userName = userData?.data?.user?.name || 'Guest';
  const userRole = userData?.data?.user?.role || 'citizen';
  const userAvatar = userData?.data?.user?.avatar || 
    "https://www.gstatic.com/images/branding/product/1x/avatar_square_blue_512dp.png";

  if (loading) {
    return (
      <div className="py-6 px-2 md:px-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 px-2 md:px-6">
      {/* Tabs for switching between municipality and ward */}
      <div className="mb-4 flex gap-2">
        <Button
          variant={activeTab === 'ward' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setActiveTab('ward')}
        >
          Ward
        </Button>
        <Button
          variant={activeTab === 'municipality' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setActiveTab('municipality')}
        >
          Municipality
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="border-b">
              <h2 className="text-xl font-bold">Discussions</h2>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4 bg-gray-50 border-b">
                <form onSubmit={handleSubmit} className="flex items-start space-x-2">
                  <img
                    src={userAvatar}
                    alt={userName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder={`Share your thoughts, ${userName}...`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      rows={3}
                    />
                    <div className="mt-2 flex justify-between">
                      <button
                        type="button"
                        className="text-gray-500 hover:text-primary-600"
                      >
                        <Image size={20} />
                      </button>
                      <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        disabled={!message.trim()}
                        icon={<Send size={16} />}
                      >
                        Send
                      </Button>
                    </div>
                  </div>
                </form>
                {error && (
                  <div className="mt-2 text-sm text-red-600">
                    {error}
                  </div>
                )}
              </div>

              <div className="divide-y">
                {/* Debug section - remove this after fixing the issue */}
                {/* {process.env.NODE_ENV === 'development' && discussions.length > 0 && (
                  // <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md mb-4">
                  //   <h3 className="font-bold text-yellow-800 mb-2">Debug Info (First Discussion):</h3>
                  //   <pre className="text-xs text-yellow-700 overflow-auto">
                  //     {JSON.stringify(discussions[0], null, 2)}
                  //   </pre>
                  // </div>
                )} */}

                {Array.isArray(discussions) && discussions.length > 0 ? (
                  discussions.map((msg) => (
                    <div key={msg._id} className="p-4">
                      <div className="flex space-x-3">
                        <img
                          src={msg.commentedBy?.avatar || userAvatar}
                          alt={msg.commentedBy?.name || 'User'}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <span className="font-medium text-gray-900 mr-2">
                              {msg.commentedBy?.name || msg.commentedBy?.user?.name || userName || 'Anonymous'}
                            </span>
                            {renderUserBadge(msg.commentedBy?.role || msg.commentedBy?.user?.role || 'citizen')}
                            <span className="text-xs text-gray-500 ml-2">
                              {formatRelativeTime(msg.createdAt)}
                            </span>
                          </div>
                          <div className="text-gray-700 mb-2">{msg.content}</div>
                          <div className="flex items-center text-sm text-gray-500 space-x-4">
                            <button 
                              onClick={() => setReplyingTo(msg._id)} 
                              className="hover:text-primary-600"
                            >
                              Reply
                            </button>
                          </div>

                          {/* Replies */}
                          {msg.replies && msg.replies.length > 0 && (
                            <div className="mt-3 ml-3 pl-3 border-l-2 border-gray-200 space-y-3">
                              {msg.replies.map((reply) => (
                                <div key={reply._id} className="flex space-x-3">
                                  <img
                                    src={reply.repliedBy?.avatar || userAvatar}
                                    alt={reply.repliedBy?.name || 'User'}
                                    className="w-8 h-8 rounded-full"
                                  />
                                  <div>
                                    <div className="flex items-center mb-1">
                                      <span className="font-medium text-gray-900 mr-2">
                                        {reply.repliedBy?.name || reply.repliedBy?.user?.name || userName || 'Anonymous'}
                                      </span>
                                      {renderUserBadge(reply.repliedBy?.role || reply.repliedBy?.user?.role || 'citizen')}
                                      <span className="text-xs text-gray-500 ml-2">
                                        {formatRelativeTime(reply.createdAt)}
                                      </span>
                                    </div>
                                    <div className="text-gray-700 mb-1">{reply.content}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Reply Form */}
                          {replyingTo === msg._id && (
                            <form
                              onSubmit={e => {
                                e.preventDefault();
                                handleReply(msg._id);
                              }}
                              className="mt-2 flex items-start space-x-2"
                            >
                              <img
                                src={userAvatar}
                                alt={userName}
                                className="w-8 h-8 rounded-full"
                              />
                              <div className="flex-1">
                                <textarea
                                  value={replyContent}
                                  onChange={e => setReplyContent(e.target.value)}
                                  placeholder="Write a reply..."
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                  rows={2}
                                />
                                <div className="mt-2 flex justify-end space-x-2">
                                  <Button 
                                    type="button" 
                                    variant="secondary" 
                                    size="sm" 
                                    onClick={() => {
                                      setReplyingTo(null);
                                      setReplyContent('');
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button 
                                    type="submit" 
                                    variant="primary" 
                                    size="sm" 
                                    disabled={!replyContent.trim()}
                                  >
                                    Reply
                                  </Button>
                                </div>
                              </div>
                            </form>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    No discussions yet. Be the first to start a conversation!
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="secondary" size="sm">
                Load More
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
};

export default DiscussionPage;