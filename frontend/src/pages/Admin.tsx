import { useState } from 'react';
import Sidebar from '../components/admin/Sidebar';
import Dashboard from '../components/admin/Dashboard';
import Issues from '../components/admin/Issues';
import Verifications from '../components/admin/Verifications';
import RedAlerts from '../components/admin/RedAlerts';
import Analytics from '../components/admin/Analytics';
import Settings from '../components/admin/Settings';

function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'issues':
        return <Issues />;
      case 'verifications':
        return <Verifications />;
      case 'red-alerts':
        return <RedAlerts />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className="lg:ml-64">
        <main className="p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>
      
      {/* Hide any footer elements */}
      <style jsx>{`
        footer,
        .footer,
        [class*="footer"],
        [class*="quick-links"],
        [class*="contact-section"] {
          display: none !important;
        }
      `}</style>
    </div>
  );
}

export default Admin;
