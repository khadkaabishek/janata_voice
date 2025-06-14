import React, { useState } from 'react';
import { X, MapPin, Calendar, User, Phone, Camera } from 'lucide-react';

interface IssueDetailModalProps {
  issue: any;
  onClose: () => void;
  onStatusUpdate: (issueId: number, newStatus: string) => void;
}

const IssueDetailModal: React.FC<IssueDetailModalProps> = ({ issue, onClose, onStatusUpdate }) => {
  const [status, setStatus] = useState(issue.status);
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    onStatusUpdate(issue.id, status);
    // Here you would also save the notes
    console.log('Saving notes:', notes);
    onClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'text-green-700 bg-green-100 border-green-300';
      case 'In Progress':
        return 'text-amber-700 bg-amber-100 border-amber-300';
      default:
        return 'text-red-700 bg-red-100 border-red-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Issue Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Issue Header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6 space-y-4 lg:space-y-0">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{issue.title}</h3>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(status)}`}>
                  {status}
                </span>
                <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getPriorityColor(issue.priority)}`}>
                  {issue.priority} priority
                </span>
                <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 border border-blue-300">
                  {issue.category}
                </span>
              </div>
            </div>
            <div className="lg:w-80">
              <img
                src={issue.image}
                alt={issue.title}
                className="w-full h-48 object-cover rounded-lg border border-gray-200"
              />
            </div>
          </div>

          {/* Issue Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Issue Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">Location:</span>
                    <span className="ml-2 font-medium">{issue.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">Reported:</span>
                    <span className="ml-2 font-medium">{new Date(issue.submissionDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <User className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">Reporter:</span>
                    <span className="ml-2 font-medium">{issue.reportedBy}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-600">Ward:</span>
                    <span className="ml-2 font-medium">Ward {issue.ward}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Status Management</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Update Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Unresolved">Unresolved</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Description</h4>
            <p className="text-gray-700 leading-relaxed">{issue.description}</p>
          </div>

          {/* Admin Notes */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Admin Notes</h4>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this issue..."
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailModal;