import React, { useState, useEffect } from 'react';
import { Send, Image, Users, Info, MapPin } from 'lucide-react';
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

const Sidebar: React.FC = () => (
  <aside className="space-y-6">
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Info size={18} className="text-primary-600" />
          <span className="font-semibold text-primary-900">Guidelines</span>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Be respectful and constructive.</li>
          <li>Stay on topic (ward/municipality issues).</li>
          <li>No spam or advertisements.</li>
          <li>Report inappropriate content.</li>
        </ul>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users size={18} className="text-primary-600" />
          <span className="font-semibold text-primary-900">Active Participants</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-7 h-7 rounded-full" />
            <span className="text-xs font-medium text-gray-800">Ram</span>
          </div>
          <div className="flex items-center gap-1">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="w-7 h-7 rounded-full" />
            <span className="text-xs font-medium text-gray-800">Sita</span>
          </div>
          <div className="flex items-center gap-1">
            <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="User" className="w-7 h-7 rounded-full" />
            <span className="text-xs font-medium text-gray-800">Hari</span>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-primary-600" />
          <span className="font-semibold text-primary-900">Ward Office Info</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-gray-700">
          <div>
            <span className="font-semibold">Ward No:</span> 5
          </div>
          <div>
            <span className="font-semibold">Location:</span> Kathmandu, Nepal
          </div>
          <div>
            <span className="font-semibold">Contact:</span> 01-1234567
          </div>
        </div>
      </CardContent>
    </Card>
  </aside>
);

const DiscussionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'municipality' | 'ward'>('ward');
  const [message, setMessage] = useState('');
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Get JWT token from localStorage (where you set it after login)
  const token = localStorage.getItem('token');

  // Fetch discussions from backend
  useEffect(() => {
    fetch(`http://localhost:5001/api/discussion/type/${activeTab}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }
    })
      .then(res => {
        if (res.status === 401) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setDiscussions(data);
        } else if (Array.isArray(data.discussions)) {
          setDiscussions(data.discussions);
        } else {
          setDiscussions([]);
        }
        setError(null);
      })
      .catch((err) => {
        setDiscussions([]);
        setError("Failed to fetch discussions from server.");
      });
  }, [activeTab, token]);

  // Submit a new comment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const res = await fetch('http://localhost:5001/api/discussion/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ content: message, type: activeTab })
    });
    if (res.ok) {
      const newComment = await res.json();
      setDiscussions([newComment, ...discussions]);
      setMessage('');
      setError(null);
    } else if (res.status === 401) {
      setError("You must be logged in to comment.");
    } else {
      setError("Failed to post comment.");
    }
  };

  // Submit a reply
  const handleReply = async (discussionId: string) => {
    if (!replyContent.trim()) return;
    const res = await fetch(`http://localhost:5001/api/discussion/reply/${discussionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ content: replyContent })
    });
    if (res.ok) {
      const updatedDiscussion = await res.json();
      setDiscussions(discussions =>
        discussions.map(d =>
          d._id === updatedDiscussion._id ? updatedDiscussion : d
        )
      );
      setReplyingTo(null);
      setReplyContent('');
      setError(null);
    } else if (res.status === 401) {
      setError("You must be logged in to reply.");
    } else {
      setError("Failed to post reply.");
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
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                    alt="Your avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Share your thoughts or questions..."
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
                {Array.isArray(discussions) && discussions.map((msg) => (
                  <div key={msg._id} className="p-4">
                    <div className="flex space-x-3">
                      <img
                        src={
                          msg.commentedBy && msg.commentedBy.avatar
                            ? msg.commentedBy.avatar
                            : msg.commentedBy && msg.commentedBy.name
                              ? `https://ui-avatars.com/api/?name=${msg.commentedBy.name}&background=random`
                              : `https://ui-avatars.com/api/?name=Unknown&background=random`
                        }
                        alt={msg.commentedBy && msg.commentedBy.name ? msg.commentedBy.name : "Unknown"}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <span className="font-medium text-gray-900 mr-2">
                            {msg.commentedBy && msg.commentedBy.name ? msg.commentedBy.name : "Unknown"}
                          </span>
                          {renderUserBadge(msg.commentedBy && msg.commentedBy.role ? msg.commentedBy.role : "")}
                          <span className="text-xs text-gray-500 ml-2">
                            {formatRelativeTime(msg.createdAt)}
                          </span>
                        </div>
                        <div className="text-gray-700 mb-2">{msg.content}</div>
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <button onClick={() => setReplyingTo(msg._id)} className="hover:text-primary-600">Reply</button>
                        </div>
                        {/* Replies */}
                        {msg.replies && msg.replies.length > 0 && (
                          <div className="mt-3 ml-3 pl-3 border-l-2 border-gray-200 space-y-3">
                            {msg.replies.map((reply) => (
                              <div key={reply._id} className="flex space-x-3">
                                <img
                                  src={
                                    reply.repliedBy && reply.repliedBy.avatar
                                      ? reply.repliedBy.avatar
                                      : reply.repliedBy && reply.repliedBy.name
                                        ? `https://ui-avatars.com/api/?name=${reply.repliedBy.name}&background=random`
                                        : `https://ui-avatars.com/api/?name=Unknown&background=random`
                                  }
                                  alt={reply.repliedBy && reply.repliedBy.name ? reply.repliedBy.name : "Unknown"}
                                  className="w-8 h-8 rounded-full"
                                />
                                <div>
                                  <div className="flex items-center mb-1">
                                    <span className="font-medium text-gray-900 mr-2">
                                      {reply.repliedBy && reply.repliedBy.name ? reply.repliedBy.name : "Unknown"}
                                    </span>
                                    {renderUserBadge(reply.repliedBy && reply.repliedBy.role ? reply.repliedBy.role : "")}
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
                            <textarea
                              value={replyContent}
                              onChange={e => setReplyContent(e.target.value)}
                              placeholder="Write a reply..."
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                              rows={2}
                            />
                            <Button type="submit" variant="primary" size="sm" disabled={!replyContent.trim()}>
                              Reply
                            </Button>
                            <Button type="button" variant="secondary" size="sm" onClick={() => setReplyingTo(null)}>
                              Cancel
                            </Button>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
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
