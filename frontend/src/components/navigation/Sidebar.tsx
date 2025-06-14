import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
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
import { useLanguage } from '../../contexts/LanguageContext';

type SidebarProps = {
  className?: string;
};

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation();
  const { translations } = useLanguage();
  
  const isActiveRoute = (path: string) => {
    return location.pathname + location.search === path;
  };

  const sidebarLinks = [
    { 
      name: translations['issues.all'], 
      path: '/dashboard/issues', 
      icon: <FileText size={20} /> 
    },
    { 
      name: translations['issues.ward'], 
      path: '/dashboard/issues?ward=5', 
      icon: <AlertTriangle size={20} /> 
    },
    { 
      name: translations['issues.critical'], 
      path: '/dashboard/issues?critical=true', 
      icon: <AlertCircle size={20} /> 
    },
    { 
      name: translations['issues.myReports'], 
      path: '/dashboard/issues?my=true', 
      icon: <User size={20} /> 
    },
    { 
      name: translations['issues.mapView'], 
      path: '/dashboard/issues?view=map', 
      icon: <Map size={20} /> 
    },
    { 
      name: translations['issues.discussion'], 
      path: '/dashboard/discussion', 
      icon: <MessageSquare size={20} /> 
    },
    { 
      name: translations['issues.analytics'], 
      path: '/dashboard/analytics', 
      icon: <BarChart3 size={20} /> 
    },
  ];

  return (
    <aside className={cn('bg-white border-r border-gray-200 h-full flex flex-col', className)}>
      <div className="p-4">
        <Link to="/dashboard/report">
          <button className="w-full flex items-center justify-center py-2 px-4 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
            <PlusCircle size={18} className="mr-2" />
            {translations['button.reportIssue']}
          </button>
        </Link>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
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
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
            alt={translations['common.userAvatar'] || 'User Avatar'}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <div className="font-medium text-gray-800">Arav Sharma</div>
            <div className="text-xs text-gray-500">{translations['home.stats.wardNumber']} 6 {translations['home.stats.residence']} </div>
          </div>
        </div>
        <button className="mt-4 w-full flex items-center justify-center py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
          <LogOut size={18} className="mr-2" />
          {translations['button.signOut']}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
