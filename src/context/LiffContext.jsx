import { createContext, useContext, useState, useEffect } from 'react';
import liff from '@line/liff';
import axios from 'axios';

const LiffContext = createContext();
export const useLiff = () => useContext(LiffContext);

export const LiffProvider = ({ children }) => {
  const [liffUser, setLiffUser] = useState(null);
  const [liffToken, setLiffToken] = useState('');

  const initLiff = async () => {
    try {
      await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });

      if (!liff.isLoggedIn()) {
        liff.login({
          redirectUri: window.location.origin + window.location.pathname,
        });
        return;
      }

      const profile = await liff.getProfile();
      setLiffUser(profile);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/liff-login`,
        {
          lineId: profile.userId,
          displayName: profile.displayName,
          profilePic: profile.pictureUrl,
        },
        { withCredentials: true }
      );

      setLiffToken(res.data.token);
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      console.error('LIFF init error:', err.response?.data || err.message);
    }
  };

  const logoutLiff = () => {
    if (liff.isLoggedIn()) liff.logout();
    setLiffUser(null);
    setLiffToken('');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) initLiff();
  }, []);

  return (
    <LiffContext.Provider value={{ liffUser, liffToken, initLiff, logoutLiff }}>
      {children}
    </LiffContext.Provider>
  );
};
