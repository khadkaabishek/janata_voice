// src/contexts/UserContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserProfile {
  data: {
    user: {
      name: string;
      wardNo: number;
      avatar?: string;
      role?: string;
    };
  };
}

const UserContext = createContext<UserProfile | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserProfile | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetch('http://localhost:5001/api/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUserData(data))
      .catch(() => setUserData(null));
  }, []);

  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
