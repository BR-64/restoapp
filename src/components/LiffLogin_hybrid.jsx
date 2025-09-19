import { useEffect, useState } from 'react';
import liff from '@line/liff';
import axios from 'axios';

export default function LiffLogin_hybrid() {
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
      console.log('thisis p', p);

      // Send userId to backend
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/liff-login`,
        {
          userId: p.userId,
          displayName: p.displayName,
          profilepic: p.pictureUrl, // optional
        }
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
