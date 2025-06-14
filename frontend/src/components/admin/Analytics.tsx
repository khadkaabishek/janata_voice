import React, { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Users, MapPin, Calendar, Filter } from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedWard, setSelectedWard] = useState('all');

  const overviewStats = [
    {
      title: 'Total Issues Reported',
      value: '1,247',
      change: '+12.5%',
      changeType: 'increase',
      icon: BarChart3,
      color: 'blue'
    },
    {
      title: 'Resolution Rate',
      value: '76.4%',
      change: '+3.2%',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Average Response Time',
      value: '2.3 days',
      change: '-0.5 days',
      changeType: 'decrease',
      icon: TrendingDown,
      color: 'amber'
    },
    {
      title: 'Active Citizens',
      value: '3,892',
      change: '+18.7%',
      changeType: 'increase',
      icon: Users,
      color: 'purple'
    }
  ];

  const categoryData = [
    { category: 'Water', issues: 342, resolved: 268, percentage: 78 },
    { category: 'Sanitation', issues: 289, resolved: 201, percentage: 70 },
    { category: 'Roads', issues: 234, resolved: 189, percentage: 81 },
    { category: 'Infrastructure', issues: 198, resolved: 142, percentage: 72 },
    { category: 'Electricity', issues: 156, resolved: 125, percentage: 80 },
    { category: 'Other', issues: 134, resolved: 98, percentage: 73 }
  ];

  const wardData = [
    { ward: 1, issues: 145, resolved: 112, population: 12500 },
    { ward: 2, issues: 168, resolved: 128, population: 15200 },
    { ward: 3, issues: 134, resolved: 98, population: 11800 },
    { ward: 4, issues: 189, resolved: 142, population: 16900 },
    { ward: 5, issues: 156, resolved: 119, population: 14300 },
    { ward: 6, issues: 123, resolved: 95, population: 13100 },
    { ward: 7, issues: 178, resolved: 135, population: 15800 },
    { ward: 8, issues: 154, resolved: 118, population: 14600 }
  ];

  const monthlyTrends = [
    { month: 'Jan', issues: 98, resolved: 76 },
    { month: 'Feb', issues: 112, resolved: 89 },
    { month: 'Mar', issues: 134, resolved: 98 },
    { month: 'Apr', issues: 156, resolved: 119 },
    { month: 'May', issues: 189, resolved: 142 },
    { month: 'Jun', issues: 178, resolved: 135 }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      amber: 'bg-amber-50 text-amber-600',
      purple: 'bg-purple-50 text-purple-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getChangeColor = (changeType: string) => {
    return changeType === 'increase' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 3 months</option>
              <option value="1y">Last year</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-gray-400" />
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Wards</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(ward => (
                <option key={ward} value={ward}>Ward {ward}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Overview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium ${getChangeColor(stat.changeType)}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">vs last period</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Trends</h3>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {monthlyTrends.map((month, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 w-12">{month.month}</span>
                <div className="flex-1 mx-4">
                  <div className="relative">
                    <div className="flex space-x-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-blue-500 rounded-full h-3"
                          style={{ width: `${(month.issues / 200) * 100}%` }}
                        />
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-green-500 rounded-full h-3"
                          style={{ width: `${(month.resolved / 200) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 text-right">
                  <div className="text-blue-600">{month.issues} reported</div>
                  <div className="text-green-600">{month.resolved} resolved</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-gray-600">Reported</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-gray-600">Resolved</span>
            </div>
          </div>
        </div>

        {/* Issues by Category */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Issues by Category</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {categoryData.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{category.category}</span>
                  <span className="text-sm text-gray-500">{category.percentage}% resolved</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 rounded-full h-2"
                      style={{ width: `${(category.issues / 350) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{category.issues}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ward Performance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Ward Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ward
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Population
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issues Reported
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resolved
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resolution Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issues per 1000
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {wardData.map((ward) => {
                const resolutionRate = Math.round((ward.resolved / ward.issues) * 100);
                const issuesPer1000 = Math.round((ward.issues / ward.population) * 1000);
                
                return (
                  <tr key={ward.ward} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Ward {ward.ward}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ward.population.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ward.issues}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ward.resolved}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 w-16 mr-2">
                          <div 
                            className={`rounded-full h-2 ${resolutionRate >= 80 ? 'bg-green-500' : resolutionRate >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${resolutionRate}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-900">{resolutionRate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {issuesPer1000}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;