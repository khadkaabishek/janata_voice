import React from 'react';
import { MapPin, Users, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-primary-800 text-white py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Janata Voice</h1>
            <p className="text-xl text-gray-100">
              Empowering citizens and municipal authorities to work together for a better Kathmandu through technology and transparency.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-primary-800 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To create a transparent, efficient, and collaborative platform that bridges the gap between citizens and municipal authorities, enabling quicker resolution of civic issues and promoting community engagement.
              </p>
              <p className="text-lg text-gray-600">
                We believe that when citizens are empowered to report issues directly and track their resolution, communities thrive and government accountability increases.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary-800 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 mb-6">
                A Kathmandu where every citizen feels heard, where municipal resources are allocated efficiently based on community needs, and where technology facilitates transparent governance.
              </p>
              <p className="text-lg text-gray-600">
                We envision Janata Voice becoming a model for civic engagement that can be adopted by municipalities across Nepal and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-primary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">How Janata Voice Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform is designed to make civic participation simple, effective, and impactful.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-2">Report Issues</h3>
              <p className="text-gray-600">
                Citizens can easily report local issues with details, location, and photos. Each report is categorized and directed to the appropriate municipal department.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-2">Community Engagement</h3>
              <p className="text-gray-600">
                Users can view, upvote, and comment on reported issues. Ward-specific discussion forums allow for community problem-solving and idea sharing.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-2">Municipal Response</h3>
              <p className="text-gray-600">
                Municipal authorities receive, review, and respond to reports. They update status as issues are addressed, creating accountability and transparency.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/dashboard/report">
              <Button variant="primary" size="lg">
                Report an Issue Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Janata Voice is developed and maintained by a dedicated team of civic technologists, in partnership with Kathmandu Metropolitan City.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img 
                src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg" 
                alt="Bishnu Sharma" 
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-primary-800 mb-1">Bishnu Sharma</h3>
              <p className="text-primary-600 mb-2">Project Director</p>
              <p className="text-gray-600 text-sm">
                Former IT Director at Kathmandu Metropolitan City with 15 years of experience in e-governance.
              </p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg" 
                alt="Sarita Thapa" 
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-primary-800 mb-1">Sarita Thapa</h3>
              <p className="text-primary-600 mb-2">Community Manager</p>
              <p className="text-gray-600 text-sm">
                Urban planner and community organizer focused on citizen participation in local governance.
              </p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" 
                alt="Rajiv Poudel" 
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-primary-800 mb-1">Rajiv Poudel</h3>
              <p className="text-primary-600 mb-2">Lead Developer</p>
              <p className="text-gray-600 text-sm">
                Software engineer with a passion for civic tech and open-source solutions for public services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">Our Partners</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Janata Voice is made possible through collaboration with government agencies and civic organizations.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center">
              <div className="text-center">
                <div className="font-bold text-lg text-primary-800 mb-1">Kathmandu Metropolitan City</div>
                <p className="text-sm text-gray-600">Official Municipal Partner</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center">
              <div className="text-center">
                <div className="font-bold text-lg text-primary-800 mb-1">Digital Nepal Foundation</div>
                <p className="text-sm text-gray-600">Technology Partner</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center">
              <div className="text-center">
                <div className="font-bold text-lg text-primary-800 mb-1">World Bank</div>
                <p className="text-sm text-gray-600">Funding Partner</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center">
              <div className="text-center">
                <div className="font-bold text-lg text-primary-800 mb-1">Code for Nepal</div>
                <p className="text-sm text-gray-600">Civic Tech Partner</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-primary-800 text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Since our launch in 2024, Janata Voice has helped improve civic engagement and issue resolution across Kathmandu.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <p className="text-xl">Registered Users</p>
            </div>
            
            <div>
              <div className="text-4xl font-bold mb-2">15,600+</div>
              <p className="text-xl">Issues Reported</p>
            </div>
            
            <div>
              <div className="text-4xl font-bold mb-2">78%</div>
              <p className="text-xl">Resolution Rate</p>
            </div>
            
            <div>
              <div className="text-4xl font-bold mb-2">32</div>
              <p className="text-xl">Wards Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about using Janata Voice.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary-800 mb-2">Who can use Janata Voice?</h3>
              <p className="text-gray-600">
                Any resident of Kathmandu Metropolitan City can register and use Janata Voice to report issues in their ward. Municipal officials have special accounts to respond to and manage reports.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary-800 mb-2">How quickly will my issue be addressed?</h3>
              <p className="text-gray-600">
                Response times vary based on the type and severity of the issue. Critical issues like water supply disruptions are typically addressed within 24-48 hours, while other issues may take longer depending on municipal resources.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary-800 mb-2">Can I report issues anonymously?</h3>
              <p className="text-gray-600">
                Yes, you can choose to submit reports anonymously. However, creating an account allows you to track your reports and receive updates as they progress toward resolution.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary-800 mb-2">Is my personal information secure?</h3>
              <p className="text-gray-600">
                Yes, we take data privacy seriously. Your personal information is securely stored and only used for account management and communication about your reports. We never share your data with third parties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-primary-800 mb-6">Ready to make a difference in your community?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands of citizens who are working together to improve Kathmandu Metropolitan City, one report at a time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button variant="primary" size="lg">
                Create an Account
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="secondary" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;