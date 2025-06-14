import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home,
  FileText,
  Map,
  AlertCircle,
  MessageSquare,
  BarChart3,
  PlusCircle,
  User,
  LogOut,
  AlertTriangle
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
  className?: string;
  userData: any; // Replace with specific type if available
}

const Sidebar: React.FC<SidebarProps> = ({ className, userData }) => {
  const location = useLocation();
  
  const isActiveRoute = (path: string) => {
    return location.pathname + location.search === path;
  };

  const sidebarLinks = [
    { name: 'All Issues', path: '/dashboard/issues', icon: <FileText size={20} /> },
    { name: 'Ward Issues', path: '/dashboard/issues?ward=5', icon: <AlertTriangle size={20} /> },
    { name: 'Critical Issues', path: '/dashboard/issues?critical=true', icon: <AlertCircle size={20} /> },
    { name: 'My Reports', path: '/dashboard/issues?my=true', icon: <User size={20} /> },
    { name: 'Map View', path: '/dashboard/issues?view=map', icon: <Map size={20} /> },
    { name: 'Discussion', path: '/dashboard/discussion', icon: <MessageSquare size={20} /> },
    { name: 'Ward Analytics', path: '/dashboard/analytics', icon: <BarChart3 size={20} /> },
  ];

  return (
    <aside className={cn('bg-white border-r border-gray-200 h-full flex flex-col', className)}>
      <div className="p-4 border-b border-gray-200">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/janatavoice.jpg" alt="JanataVoice Logo" className="h-8 w-12 object-contain" />
          <div className="text-lg font-display font-bold text-primary-800">Janata Voice</div>
        </Link>
      </div>
      
      <div className="p-4">
        <Link to="/dashboard/report">
          <button className="w-full flex items-center justify-center py-2 px-4 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
            <PlusCircle size={18} className="mr-2" />
            Report New Issue
          </button>
        </Link>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          <li>
            <Link
              to="/"
              className={cn(
                'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActiveRoute('/') 
                  ? 'text-primary-700 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-700 hover:bg-gray-50'
              )}
            >
              <Home size={20} className="mr-3" />
              Home
            </Link>
          </li>
          
          {sidebarLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={cn(
                  'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActiveRoute(link.path) 
                    ? 'text-primary-700 bg-primary-50' 
                    : 'text-gray-700 hover:text-primary-700 hover:bg-gray-50'
                )}
              >
                <span className="mr-3">{link.icon}</span>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <img
            src={userData?.avatar || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"}
            alt="User Avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <div className="font-medium text-gray-800">
              {userData?.data.user.name || 'Loading...'}
            </div>
            <div className="text-xs text-gray-500">
              {userData?.ward ? `Ward ${userData.ward} Resident` : 'Ward info unavailable'}
            </div>
          </div>
        </div>
        <button className="mt-4 w-full flex items-center justify-center py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
          <LogOut size={18} className="mr-2" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
