import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // adjust path to your AuthContext

const LoginToOrder = ({ productId }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (isLoggedIn) return null;

  const handleClick = () => {
    navigate('/login', { state: { from: `/checkout/${productId}` } });
  };

  return (
    <button
      onClick={handleClick}
      className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition'>
      Sign up / Login to Order
    </button>
  );
};

export default LoginToOrder;
