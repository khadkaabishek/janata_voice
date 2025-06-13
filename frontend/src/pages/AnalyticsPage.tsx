import React, { useState } from 'react';
import { ArrowUp, ArrowDown, TrendingUp, Filter } from 'lucide-react';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { MOCK_WARD_PERFORMANCE } from '../data/mockData';
import { WardPerformance } from '../types';

const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [sortedWards, setSortedWards] = useState<WardPerformance[]>([...MOCK_WARD_PERFORMANCE].sort((a, b) => a.rank - b.rank));
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Filter and sort the wards based on selected options
  const handleTimeRangeChange = (range: 'week' | 'month' | 'year') => {
    setTimeRange(range);
    // In a real app, this would fetch new data for the selected time range
  };
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    // In a real app, this would filter data based on the category
  };
  
  // Get top and bottom performing wards
  const topWards = sortedWards.slice(0, 3);
  const bottomWards = [...sortedWards].sort((a, b) => b.rank - a.rank).slice(0, 3);
  
  // Calculate overall statistics
  const totalIssues = sortedWards.reduce((sum, ward) => sum + ward.totalIssues, 0);
  const resolvedIssues = sortedWards.reduce((sum, ward) => sum + ward.resolvedIssues, 0);
  const averageResolutionRate = resolvedIssues / totalIssues * 100;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'best-performing': return 'success';
      case 'average': return 'warning';
      case 'underperforming': return 'danger';
      default: return 'default';
    }
  };

  return (
    <div className="py-6 px-2 md:px-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-800 mb-2">Ward Performance Analytics</h1>
        <p className="text-gray-600">
          Track and compare performance metrics across different wards in Kathmandu Metropolitan City.
        </p>
      </div>
      
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Issues</p>
                <h3 className="text-2xl font-bold text-gray-800">{totalIssues}</h3>
              </div>
              <div className="p-2 bg-primary-100 rounded-full text-primary-600">
                <Filter size={20} />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-green-600 flex items-center">
                <ArrowUp size={16} className="mr-1" /> 12%
              </span>
              <span className="text-gray-500 ml-2">from last {timeRange}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Resolved Issues</p>
                <h3 className="text-2xl font-bold text-gray-800">{resolvedIssues}</h3>
              </div>
              <div className="p-2 bg-success-light/20 rounded-full text-success">
                <TrendingUp size={20} />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-green-600 flex items-center">
                <ArrowUp size={16} className="mr-1" /> 8%
              </span>
              <span className="text-gray-500 ml-2">from last {timeRange}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Avg. Resolution Rate</p>
                <h3 className="text-2xl font-bold text-gray-800">{averageResolutionRate.toFixed(1)}%</h3>
              </div>
              <div className="p-2 bg-warning-light/20 rounded-full text-warning">
                <ArrowDown size={20} />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-red-600 flex items-center">
                <ArrowDown size={16} className="mr-1" /> 3%
              </span>
              <span className="text-gray-500 ml-2">from last {timeRange}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Button
            variant={timeRange === 'week' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => handleTimeRangeChange('week')}
          >
            Weekly
          </Button>
          <Button
            variant={timeRange === 'month' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => handleTimeRangeChange('month')}
          >
            Monthly
          </Button>
          <Button
            variant={timeRange === 'year' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => handleTimeRangeChange('year')}
          >
            Yearly
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <label htmlFor="category" className="text-sm font-medium text-gray-700">
            Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Categories</option>
            <option value="road">Road Issues</option>
            <option value="water">Water Supply</option>
            <option value="electricity">Electricity</option>
            <option value="garbage">Garbage Collection</option>
            <option value="infrastructure">Infrastructure</option>
          </select>
        </div>
      </div>
      
      {/* Main Performance Table */}
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-semibold text-primary-700">Ward-wise Performance Ranking</h2>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ward No.</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Issues</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resolved</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resolution Rate</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedWards.map((ward) => (
                  <tr key={ward.wardNumber} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{ward.rank}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ward {ward.wardNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ward.totalIssues}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ward.resolvedIssues}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ward.resolutionRate.toFixed(1)}%</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusColor(ward.status)}>
                        {ward.status === 'best-performing' ? 'Best Performing' : 
                         ward.status === 'average' ? 'Average' : 'Underperforming'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Top and Bottom Performers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-success-dark">Top Performing Wards</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topWards.map((ward, index) => (
                <div key={ward.wardNumber} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-success-light/20 text-success flex items-center justify-center rounded-full mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">Ward {ward.wardNumber}</div>
                      <div className="text-sm text-gray-500">{ward.resolutionRate.toFixed(1)}% Resolution Rate</div>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">{ward.resolvedIssues}</span>
                    <span className="text-gray-500">/{ward.totalIssues} resolved</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-danger-dark">Underperforming Wards</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bottomWards.map((ward, index) => (
                <div key={ward.wardNumber} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-danger-light/20 text-danger flex items-center justify-center rounded-full mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">Ward {ward.wardNumber}</div>
                      <div className="text-sm text-gray-500">{ward.resolutionRate.toFixed(1)}% Resolution Rate</div>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">{ward.resolvedIssues}</span>
                    <span className="text-gray-500">/{ward.totalIssues} resolved</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;