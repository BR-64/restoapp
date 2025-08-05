import React from 'react';

const OrderDetails = () => {
  return (
    <div className='max-w-xl mx-auto p-4'>
      <p>Order no</p>
      <p>Items</p>
      <p>address</p>

      <h2 className='text-xl font-bold mb-4'>Order Details</h2>
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressList;
// export { AddressList, loadAddresses };
