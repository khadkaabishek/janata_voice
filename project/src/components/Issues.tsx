import React, { useState } from 'react';
import { Search, Filter, Eye, CheckCircle, Clock, MoreHorizontal } from 'lucide-react';
import IssueDetailModal from './IssueDetailModal';

const Issues: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const issues = [
    {
      id: 1,
      title: 'Water pipe burst in main road',
      description: 'Major water pipe has burst causing flooding on the main road. Traffic is being affected and residents are without water supply.',
      category: 'Water',
      ward: 3,
      status: 'In Progress',
      priority: 'high',
      submissionDate: '2024-01-15',
      reportedBy: 'Ram Bahadur',
      location: 'Main Road, Thamel',
      image: 'https://images.pexels.com/photos/221148/pexels-photo-221148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 2,
      title: 'Garbage not collected for 3 days',
      description: 'Garbage collection has been missed for three consecutive days. The area is starting to smell and attracting stray animals.',
      category: 'Sanitation',
      ward: 7,
      status: 'Unresolved',
      priority: 'medium',
      submissionDate: '2024-01-14',
      reportedBy: 'Sita Sharma',
      location: 'Bhaktapur Colony',
      image: 'https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 3,
      title: 'Street light not working',
      description: 'Several street lights have been out for over a week, making the area unsafe during nighttime.',
      category: 'Infrastructure',
      ward: 2,
      status: 'Resolved',
      priority: 'low',
      submissionDate: '2024-01-13',
      reportedBy: 'Krishna Tamang',
      location: 'New Road',
      image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 4,
      title: 'Road pothole causing accidents',
      description: 'Large pothole on the main road has caused several vehicle accidents. Immediate repair needed.',
      category: 'Roads',
      ward: 5,
      status: 'In Progress',
      priority: 'high',
      submissionDate: '2024-01-12',
      reportedBy: 'Hari Prasad',
      location: 'Ring Road',
      image: 'https://images.pexels.com/photos/161709/moscow-city-street-russia-161709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 5,
      title: 'Drainage system blocked',
      description: 'The main drainage system is completely blocked causing water logging during rain.',
      category: 'Water',
      ward: 1,
      status: 'Unresolved',
      priority: 'medium',
      submissionDate: '2024-01-11',
      reportedBy: 'Maya Gurung',
      location: 'Durbar Square',
      image: 'https://images.pexels.com/photos/2749481/pexels-photo-2749481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 6,
      title: 'Public toilet out of order',
      description: 'The public toilet facility has been out of order for several days affecting local businesses.',
      category: 'Sanitation',
      ward: 4,
      status: 'Unresolved',
      priority: 'medium',
      submissionDate: '2024-01-10',
      reportedBy: 'Tej Bahadur',
      location: 'Bus Park',
      image: 'https://images.pexels.com/photos/5967857/pexels-photo-5967857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || issue.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (issue: any) => {
    setSelectedIssue(issue);
    setShowModal(true);
  };

  const handleStatusUpdate = (issueId: number, newStatus: string) => {
    // This would update the issue status in a real app
    console.log(`Updating issue ${issueId} to ${newStatus}`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'In Progress':
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return <Clock className="h-4 w-4 text-red-500" />;
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Issues Management</h1>
        <div className="text-sm text-gray-500">
          Total Issues: {filteredIssues.length}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Status</option>
                <option value="Unresolved">Unresolved</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Issues Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue Details
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
              {filteredIssues.map((issue) => (
                <tr key={issue.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={issue.image}
                        alt={issue.title}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{issue.title}</div>
                        <div className="text-sm text-gray-500">{issue.category}</div>
                        <div className="text-xs text-gray-400">by {issue.reportedBy}</div>
                      </div>
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
                    {new Date(issue.submissionDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewDetails(issue)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </button>
                      <div className="relative group">
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue Detail Modal */}
      {showModal && selectedIssue && (
        <IssueDetailModal
          issue={selectedIssue}
          onClose={() => setShowModal(false)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
};

export default Issues;