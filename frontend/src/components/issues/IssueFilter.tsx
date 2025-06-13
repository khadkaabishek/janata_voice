import React from 'react';
import { Search, Filter, SortDesc } from 'lucide-react';
import { IssueCategory, IssueStatus } from '../../types';
import { ISSUE_CATEGORIES, ISSUE_STATUSES } from '../../data/mockData';
import Button from '../ui/Button';

type IssueFilterProps = {
  onFilterChange: (filters: FilterState) => void;
  activeFilters: FilterState;
};

export type FilterState = {
  search: string;
  category: IssueCategory | '';
  status: IssueStatus | '';
  ward: number | null;
  sortBy: 'votes' | 'date' | 'status';
};

const IssueFilter: React.FC<IssueFilterProps> = ({ onFilterChange, activeFilters }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...activeFilters, search: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ 
      ...activeFilters, 
      category: e.target.value as IssueCategory | '' 
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ 
      ...activeFilters, 
      status: e.target.value as IssueStatus | '' 
    });
  };

  const handleWardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const wardValue = e.target.value === '' ? null : parseInt(e.target.value);
    onFilterChange({ ...activeFilters, ward: wardValue });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ 
      ...activeFilters, 
      sortBy: e.target.value as 'votes' | 'date' | 'status' 
    });
  };

  const resetFilters = () => {
    onFilterChange({
      search: '',
      category: '',
      status: '',
      ward: null,
      sortBy: 'votes'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search issues..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={activeFilters.search}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={activeFilters.category}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            {Object.entries(ISSUE_CATEGORIES).map(([value, { label }]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={activeFilters.status}
            onChange={handleStatusChange}
          >
            <option value="">All Statuses</option>
            {Object.entries(ISSUE_STATUSES).map(([value, { label }]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="ward" className="block text-sm font-medium text-gray-700 mb-1">
            Ward
          </label>
          <select
            id="ward"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={activeFilters.ward === null ? '' : activeFilters.ward.toString()}
            onChange={handleWardChange}
          >
            <option value="">All Wards</option>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((ward) => (
              <option key={ward} value={ward.toString()}>
                Ward {ward}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            id="sortBy"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={activeFilters.sortBy}
            onChange={handleSortChange}
          >
            <option value="votes">Most Votes</option>
            <option value="date">Newest First</option>
            <option value="status">Status</option>
          </select>
        </div>

        <div className="flex items-end">
          <Button
            variant="secondary"
            onClick={resetFilters}
            className="w-full"
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IssueFilter;