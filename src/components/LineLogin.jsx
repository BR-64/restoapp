import { useEffect, useState } from 'react';
import { initLiff } from '../lib/liffClient';
import axios from 'axios';

export default function LineLogin() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    (async () => {
      const liff = await initLiff();

      if (!liff.isLoggedIn()) {
        liff.login({ redirectUri: window.location.href });
        return;
      }

      const userProfile = await liff.getProfile();
      setProfile(userProfile);

      // Get ID Token
      const idToken = liff.getIDToken();

      // Send to backend for verification & user creation
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/line-login`,
        { idToken },
        { withCredentials: true } // if you use cookies
      );

      console.log('Backend user:', res.data);
    })();
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome {profile.displayName}</h2>
      <img src={profile.pictureUrl} alt='avatar' width={80} />
    </div>
  );
}
