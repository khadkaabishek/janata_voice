import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';
import './index.css';
import { AuthProvidera } from './utils/user';

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <AuthProvidera>
          <App />
        </AuthProvidera>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>

  </StrictMode>
);
