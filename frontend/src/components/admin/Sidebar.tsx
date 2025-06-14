import React from 'react';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  UserCheck, 
  AlertCircle, 
  BarChart3, 
  Settings,
  Menu,
  X
} from 'lucide-react';

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
      {/* Mobile toggle button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-white shadow-md text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <Menu className="h-6 w-6" />
        </button>
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

      {/* Desktop sidebar - Fixed position */}
      <div className="hidden lg:block fixed left-0 top-0 w-64 h-screen bg-white border-r border-gray-200 z-30">
        <SidebarContent 
          menuItems={menuItems} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          setSidebarOpen={setSidebarOpen}
          isDesktop={true}
        />
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
    </div>
  );
};

export default Sidebar;
