import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Check, Clock, MapPin, ExternalLink, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
import { MOCK_ISSUES, MOCK_WARD_PERFORMANCE } from '../data/mockData';

const HomePage: React.FC = () => {
  // Get top performing ward
  const topWard = [...MOCK_WARD_PERFORMANCE].sort((a, b) => b.resolutionRate - a.resolutionRate)[0];
  
  // Calculate stats
  const totalIssues = MOCK_WARD_PERFORMANCE.reduce((sum, ward) => sum + ward.totalIssues, 0);
  const resolvedIssues = MOCK_WARD_PERFORMANCE.reduce((sum, ward) => sum + ward.resolvedIssues, 0);
  
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative bg-primary-800 text-white">
        <div 
          className="absolute inset-0 z-0 bg-center bg-cover opacity-20"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/3254729/pexels-photo-3254729.jpeg)' }}
        ></div>
        <div className="container-custom relative z-10 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your Voice Matters in Kathmandu
            </h1>
            <p className="text-xl text-gray-100 mb-8">
              Empowering citizens through technology to report issues, track progress, and build a better community together.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/dashboard/report">
                <Button 
                  variant="success" 
                  size="lg" 
                  icon={<AlertTriangle size={20} />}
                >
                  Report an Issue
                </Button>
              </Link>
              <Link to="/dashboard/issues">
                <Button 
                  variant="secondary" 
                  size="lg"
                >
                  View Issues
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-primary-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-primary-700">Total Issues</h3>
                <AlertTriangle size={24} className="text-primary-500" />
              </div>
              <p className="text-3xl font-bold text-primary-800">{totalIssues}</p>
              <p className="text-sm text-gray-600 mt-2">Across all wards</p>
            </div>
            
            <div className="bg-success-light/20 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-success-dark">Resolved</h3>
                <Check size={24} className="text-success" />
              </div>
              <p className="text-3xl font-bold text-success-dark">{resolvedIssues}</p>
              <p className="text-sm text-gray-600 mt-2">Issues successfully addressed</p>
            </div>
            
            <div className="bg-warning-light/20 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-warning-dark">Top Ward</h3>
                <MapPin size={24} className="text-warning" />
              </div>
              <p className="text-3xl font-bold text-warning-dark">Ward {topWard.wardNumber}</p>
              <p className="text-sm text-gray-600 mt-2">{topWard.resolutionRate.toFixed(1)}% resolution rate</p>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-700">Last Updated</h3>
                <Clock size={24} className="text-gray-500" />
              </div>
              <p className="text-lg font-semibold text-gray-800">Today, 2:45 PM</p>
              <p className="text-sm text-gray-600 mt-2">Data refreshes hourly</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-primary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">How Janata Voice Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform simplifies the process of reporting issues to your municipality and tracking their resolution.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-2">1. Report</h3>
              <p className="text-gray-600">
                Submit your issue with details and photos. Specify the location and category for faster processing.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-2">2. Track</h3>
              <p className="text-gray-600">
                Follow the status of your report through our dashboard. Get notifications as progress is made.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <Check size={32} />
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-2">3. Resolve</h3>
              <p className="text-gray-600">
                Municipal authorities address the issue and mark it as resolved once completed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Issues Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-primary-800">Recent Issues</h2>
            <Link to="/dashboard/issues" className="text-primary-600 hover:text-primary-700 flex items-center">
              View all issues <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_ISSUES.slice(0, 3).map(issue => (
              <Card key={issue.id} className="h-full">
                <img 
                  src={issue.images[0]} 
                  alt={issue.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent>
                  <h3 className="text-lg font-semibold mb-2">{issue.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{issue.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Ward {issue.wardNumber}</span>
                    <Link to={`/dashboard/issues`}>
                      <Button variant="primary" size="sm">View Details</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Join Janata Voice Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be part of the community effort to improve Kathmandu Metropolitan City. Your voice matters!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button 
                variant="success" 
                size="lg"
              >
                Create an Account
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                variant="secondary" 
                size="lg" 
                icon={<ExternalLink size={20} />}
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;