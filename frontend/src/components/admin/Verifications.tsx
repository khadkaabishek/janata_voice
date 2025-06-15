import React, { useState } from 'react';
import { Check, X, Eye, Search, Filter } from 'lucide-react';

const Verifications: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const verifications = [
    {
      id: 1,
      name: 'Sunita Rai',
      ward: 3,
      phone: '+977-9841234567',
      citizenshipNumber: '12-34-56-78901',
      submissionDate: '2024-01-15',
      status: 'pending',
      citizenshipImage: 'https://images.pexels.com/photos/3979767/pexels-photo-3979767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      profileImage: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 2,
      name: 'Raman Shrestha',
      ward: 7,
      phone: '+977-9812345678',
      citizenshipNumber: '23-45-67-89012',
      submissionDate: '2024-01-14',
      status: 'pending',
      citizenshipImage: 'https://images.pexels.com/photos/3979767/pexels-photo-3979767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      profileImage: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 3,
      name: 'Maya Gurung',
      ward: 2,
      phone: '+977-9823456789',
      citizenshipNumber: '34-56-78-90123',
      submissionDate: '2024-01-13',
      status: 'approved',
      citizenshipImage: 'https://images.pexels.com/photos/3979767/pexels-photo-3979767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      profileImage: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 4,
      name: 'Krishna Tamang',
      ward: 5,
      phone: '+977-9834567890',
      citizenshipNumber: '45-67-89-01234',
      submissionDate: '2024-01-12',
      status: 'rejected',
      citizenshipImage: 'https://images.pexels.com/photos/3979767/pexels-photo-3979767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      profileImage: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 5,
      name: 'Deepika Thapa',
      ward: 1,
      phone: '+977-9845678901',
      citizenshipNumber: '56-78-90-12345',
      submissionDate: '2024-01-11',
      status: 'pending',
      citizenshipImage: 'https://images.pexels.com/photos/3979767/pexels-photo-3979767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      profileImage: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  const filteredVerifications = verifications.filter(verification => {
    const matchesSearch = verification.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         verification.citizenshipNumber.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || verification.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id: number) => {
    console.log(`Approving verification ${id}`);
    // Here you would update the verification status
  };

  const handleReject = (id: number) => {
    console.log(`Rejecting verification ${id}`);
    // Here you would update the verification status
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-700 bg-green-100';
      case 'rejected':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-amber-700 bg-amber-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Pending';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Citizen Verifications</h1>
        <div className="text-sm text-gray-500">
          Pending: {filteredVerifications.filter(v => v.status === 'pending').length}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by name or citizenship number..."
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
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVerifications.map((verification) => (
          <div key={verification.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Card Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <img
                  src={verification.profileImage}
                  alt={verification.name}
                  className="h-16 w-16 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{verification.name}</h3>
                  <p className="text-sm text-gray-500">Ward {verification.ward}</p>
                  <p className="text-sm text-gray-500">{verification.phone}</p>
                </div>
              </div>
            </div>

            {/* Citizenship Information */}
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Citizenship Number</label>
                <p className="text-sm text-gray-900 font-mono">{verification.citizenshipNumber}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Citizenship Document</label>
                <div className="mt-2">
                  <img
                    src={verification.citizenshipImage}
                    alt="Citizenship Document"
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <span className={`block mt-1 inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(verification.status)}`}>
                    {getStatusText(verification.status)}
                  </span>
                </div>
                <div className="text-right">
                  <label className="text-sm font-medium text-gray-700">Submitted</label>
                  <p className="text-sm text-gray-500">
                    {new Date(verification.submissionDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {verification.status === 'pending' && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleApprove(verification.id)}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(verification.id)}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject
                  </button>
                </div>
              </div>
            )}
            
            {verification.status !== 'pending' && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredVerifications.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No verifications found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Verifications;