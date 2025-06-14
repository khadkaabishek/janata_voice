import React from 'react';
import { Eye, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const RecentIssues: React.FC = () => {
  const issues = [
    {
      id: 1,
      title: 'Water pipe burst in main road',
      category: 'Water',
      ward: 3,
      status: 'In Progress',
      date: '2024-01-15',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Garbage not collected for 3 days',
      category: 'Sanitation',
      ward: 7,
      status: 'Unresolved',
      date: '2024-01-14',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Street light not working',
      category: 'Infrastructure',
      ward: 2,
      status: 'Resolved',
      date: '2024-01-13',
      priority: 'low'
    },
    {
      id: 4,
      title: 'Road pothole causing accidents',
      category: 'Roads',
      ward: 5,
      status: 'In Progress',
      date: '2024-01-12',
      priority: 'high'
    },
    {
      id: 5,
      title: 'Drainage system blocked',
      category: 'Water',
      ward: 1,
      status: 'Unresolved',
      date: '2024-01-11',
      priority: 'medium'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'In Progress':
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'text-green-700 bg-green-100';
      case 'In Progress':
        return 'text-amber-700 bg-amber-100';
      default:
        return 'text-red-700 bg-red-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Recent Issues</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Issue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ward
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {issues.map((issue) => (
              <tr key={issue.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{issue.title}</div>
                    <div className="text-sm text-gray-500">{issue.category}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Ward {issue.ward}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getStatusIcon(issue.status)}
                    <span className={`ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(issue.status)}`}>
                      {issue.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(issue.priority)}`}>
                    {issue.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(issue.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentIssues;