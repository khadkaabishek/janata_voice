import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout, ListFilter, Map as MapIcon } from 'lucide-react';
import IssueCard from '../components/issues/IssueCard';
import IssueFilter, { FilterState } from '../components/issues/IssueFilter';
import Button from '../components/ui/Button';
import { MOCK_ISSUES } from '../data/mockData';
import { Issue } from '../types';

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for default Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const IssuesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>(MOCK_ISSUES);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>(() => {
    return (searchParams.get('view') as 'grid' | 'list' | 'map') || 'grid';
  });
  const [isFilterVisible, setIsFilterVisible] = useState(true);

  // Initialize filters from URL params or defaults
  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get('search') || '',
    category: (searchParams.get('category') as any) || '',
    status: (searchParams.get('status') as any) || '',
    ward: searchParams.get('ward') ? parseInt(searchParams.get('ward')!) : null,
    sortBy: (searchParams.get('sortBy') as any) || 'votes'
  });

  // Get query parameters
  const wardFilter = searchParams.get('ward');
  const criticalFilter = searchParams.get('critical');
  const myReportsFilter = searchParams.get('my');

  // Apply filters when they change
  useEffect(() => {
    let result = [...MOCK_ISSUES];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(issue =>
        issue.title.toLowerCase().includes(searchLower) ||
        issue.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter(issue => issue.category === filters.category);
    }

    // Apply status filter
    if (filters.status) {
      result = result.filter(issue => issue.status === filters.status);
    }

    // Apply ward filter from URL
    if (wardFilter) {
      result = result.filter(issue => issue.wardNumber === parseInt(wardFilter));
    }

    // Apply critical issues filter
    if (criticalFilter === 'true') {
      result = result.filter(issue =>
        issue.status === 'pending' &&
        ['water', 'electricity', 'public-safety'].includes(issue.category)
      );
    }

    // Apply my reports filter (using mock user ID 'user-1')
    if (myReportsFilter === 'true') {
      result = result.filter(issue => issue.reportedBy === 'user-1');
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'votes':
        result.sort((a, b) => b.votes - a.votes);
        break;
      case 'date':
        result.sort((a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime());
        break;
      case 'status':
        result.sort((a, b) => {
          const statusPriority: Record<string, number> = {
            'pending': 0,
            'in-progress': 1,
            'resolved': 2
          };
          return statusPriority[a.status] - statusPriority[b.status];
        });
        break;
    }

    setFilteredIssues(result);
  }, [filters, wardFilter, criticalFilter, myReportsFilter]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const toggleViewMode = () => {
    setViewMode(current => {
      if (current === 'grid') return 'list';
      if (current === 'list') return 'map';
      return 'grid';
    });
  };

  const renderContent = () => {
    if (viewMode === 'map') {
      return (
        <div className="bg-white rounded-lg shadow-sm p-4 h-[calc(100vh-300px)] min-h-[500px]">
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <MapContainer
              center={[27.7172, 85.324]}
              zoom={13}
              scrollWheelZoom={true}
              style={{
                width: "100%",
                height: "100%",
                minHeight: 400,
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredIssues
                .filter((issue) => issue.latitude && issue.longitude)
                .map((issue) => (
                  <Marker
                    key={issue.id}
                    position={[issue.latitude!, issue.longitude!]}
                  >
                    <Popup>
                      <div className="min-w-[200px]">
                        <h4 className="font-bold text-primary-700">{issue.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{issue.description}</p>
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                            {issue.category ?? 'Uncategorized'}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              issue.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : issue.status === "in-progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {issue.status}
                          </span>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
            </MapContainer>
          </div>
        </div>
      );
    }

    if (filteredIssues.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No issues found</h3>
          <p className="text-gray-600">Try adjusting your filters or search criteria.</p>
        </div>
      );
    }

    return (
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {filteredIssues.map(issue => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    );
  };

  return (
    <div className="py-6 px-2 md:px-6">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-primary-800">Issues Dashboard</h1>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleFilterVisibility}
              icon={<ListFilter size={16} />}
            >
              {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleViewMode}
              icon={viewMode === 'map' ? <Layout size={16} /> : <MapIcon size={16} />}
            >
              {viewMode === 'grid' ? 'List View' : viewMode === 'list' ? 'Map View' : 'Grid View'}
            </Button>
          </div>
        </div>
        
        {isFilterVisible && (
          <IssueFilter onFilterChange={handleFilterChange} activeFilters={filters} />
        )}
      </div>
      
      {renderContent()}
    </div>
  );
};

export default IssuesPage;
