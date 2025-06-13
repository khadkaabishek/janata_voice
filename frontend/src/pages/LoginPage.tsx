import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent, CardHeader, CardFooter } from '../components/ui/Card';
import { useLanguage } from '../contexts/LanguageContext'; // Added this import

const LoginPage = () => { // Removed React.FC
  const { translations } = useLanguage(); // Added translation hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    setIsLoading(true); // Show loading state
  
    // Prepare JSON payload from form data
    const loginData = {
      email: email.trim(),
      password: password,
    };
    console.log(loginData);
  
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData), // Convert JS object to JSON
      });
  
      const data = await response.json(); // Convert response to JS object
  
      if (!response.ok) {
        // Backend validation failed
        throw new Error(data.message || 'Login failed. Please try again.');
      }
  
      // ✅ Success - store token and redirect
      localStorage.setItem('token', data.token); // Save token (optional)
      navigate('/dashboard'); // Redirect after login
  
    } catch (err: any) {
      // ❌ Show error to user
      alert(err.message);
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center mb-6">
            <img 
              src="../janatavoice.jpg" 
              alt="JanataVoice Logo" 
              className="h-8 w-12 object-contain" 
            />
            <span className="ml-2 text-2xl font-display font-bold text-primary-800">
              {translations['app.title']} {/* Changed to use translation */}
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">
            {translations['auth.login.title']} {/* Changed to use translation */}
          </h2>
          <p className="mt-2 text-gray-600">
            {translations['auth.login.subtitle']} {/* Changed to use translation */}
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold text-primary-700">
              {translations['nav.login']} {/* Changed to use translation */}
            </h3>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {translations['form.email']} {/* Changed to use translation */}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder={translations['form.emailPlaceholder']}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  {translations['form.password']}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder={translations['form.passwordPlaceholder']}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      title={showPassword ? translations['button.hidePassword'] : translations['button.showPassword']}
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    {translations['auth.rememberMe']} {/* Changed to use translation */}
                  </label>
                </div>
                
                <div className="text-sm">
                  <Link to="/forgot-password" className="text-primary-600 hover:text-primary-500">
                    {translations['auth.forgotPassword']} {/* Changed to use translation */}
                  </Link>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="space-y-4">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
                disabled={isLoading}
                icon={<LogIn size={16} />}
              >
                {translations['button.signIn']} {/* Changed to use translation */}
              </Button>
              
              <div className="text-center text-sm text-gray-600">
                {translations['auth.dontHaveAccount']}{' '} {/* Changed to use translation */}
                <Link to="/register" className="text-primary-600 hover:text-primary-500 font-medium">
                  {translations['button.registerNow']} {/* Changed to use translation */}
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
