import React, { useEffect, useState } from 'react';
import {
  getUserAddresses,
  setDefaultAddress,
  deleteAddress,
} from '../api/addressApi.js';

const AddressList = ({ refresh }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  //   const loadAddress = async () => {
  //     const data = await getUserAddresses();
  //     setAddresses(data || []);
  //   };

  const loadAddresses = async () => {
    console.log('load address');
    const result = await getUserAddresses();
    if (result.success) {
      console.log('result data', result.data);

      setAddresses(result.data);
      console.log('this is address', addresses);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadAddresses();
  }, [refresh]);

  const handleSetDefault = async (addressId) => {
    console.log('address Id', addressId);

    const result = await setDefaultAddress(addressId);
    if (result.success) {
      // Refresh addresses after update
      const updated = await getUserAddresses();
      if (updated.success) setAddresses(updated.data);
    } else {
      alert(result.error);
    }
  };

  const handleDelete = async (addressId) => {
    if (!window.confirm('Are you sure you want to delete this address?'))
      return;

    const result = await deleteAddress(addressId);
    if (result.success) {
      alert('Address deleted');
      loadAddresses(); // refresh
    } else {
      alert(result.error);
    }
  };

  if (loading) return <p>Loading addresses...</p>;
  if (error) return <p className='text-red-500'>{error}</p>;

  return (
    <div className='max-w-xl mx-auto p-4'>
      <h2 className='text-xl font-bold mb-4'>Your Addresses</h2>
      {addresses.length === 0 ? (
        <p>No addresses found.</p>
      ) : (
        <ul className='space-y-4 text-left'>
          {addresses.map((address) => (
            <li key={address._id} className='p-4 border rounded shadow'>
              <p>
                <strong>House No:</strong> {address.house_no}
              </p>
              <p>
                <strong>Street:</strong> {address.street}
              </p>
              <p>
                <strong>Subdistrict:</strong> {address.subdistrict}
              </p>
              <p>
                <strong>District:</strong> {address.district}
              </p>
              <p>
                <strong>Zip:</strong> {address.zip}
              </p>
              <p>
                <strong>tel:</strong> {address.tel}
              </p>
              <p className='text-sm text-gray-500'>
                {address.default ? (
                  '✅ Default Address'
                ) : (
                  <button
                    className='text-blue-500 underline'
                    onClick={() => handleSetDefault(address._id)}>
                    Set as Default
                  </button>
                )}
                <button onClick={() => handleDelete(address._id)}>
                  🗑 Delete
                </button>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressList;
// export { AddressList, loadAddresses };
