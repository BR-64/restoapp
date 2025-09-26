import { createContext, useContext, useEffect, useState } from 'react';
import liff from '@line/liff';
import axios from 'axios';

// Create the context
const AuthContext = createContext();

// Hook for easy access
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    } else {
      //try liff login
      // initLiff();
    }
  }, []);

  // Login function (used for both email and LIFF)
  const login = (token, userData = null) => {
    localStorage.setItem('token', token);
    setToken(token);
    setIsLoggedIn(true);
    if (userData) setUser(userData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);

    // also logout from LIFF if still logged in
    if (liff.isLoggedIn()) {
      liff.logout();
    }
  };

  const initLiff = async () => {
    try {
      await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });

      // Force login if not logged in
      if (!liff.isLoggedIn()) {
        liff.login();
        return;
      }

      const profile = await liff.getProfile();

      console.log(profile);
      setUser(profile);

      // Send userId to backend
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/liff-login`,
        {
          lineId: profile.userId,
          displayName: profile.displayName,
          profilePic: profile.pictureUrl,
        },
        { withCredentials: true }
      );

      const data = res.data;
      setToken(data.token);
      localStorage.setItem('token', data.token); // persist session
      console.log('token set');
      setIsLoggedIn(true);
    } catch (err) {
      console.error('LIFF init error:', err.response?.data || err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, user, setUser, initLiff }}>
      {children}
    </AuthContext.Provider>
  );
};
