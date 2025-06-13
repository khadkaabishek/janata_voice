import React, { useState } from 'react';
import { Send, Image, User, Users, MapPin } from 'lucide-react';
import Card, { CardContent, CardHeader, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { MOCK_DISCUSSIONS } from '../data/mockData';
import { DiscussionMessage } from '../types';
import { formatRelativeTime } from '../utils/dateFormatter';

const DiscussionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'municipality' | 'ward'>('ward');
  const [message, setMessage] = useState('');
  const [discussions, setDiscussions] = useState<DiscussionMessage[]>(MOCK_DISCUSSIONS);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim()) {
      const newMessage: DiscussionMessage = {
        id: `msg-${Date.now()}`,
        content: message,
        userId: 'user-1',
        userName: 'Aarav Sharma',
        userRole: 'citizen',
        userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
        createdAt: new Date().toISOString(),
        replies: []
      };
      
      setDiscussions([newMessage, ...discussions]);
      setMessage('');
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
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-800 mb-2">Discussion Forum</h1>
        <div className="flex items-center text-gray-600">
          <MapPin size={16} className="mr-1" />
          <span>Ward 5 | Kathmandu Metropolitan City</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'ward'
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('ward')}
                  >
                    <div className="flex items-center">
                      <Users size={16} className="mr-2" />
                      Ward Discussion
                    </div>
                  </button>
                  <button
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'municipality'
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('municipality')}
                  >
                    <div className="flex items-center">
                      <User size={16} className="mr-2" />
                      Municipality Discussion
                    </div>
                  </button>
                </div>
              </div>
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
                      onChange={(e) => setMessage(e.target.value)}
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
              </div>
              
              <div className="divide-y">
                {discussions.map((message) => (
                  <div key={message.id} className="p-4">
                    <div className="flex space-x-3">
                      <img
                        src={message.userAvatar || `https://ui-avatars.com/api/?name=${message.userName}&background=random`}
                        alt={message.userName}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <span className="font-medium text-gray-900 mr-2">{message.userName}</span>
                          {renderUserBadge(message.userRole)}
                          <span className="text-xs text-gray-500 ml-2">
                            {formatRelativeTime(message.createdAt)}
                          </span>
                        </div>
                        <div className="text-gray-700 mb-2">{message.content}</div>
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <button className="hover:text-primary-600">Reply</button>
                          <button className="hover:text-primary-600">Like</button>
                        </div>
                        
                        {message.replies && message.replies.length > 0 && (
                          <div className="mt-3 ml-3 pl-3 border-l-2 border-gray-200 space-y-3">
                            {message.replies.map((reply) => (
                              <div key={reply.id} className="flex space-x-3">
                                <img
                                  src={reply.userAvatar || `https://ui-avatars.com/api/?name=${reply.userName}&background=random`}
                                  alt={reply.userName}
                                  className="w-8 h-8 rounded-full"
                                />
                                <div>
                                  <div className="flex items-center mb-1">
                                    <span className="font-medium text-gray-900 mr-2">{reply.userName}</span>
                                    {renderUserBadge(reply.userRole)}
                                    <span className="text-xs text-gray-500 ml-2">
                                      {formatRelativeTime(reply.createdAt)}
                                    </span>
                                  </div>
                                  <div className="text-gray-700 mb-1">{reply.content}</div>
                                  <div className="flex items-center text-xs text-gray-500 space-x-4">
                                    <button className="hover:text-primary-600">Reply</button>
                                    <button className="hover:text-primary-600">Like</button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
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
        
        <div>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-primary-700">Discussion Guidelines</h3>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Be respectful and constructive in your comments</li>
                <li>Stay on topic and relevant to your ward</li>
                <li>No hate speech, personal attacks, or harassment</li>
                <li>Don't share personal information</li>
                <li>Municipal authorities may take time to respond</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-semibold text-primary-700">Active Participants</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <img
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                    alt="Aarav Sharma"
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-medium text-gray-700">Aarav Sharma</div>
                    <div className="text-xs text-gray-500">Ward 5 Resident</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <img
                    src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
                    alt="Rajesh KC"
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-medium text-gray-700">Rajesh KC</div>
                    <div className="text-xs text-gray-500">Ward 2 Admin</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <img
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
                    alt="Sita Rai"
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-medium text-gray-700">Sita Rai</div>
                    <div className="text-xs text-gray-500">Ward 3 Resident</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DiscussionPage;