import React from 'react';
import { UserCheck, AlertTriangle, BarChart3 } from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    {
      title: 'Verify Citizens',
      description: 'Review pending verifications',
      icon: UserCheck,
      color: 'bg-green-500 hover:bg-green-600',
      action: () => console.log('Verify citizens')
    },
    {
      title: 'Create Alert',
      description: 'Issue emergency notification',
      icon: AlertTriangle,
      color: 'bg-red-500 hover:bg-red-600',
      action: () => console.log('Create alert')
    },
    {
      title: 'View Reports',
      description: 'Access analytics dashboard',
      icon: BarChart3,
      color: 'bg-purple-500 hover:bg-purple-600',
      action: () => console.log('View reports')
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
      </div>
      
      <div className="p-6 space-y-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.action}
              className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${action.color} text-white`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{action.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;