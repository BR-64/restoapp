import { useEffect, useState } from 'react';
import liff from '@line/liff';

const TestLiff = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });

        if (!liff.isLoggedIn()) {
          // Force login and redirect back to this page
          liff.login({ redirectUri: window.location.href });
          return; // stop here
        }

        // Logged in → get profile
        const p = await liff.getProfile();
        setProfile(p);
      } catch (err) {
        console.error('LIFF error:', err);
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    initLiff();
  }, []);

  if (loading) return <p>Loading LIFF...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h1>LIFF Login Test</h1>
      {!profile && <p>Redirecting to LINE login...</p>}
      {profile && (
        <div>
          <p>Name: {profile.displayName}</p>
          <p>User ID: {profile.userId}</p>
          <img src={profile.pictureUrl} alt='Profile' width={100} />
        </div>
      )}
    </div>
  );
};

export default TestLiff;
