import React from 'react';
import { AlertTriangle, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const StatsCards: React.FC = () => {
  const stats = [
    {
      title: 'Total Civic Issues',
      value: '247',
      icon: AlertTriangle,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Resolved Issues',
      value: '189',
      icon: CheckCircle,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+8%',
      changeType: 'increase'
    },
    {
      title: 'Pending Verifications',
      value: '23',
      icon: Clock,
      color: 'bg-amber-500',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      change: '-5%',
      changeType: 'decrease'
    },
    {
      title: 'Red Alerts',
      value: '4',
      icon: AlertCircle,
      color: 'bg-red-500',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
      change: '+2',
      changeType: 'increase'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <div className="flex items-center">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stat.changeType === 'increase' 
                      ? 'text-green-700 bg-green-100' 
                      : 'text-red-700 bg-red-100'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">from last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-6 w-6 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;