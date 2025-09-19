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

  // On first load, check token
  // useEffect(() => {
  //   // liff version
  //   // const initLiff = async () => {
  //   //   try {
  //   //     await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
  //   //     if (!liff.isLoggedIn()) {
  //   //       liff.login();
  //   //     } else {
  //   //       const profile = await liff.getProfile();
  //   //       setUser(profile);

  //   //       // ✅ Send ID token to backend
  //   //       const idToken = liff.getIDToken();

  //   //       const res = await axios.post(
  //   //         `${import.meta.env.VITE_API_URL}/api/auth/liff-login`,
  //   //         { idToken },
  //   //         { withCredentials: true }
  //   //       );

  //   //       const data = res.data;

  //   //       setToken(data.token);
  //   //       localStorage.setItem('token', data.token); // persist session
  //   //     }
  //   //   } catch (err) {
  //   //     console.error('LIFF init error:', err);
  //   //   }
  //   // };

  //   // liff hybird version
  //   const initLiff = async () => {
  //     try {
  //       await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
  //       if (!liff.isLoggedIn()) {
  //         liff.login();
  //         return;
  //       }

  //       const profile = await liff.getProfile();
  //       console.log(profile);
  //       setUser(profile);

  //       // Send userId to backend
  //       const res = await axios.post(
  //         `${import.meta.env.VITE_API_URL}/api/auth/liff-login`,
  //         {
  //           lineId: profile.userId,
  //           displayName: profile.displayName,
  //           profilePic: profile.pictureUrl,
  //         }, // ✅ no idToken needed
  //         { withCredentials: true }
  //       );

  //       const data = res.data;
  //       setToken(data.token);
  //       localStorage.setItem('token', data.token); // persist session
  //       console.log('token set');
  //       setIsLoggedIn(true);
  //     } catch (err) {
  //       console.error('LIFF init error:', err.response?.data || err.message);
  //     }
  //   };

  //   initLiff();

  //   const token = localStorage.getItem('token');
  //   setIsLoggedIn(!!token);
  // }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
    }
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
    setUser(null);
    setToken(null);

    // also logout from LIFF if still logged in
    if (liff.isLoggedIn()) {
      liff.logout();
    }
  };

  const initLiff = async () => {
    try {
      await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });

      if (!liff.isLoggedIn()) {
        liff.login();
        return;
      }

      const profile = await liff.getProfile();

      // Send profile to backend
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

      // ✅ Use login() so state + storage stay in sync
      login(data.token, profile);
      console.log('LIFF login success, token set');
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
