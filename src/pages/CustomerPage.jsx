// src/pages/Login.jsx
import { useState } from 'react';
import AddAddressForm from '../components/AddressForm.jsx';
import AddressList from '../components/AddressList.jsx';
import OrderList from '../components/OrderList.jsx';

function CustomerPage() {
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
      {/* <h3>Order History</h3> */}
      <OrderList refresh={refresh} />
      {/* <button
        onClick={getorder}
        className='bg-blue-500 text-white px-4 py-2 rounded'>
        get orders
      </button> */}
    </div>
  );
}

export default CustomerPage;
