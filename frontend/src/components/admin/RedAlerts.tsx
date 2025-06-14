import React, { useState } from 'react';
import { AlertTriangle, MapPin, Clock, Eye, Plus, X, Users, AlertCircle } from 'lucide-react';

const RedAlerts: React.FC = () => {
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [newAlert, setNewAlert] = useState({
    title: '',
    description: '',
    location: '',
    severity: 'high',
    affectedWards: ''
  });

  const alerts = [
    {
      id: 1,
      title: 'Garbage Overflow Emergency',
      description: 'Multiple waste collection points overflowing causing health hazard',
      location: 'Thamel Area, Ward 3',
      severity: 'critical',
      status: 'active',
      createdAt: '2024-01-15T10:30:00Z',
      affectedWards: [3, 4],
      reportedBy: 'Health Inspector',
      image: 'https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 2,
      title: 'Water Supply Contamination',
      description: 'Contaminated water supply reported in multiple households',
      location: 'Bhaktapur Colony, Ward 7',
      severity: 'critical',
      status: 'active',
      createdAt: '2024-01-15T08:15:00Z',
      affectedWards: [7, 8],
      reportedBy: 'Water Quality Team',
      image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 3,
      title: 'Road Accident Hotspot',
      description: 'Multiple accidents reported due to damaged road infrastructure',
      location: 'Ring Road Junction, Ward 5',
      severity: 'high',
      status: 'resolved',
      createdAt: '2024-01-14T14:20:00Z',
      affectedWards: [5],
      reportedBy: 'Traffic Police',
      image: 'https://images.pexels.com/photos/161709/moscow-city-street-russia-161709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 4,
      title: 'Electrical Fire Hazard',
      description: 'Exposed electrical wiring causing fire risk in residential area',
      location: 'New Road, Ward 2',
      severity: 'high',
      status: 'active',
      createdAt: '2024-01-14T11:45:00Z',
      affectedWards: [2],
      reportedBy: 'Fire Department',
      image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const handleCreateAlert = () => {
    console.log('Creating new alert:', newAlert);
    setShowCreateAlert(false);
    setNewAlert({
      title: '',
      description: '',
      location: '',
      severity: 'high',
      affectedWards: ''
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Red Alerts</h1>
        <button
          onClick={() => setShowCreateAlert(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Alert
        </button>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Alerts</p>
              <p className="text-3xl font-bold text-red-600">{alerts.filter(a => a.status === 'active').length}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
              <p className="text-3xl font-bold text-red-800">{alerts.filter(a => a.severity === 'critical').length}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-red-800" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Affected Wards</p>
              <p className="text-3xl font-bold text-orange-600">
                {[...new Set(alerts.flatMap(a => a.affectedWards))].length}
              </p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {alerts.map((alert) => (
          <div key={alert.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(alert.severity)}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(alert.status)}`}>
                      {alert.status.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{alert.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{alert.description}</p>
                </div>
                <img
                  src={alert.image}
                  alt={alert.title}
                  className="w-20 h-20 object-cover rounded-lg ml-4"
                />
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-2" />
                  {alert.location}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  {formatTimeAgo(alert.createdAt)}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-2" />
                  Wards: {alert.affectedWards.join(', ')}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-500">
                  Reported by {alert.reportedBy}
                </span>
                <div className="flex space-x-2">
                  <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </button>
                  {alert.status === 'active' && (
                    <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition-colors">
                      Resolve
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Alert Modal */}
      {showCreateAlert && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Create New Alert</h2>
              <button
                onClick={() => setShowCreateAlert(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alert Title
                </label>
                <input
                  type="text"
                  value={newAlert.title}
                  onChange={(e) => setNewAlert({ ...newAlert, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter alert title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newAlert.description}
                  onChange={(e) => setNewAlert({ ...newAlert, description: e.target.value })}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  placeholder="Describe the emergency situation..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newAlert.location}
                    onChange={(e) => setNewAlert({ ...newAlert, location: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter location..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Severity Level
                  </label>
                  <select
                    value={newAlert.severity}
                    onChange={(e) => setNewAlert({ ...newAlert, severity: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Affected Wards
                </label>
                <input
                  type="text"
                  value={newAlert.affectedWards}
                  onChange={(e) => setNewAlert({ ...newAlert, affectedWards: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter ward numbers separated by commas (e.g., 1, 2, 3)"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowCreateAlert(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAlert}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
              >
                Create Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RedAlerts;