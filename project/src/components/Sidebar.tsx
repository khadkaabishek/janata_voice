import React from 'react';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  UserCheck, 
  AlertCircle, 
  BarChart3, 
  Settings,
  Menu,
  X,
  Bell
} from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  sidebarOpen, 
  setSidebarOpen 
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'issues', label: 'Issues', icon: AlertTriangle },
    { id: 'verifications', label: 'Verifications', icon: UserCheck },
    { id: 'red-alerts', label: 'Red Alerts', icon: AlertCircle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between relative z-30">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold text-blue-600">Janata Voice</h1>
        </div>
        <NotificationDropdown />
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 flex z-40">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setSidebarOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <SidebarContent 
              menuItems={menuItems} 
              activeTab={activeTab} 
              setActiveTab={setActiveTab}
              setSidebarOpen={setSidebarOpen}
            />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white border-r border-gray-200 relative">
          <SidebarContent 
            menuItems={menuItems} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            setSidebarOpen={setSidebarOpen}
            isDesktop={true}
          />
        </div>
      </div>
    </>
  );
};

interface SidebarContentProps {
  menuItems: Array<{ id: string; label: string; icon: any }>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setSidebarOpen: (open: boolean) => void;
  isDesktop?: boolean;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ 
  menuItems, 
  activeTab, 
  setActiveTab, 
  setSidebarOpen,
  isDesktop = false 
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 relative">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Janata Voice</h1>
        </div>
        {isDesktop && (
          <div className="relative z-50">
            <NotificationDropdown />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-3 py-3 text-left rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User info */}
      <div className="px-4 py-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-700">MR</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Mayor Ram Shrestha</p>
            <p className="text-xs text-gray-500 truncate">Kathmandu Municipality</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;