import axios from 'axios';
import { API_URL } from '../../config';

// const token = localStorage.getItem('token');

const getUserAddresses = async () => {
  const token = localStorage.getItem('token');

  console.log(token);

  try {
    const res = await axios.get(`${API_URL}/api/address`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log('User Addresses:', res.data.addresses);
    return { success: true, data: res.data.addresses };
  } catch (err) {
    console.error('Error fetching addresses:', err);
    return { success: false, error: 'Failed to load addresses' };
  }
};

const setDefaultAddress = async (addressId) => {
  console.log('Setting default address for ID:', addressId);

  const token = localStorage.getItem('token');

  try {
    const res = await axios.put(
      `http://localhost:5000/api/address/default/${addressId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data);
    return { success: true, data: res.data };
  } catch (err) {
    console.error('Error setting default address:', err);
    return { success: false, error: 'Failed to set default address' };
  }
};

const deleteAddress = async (addressId) => {
  console.log('Deleting address with ID:', addressId);
  const token = localStorage.getItem('token');

  try {
    const res = await axios.delete(
      `http://localhost:5000/api/address/delete/${addressId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { success: true, data: res.data };
  } catch (err) {
    return {
      success: false,
      error: err.response?.data?.message || err.message,
    };
  }
};

const getDefaultAddress = async () => {
  console.log('Getting default address');
  const token = localStorage.getItem('token');

  try {
    const res = await axios.get(
      'http://localhost:5000/api/address/default_address',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { success: true, data: res.data.address };
  } catch (err) {
    console.error('Error fetching default address:', err);
    return { success: false, error: 'Failed to load default address' };
  }
};

export {
  getUserAddresses,
  setDefaultAddress,
  deleteAddress,
  getDefaultAddress,
};
