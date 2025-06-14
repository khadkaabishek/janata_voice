import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout, ListFilter, Map as MapIcon, Loader } from "lucide-react";
import IssueCard from "../components/issues/IssueCard";
import IssueFilter, { FilterState } from "../components/issues/IssueFilter";
import Button from "../components/ui/Button";
import { useLanguage } from "../contexts/LanguageContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { fetchIssues, Issue } from "../services/issueService";

// Fix for default Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MAP_CENTER: [number, number] = [27.7172, 85.324];

const IssuesPage = () => {
  const { translations } = useLanguage();
  const [searchParams] = useSearchParams();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">(() => {
    return (searchParams.get("view") as "grid" | "list" | "map") || "grid";
  });
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get("search") || "",
    category: (searchParams.get("category") as any) || "",
    status: (searchParams.get("status") as any) || "",
    ward: searchParams.get("ward") ? parseInt(searchParams.get("ward")!) : null,
    sortBy: (searchParams.get("sortBy") as any) || "votes",
  });

  // URL-based filters
  const wardFilter = searchParams.get("ward");
  const criticalFilter = searchParams.get("critical");
  const myReportsFilter = searchParams.get("my");

  // Fetch issues on component mount and when filters change
  useEffect(() => {
    const loadIssues = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchIssues({
          search: filters.search,
          category: filters.category,
          status: filters.status,
          ward: wardFilter ? parseInt(wardFilter) : filters.ward || undefined,
          sortBy: filters.sortBy,
          critical: criticalFilter === "true",
          myReports: myReportsFilter === "true"
        });
        setIssues(data);
        setFilteredIssues(data); // Initial filtered state is same as fetched data
      } catch (err) {
        console.error("Failed to load issues:", err);
        setError(translations["errors.failedToLoadIssues"] || "Failed to load issues");
      } finally {
        setIsLoading(false);
      }
    };

    loadIssues();
  }, [filters, wardFilter, criticalFilter, myReportsFilter, translations]);

  // Apply client-side filtering when needed
  useEffect(() => {
    if (issues.length === 0) return;

    let result = [...issues];

    // Apply additional client-side filters if needed
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (issue) =>
          issue.title.toLowerCase().includes(searchLower) ||
          (issue.description && issue.description.toLowerCase().includes(searchLower))
      );
    }

    setFilteredIssues(result);
  }, [issues, filters]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const toggleViewMode = () => {
    setViewMode((current) => {
      if (current === "grid") return "list";
      if (current === "list") return "map";
      return "grid";
    });
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin text-primary-500" size={48} />
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {translations["errors.errorOccurred"] || "Error occurred"}
          </h3>
          <p className="text-gray-600">{error}</p>
          <Button
            variant="primary"
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            {translations["button.retry"] || "Try Again"}
          </Button>
        </div>
      );
    }

    if (viewMode === "map") {
      return (
        <div className="bg-white rounded-lg shadow-sm p-4 h-[calc(100vh-300px)] min-h-[500px]">
          <div style={{ 
            width: "100%", 
            height: "100%", 
            borderRadius: 12, 
            overflow: "hidden", 
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)" 
          }}>
            <MapContainer
              center={MAP_CENTER}
              zoom={13}
              scrollWheelZoom={true}
              style={{
                width: "100%",
                height: "100%",
                minHeight: 400,
                borderRadius: 12,
                overflow: "hidden"
              }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredIssues.filter(issue => issue.latitude && issue.longitude).map((issue) => (
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
                          {translations[`categories.${issue.category}`] || issue.category}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          issue.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          issue.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {translations[`status.${issue.status}`] || issue.status}
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
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {translations["issues.noIssuesFound"]}
          </h3>
          <p className="text-gray-600">
            {translations["issues.tryAdjustingFilters"]}
          </p>
        </div>
      );
    }

    return (
      <div
        className={`grid gap-6 ${
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        {filteredIssues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} viewMode={viewMode} />
        ))}
      </div>
    );
  };

  return (
    <div className="py-6 px-2 md:px-6">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-primary-800">
            {translations["issues.dashboard"]}
          </h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleFilterVisibility}
              icon={<ListFilter size={16} />}
            >
              {isFilterVisible
                ? translations["button.hideFilters"]
                : translations["button.showFilters"]}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleViewMode}
              icon={
                viewMode === "map" ? (
                  <Layout size={16} />
                ) : (
                  <MapIcon size={16} />
                )
              }
            >
              {viewMode === "grid"
                ? translations["button.listView"]
                : viewMode === "list"
                ? translations["button.mapView"]
                : translations["button.gridView"]}
            </Button>
          </div>
        </div>
        {isFilterVisible && (
          <IssueFilter
            onFilterChange={handleFilterChange}
            activeFilters={filters}
          />
        )}
      </div>
      {renderContent()}
    </div>
  );
};

export default IssuesPage;