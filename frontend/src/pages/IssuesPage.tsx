<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
import React, { useState, useEffect } from "react";
>>>>>>> main
import { useSearchParams } from "react-router-dom";
import { Layout, ListFilter, Map as MapIcon } from "lucide-react";
import IssueCard from "../components/issues/IssueCard";
import IssueFilter, { FilterState } from "../components/issues/IssueFilter";
import Button from "../components/ui/Button";
import { MOCK_ISSUES } from "../data/mockData";
import { Issue } from "../types";
import { useLanguage } from "../contexts/LanguageContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// --- DUMMY DATA FOR DEVELOPMENT (replace with DB data later) ---
const DUMMY_ISSUES = [
  {
    id: "101",
    title: "Uncollected Garbage",
    description: "Garbage pileup near Durbar Marg.",
    category: "garbage",
    status: "pending",
    latitude: 27.713,
    longitude: 85.317,
  },
  {
    id: "102",
    title: "Broken Street Light",
    description: "No lighting at Putalisadak crossing.",
    category: "electricity",
    status: "in-progress",
    latitude: 27.7112,
    longitude: 85.3201,
  },
  {
    id: "103",
    title: "Water Pipe Leakage",
    description: "Continuous leakage near Bhadrakali temple.",
    category: "water",
    status: "pending",
    latitude: 27.6991,
    longitude: 85.3102,
  },
];
// --- END DUMMY DATA ---

const MAP_CENTER: [number, number] = [27.7172, 85.324];

const IssuesPage = () => {
  const { translations } = useLanguage();
  const [searchParams] = useSearchParams();
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>(MOCK_ISSUES);
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">(() => {
    return (searchParams.get("view") as "grid" | "list" | "map") || "grid";
  });
  const [isFilterVisible, setIsFilterVisible] = useState(true);

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

  useEffect(() => {
    let result = [...MOCK_ISSUES];

    // Filtering logic...
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (issue) =>
          issue.title.toLowerCase().includes(searchLower) ||
          issue.description.toLowerCase().includes(searchLower)
      );
    }
    if (filters.category) {
      result = result.filter((issue) => issue.category === filters.category);
    }
    if (filters.status) {
      result = result.filter((issue) => issue.status === filters.status);
    }
    if (wardFilter) {
      result = result.filter(
        (issue) => issue.wardNumber === parseInt(wardFilter)
      );
    }
    if (criticalFilter === "true") {
      result = result.filter(
        (issue) =>
          issue.status === "pending" &&
          ["water", "electricity", "public-safety"].includes(issue.category)
      );
    }
    if (myReportsFilter === "true") {
      result = result.filter((issue) => issue.reportedBy === "user-1");
    }
    switch (filters.sortBy) {
      case "votes":
        result.sort((a, b) => b.votes - a.votes);
        break;
      case "date":
        result.sort(
          (a, b) =>
            new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime()
        );
        break;
      case "status":
        const statusPriority: Record<string, number> = {
          pending: 0,
          "in-progress": 1,
          resolved: 2,
        };
        result.sort(
          (a, b) => statusPriority[a.status] - statusPriority[b.status]
        );
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
    setViewMode((current) => {
      if (current === "grid") return "list";
      if (current === "list") return "map";
      return "grid";
    });
  };

  const renderContent = () => {
    if (viewMode === "map") {
      return (
        <div className="bg-white rounded-lg shadow-sm p-4 h-[calc(100vh-300px)] min-h-[500px]">
          {/* Rectangle box with the map only inside */}
          <div style={{ width: "100%", height: "100%", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
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
              {/* ---- DUMMY_ISSUES used below. Replace with your fetched data later ---- */}
              {DUMMY_ISSUES.map((issue) => (
                <Marker
                  key={issue.id}
                  position={[issue.latitude, issue.longitude] as [number, number]}
                >
                  <Popup>
                    <strong>{issue.title}</strong>
                    <br />
                    {issue.description}
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
          <IssueCard key={issue.id} issue={issue} />
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