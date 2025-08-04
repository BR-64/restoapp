// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import ForgotPassButton from '../components/ForgotPasButton.jsx';
import AddAddressForm from '../components/AddressForm.jsx';
import AddressList from '../components/AddressList.jsx';

function CustomerPage() {
  //   const navigate = useNavigate();
  //   const [token, setToken] = useState('');
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    console.log('Refresh called');
    setRefresh((prev) => !prev);
  };

  return (
    <div className='p-4 rounded w-full max-w-lg mx-auto'>
      <h2>Welcome to Customer Page</h2>
      <div>
        <h3>Address Component</h3>
        <AddAddressForm onSubmitSuccess={handleRefresh} />
        <AddressList refresh={refresh} />
      </div>
      <div>Order Component</div>
    </div>
  );
}

export default CustomerPage;
