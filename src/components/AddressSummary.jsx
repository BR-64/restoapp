import React, { useEffect, useState } from 'react';
import { getDefaultAddress } from '../api/addressApi.js';

const AddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadAddress = async () => {
    const result = await getDefaultAddress();
    console.log('Returned result:', result); // 👈 Debug log

    setAddresses(result.data ? [result.data] : []);

    setLoading(false);
  };

  //   const loadAddresses = async () => {
  //     console.log('load address');
  //     const result = await getDefaultAddress();
  //     if (result.success) {
  //       console.log('result data', result.data);

  //       setAddresses(result.data);

  //       console.log('this is address', addresses);
  //     } else {
  //       setError(result.error);
  //     }
  //     setLoading(false);
  //   };

  useEffect(() => {
    // loadAddresses();
    loadAddress();
  }, []);

  if (loading) return <p>Loading addresses...</p>;
  if (error) return <p className='text-red-500'>{error}</p>;

  return (
    <div className='max-w-xl mx-auto p-4'>
      <h2 className='text-xl font-bold mb-4'>Shipping Address</h2>
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressList;
// export { AddressList, loadAddresses };
