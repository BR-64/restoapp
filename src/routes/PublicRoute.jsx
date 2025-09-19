import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // your custom auth hook

// Public-only route (redirect if logged in)
const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useAuth(); // true if user is authenticated

  if (isLoggedIn) {
    return <Navigate to='/' replace />; // redirect to home/dashboard
  }

  return children;
};

export default PublicRoute;
