import { createContext, useContext, useEffect, useState } from 'react';
import liff from '@line/liff';

// Create the context
const AuthContext = createContext();

// Hook for easy access
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // On first load, check token
  useEffect(() => {
    // const initLiff = async () => {
    //   try {
    //     await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
    //     if (!liff.isLoggedIn()) {
    //       liff.login();
    //     } else {
    //       const profile = await liff.getProfile();
    //       setUser(profile);
    //     }
    //   } catch (err) {
    //     console.error('LIFF init error:', err);
    //   }
    // };

    // initLiff();

    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Login function
  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
