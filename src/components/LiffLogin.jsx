import { useEffect, useState } from 'react';
import liff from '@line/liff';
import axios from 'axios';

export default function LiffLogin() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    (async () => {
      await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });

      if (!liff.isLoggedIn()) {
        liff.login(); // inside LINE app, usually auto logs in
        return;
      }

      const p = await liff.getProfile();
      setProfile(p);

      // Get OpenID token
      const idToken = liff.getIDToken();

      // Send to backend
      const res = await axios.post(
        // `${import.meta.env.VITE_API_URL}/api/auth/line`,
        `${import.meta.env.VITE_API_URL}/api/auth/liff-login`,
        { idToken },
        { withCredentials: true }
      );
      console.log('Backend user:', res.data);
    })();
  }, []);

  if (!profile) return <p>Loading…</p>;

  return (
    <div>
      <h3>Hello {profile.displayName}</h3>
      <img src={profile.pictureUrl} alt='avatar' width={80} />
    </div>
  );
}
