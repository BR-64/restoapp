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
    const initLiff = async () => {
      try {
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          const profile = await liff.getProfile();
          setUser(profile);

          // ✅ Send ID token to backend
          const idToken = liff.getIDToken();

          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/liff-login`,
            { idToken },
            { withCredentials: true }
          );

          const data = await res.json();

          if (res.ok) {
            setToken(data.token);
            localStorage.setItem('jwt', data.token); // persist session
          }
        }
      } catch (err) {
        console.error('LIFF init error:', err);
      }
    };

    initLiff();

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
