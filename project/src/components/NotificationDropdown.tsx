import React, { useState, useRef, useEffect } from 'react';
import { Bell, Clock } from 'lucide-react';

const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const notifications = [
    {
      id: 1,
      message: "New Issue Reported in Ward 3",
      time: "2 minutes ago",
      type: "issue",
      unread: true
    },
    {
      id: 2,
      message: "Red Alert triggered for Garbage Overflow",
      time: "15 minutes ago",
      type: "alert",
      unread: true
    },
    {
      id: 3,
      message: "User Verification submitted by Sunita R.",
      time: "1 hour ago",
      type: "verification",
      unread: true
    },
    {
      id: 4,
      message: "Water issue resolved in Ward 5",
      time: "2 hours ago",
      type: "resolved",
      unread: false
    },
    {
      id: 5,
      message: "Weekly report generated",
      time: "1 day ago",
      type: "report",
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'alert': return 'text-red-600 bg-red-50';
      case 'issue': return 'text-orange-600 bg-orange-50';
      case 'verification': return 'text-blue-600 bg-blue-50';
      case 'resolved': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-w-[calc(100vw-2rem)] lg:max-w-none">
            <div className="px-4 py-3 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                    notification.unread ? 'bg-blue-50/30' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notification.unread ? 'bg-blue-500' : 'bg-gray-300'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${notification.unread ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {notification.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="px-4 py-3 border-t border-gray-200">
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                View all notifications
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;