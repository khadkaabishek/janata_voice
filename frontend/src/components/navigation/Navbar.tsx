import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, User, LogIn, Settings } from "lucide-react";
import Button from "../ui/Button";
import { useLanguage } from "../../contexts/LanguageContext";
import photo from '../../../public/janatavoice.png';
import { useAuth } from "./../../utils/user";
const Navbar: React.FC = () => {


  const { isLoggedIn,verify } = useAuth();
// console.log(isLoggedIn);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, translations } = useLanguage();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "np" : "en");
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  // Check if current route is admin
  const isAdminRoute = location.pathname.startsWith('/admin');

  const navLinks = [
    { name: translations["nav.home"], path: "/" },
    { name: translations["nav.issues"], path: "/dashboard/issues" },
    { name: translations["nav.discussion"], path: "/dashboard/discussion" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to={isAdminRoute ? "/admin" : "/"} className="flex items-center space-x-2">
            <img
              src={photo}
              alt="JanataVoice Logo"
              className="h-10 w-20 object-contain"
            />
            <div>
              <div className="text-xl font-display font-bold text-primary-800">
                {translations["app.title"]}
              </div>
              <div className="text-xs text-gray-500">
                {translations["app.subtitle"]}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Hide for admin routes */}
          {!isAdminRoute && (
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActiveRoute(link.path)
                      ? "text-primary-700 bg-primary-50"
                      : "text-gray-700 hover:text-primary-700 hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}

          {/* Right side content */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center text-sm text-gray-700 hover:text-primary-700"
            >
              <Globe size={16} className="mr-1" />
              {language === "en" ? "EN | नेपाली" : "नेपाली | EN"}
            </button>
            
            {isAdminRoute ? (
              // Admin profile section
              <Link 
                to="/admin/settings"
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-700 transition-colors"
              >
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">MR</span>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">Mayor Ram Shrestha</div>
                  <div className="text-xs text-gray-500">Kathmandu Municipality</div>
                </div>
                <Settings size={16} className="text-gray-400" />
              </Link>
            ) : (
              // Regular login/register buttons
              <>
  {!isLoggedIn ? (
    <>
      <Link to="/login">
        <Button variant="secondary" size="sm" icon={<LogIn size={16} />}>
          {translations["nav.login"]}
        </Button>
      </Link>
      <Link to="/register">
        <Button variant="primary" size="sm" icon={<User size={16} />}>
          {translations["nav.register"]}
        </Button>
      </Link>
    </>
  ) : verify ? (
    <Button variant="outline" size="sm" disabled>
      {translations["nav.pending"] || "Pending"}
    </Button>
  ) : (
    <Link to="/kyc">
      <Button variant="secondary" size="sm" icon={<LogIn size={16} />}>
        {translations["nav.verify"] || "Verify"}
      </Button>
    </Link>
  )}
</>

            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary-700 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 animate-fade-in">
            {!isAdminRoute && (
              <div className="space-y-1 pb-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActiveRoute(link.path)
                        ? "text-primary-700 bg-primary-50"
                        : "text-gray-700 hover:text-primary-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
            
            <div className="pt-4 pb-3 border-t border-gray-100">
              <div className="flex items-center px-3">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center text-sm text-gray-700 hover:text-primary-700"
                >
                  <Globe size={16} className="mr-1" />
                  {language === "en" ? "EN | नेपाली" : "नेपाली | EN"}
                </button>
              </div>
              
              {isAdminRoute ? (
                // Mobile admin profile
                <div className="mt-3 px-3">
                  <Link 
                    to="/admin/settings"
                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700">MR</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Mayor Ram Shrestha</div>
                      <div className="text-xs text-gray-500">Kathmandu Municipality</div>
                    </div>
                    <Settings size={16} className="text-gray-400" />
                  </Link>
                </div>
              ) : (
                // Mobile login/register
                <div className="mt-3 space-y-2 px-3">
                  <Link to="/login">
                    <Button
                      variant="secondary"
                      size="sm"
                      fullWidth
                      icon={<LogIn size={16} />}
                    >
                      {translations["nav.login"]}
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      variant="primary"
                      size="sm"
                      fullWidth
                      icon={<User size={16} />}
                    >
                      {translations["nav.register"]}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
