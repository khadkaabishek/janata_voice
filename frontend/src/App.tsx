import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages with lazy loading
const HomePage = lazy(() => import('./pages/HomePage'));
const IssuesPage = lazy(() => import('./pages/IssuesPage'));
const DiscussionPage = lazy(() => import('./pages/DiscussionPage'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ReportIssuePage = lazy(() => import('./pages/ReportIssuePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Loading component
import LoadingSpinner from './components/ui/LoadingSpinner';
import KYCForm from './pages/kycForm';

function App() {

  














  return (
    
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='kyc'  element ={<KYCForm/>}/>
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="issues" element={<IssuesPage />} />
          <Route path="report" element={<ReportIssuePage />} />
          <Route path="discussion" element={<DiscussionPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;