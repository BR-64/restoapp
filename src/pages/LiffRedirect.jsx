import { useEffect } from 'react';
import liff from '@line/liff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const LiffRedirect = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // get login function from context

  useEffect(() => {
    const loginWithLiff = async () => {
      try {
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
        console.log('hello this is liff login');

        // Redirect to LINE login if not logged in
        if (!liff.isLoggedIn()) {
          liff.login({
            redirectUri: window.location.origin + '/liff-redirect',
          });
          //   liff.login();

          return;
        }

        // Get profile
        const profile = await liff.getProfile();
        console.log('liff login completed');
        console.log(profile);

        // Send to backend to get JWT
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/liff-login`,
          {
            lineId: profile.userId,
            displayName: profile.displayName,
            profilePic: profile.pictureUrl,
          },
          { withCredentials: true }
        );

        // Save token & user in localStorage
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(profile));

        // Redirect to main app page
        navigate('/', { replace: true });
      } catch (err) {
        console.error('LIFF login error:', err.response?.data || err.message);
      }
    };

    loginWithLiff();
  }, [navigate]);

  return <div>Logging in via LINE...</div>;
};

export default LiffRedirect;
