import axios from 'axios';

const getUserOrders = async () => {
  const token = localStorage.getItem('token');

  console.log('Fetching user orders');

  try {
    const res = await axios.get('http://localhost:5000/api/orders/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log('all orders from user', res.data);
    return { success: true, data: res.data.orders };
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw new Error('Failed to fetch user orders');
  }
};

export { getUserOrders };
