import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const Navbar: React.FC = () => {
  const { translations, switchLanguage } = useLanguage();

  return (
    <nav className="bg-primary-800 text-white shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">{translations["navbar.home"]}</Link>
        </div>
        {/* Menu Links */}
        <div className="flex space-x-4">
          <Link to="/dashboard/issues" className="hover:underline">
            {translations["navbar.issues"]}
          </Link>
          <Link to="/discussion" className="hover:underline">
            {translations["navbar.discussion"]}
          </Link>
          <Link to="/about" className="hover:underline">
            {translations["navbar.about"]}
          </Link>
        </div>

        {/* Language Switcher */}
        <button
          onClick={() => switchLanguage()}
          className="ml-4 px-4 py-2 rounded bg-secondary-500 hover:bg-secondary-600"
        >
          {translations["navbar.switchLanguage"]}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
