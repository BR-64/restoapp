import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { loadAddresses } from './AddressList';

const AddAddressForm = ({ onSubmitSuccess }) => {
  const [form, setForm] = useState({
    house_no: '',
    street: '',
    district: '',
    sub_district: '',
    zip: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // or from cookies

    // const loadAddresses = loadAddresses();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/address/add', // adjust URL
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Address added successfully!');

      setForm({
        house_no: '',
        street: '',
        district: '',
        sub_district: '',
        zip: '',
      });
      //   window.location.reload();
      //   loadAddresses(); // Reload addresses after adding
      console.log('this is response', response);

      /// try set default address
      //   try {
      //     const result = await setDefaultAddress(response.data._id);
      //   } catch (err) {
      //     console.error(err);
      //     setMessage('Error set default address');
      //   }

      //   navigate('/customer');

      onSubmitSuccess();
    } catch (err) {
      console.error(err);
      setMessage('Error adding address');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-md mx-auto p-4 border rounded'>
      <h2 className='text-xl mb-4 font-bold'>Add Address</h2>
      {['house_no', 'street', 'district', 'sub_district', 'zip'].map(
        (field) => (
          <input
            key={field}
            type='text'
            name={field}
            placeholder={field}
            value={form[field]}
            onChange={handleChange}
            className='block w-full mb-3 p-2 border rounded'
            required
          />
        )
      )}
      <button
        type='submit'
        className='bg-blue-500 text-white px-4 py-2 rounded'>
        Save Address
      </button>
      {message && <p className='mt-2'>{message}</p>}
    </form>
  );
};

export default AddAddressForm;
