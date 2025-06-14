// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { boolean } from 'zod/v4-mini';

interface AuthContextProps {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  isverifyPending:() =>void;
  verify: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvidera = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [verify,setVerify]  = useState(false);
// console.log('hereurh');
  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
   const isverifyPending = ()=>setVerify(true);
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout,isverifyPending,verify }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  console.log(context);
  return context;
};
