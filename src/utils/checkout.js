import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const summaryCal = async (cart, navigate) => {
  const token = localStorage.getItem('token'); // or from cookies

  console.log('summaryCal called with cart:', cart);

  // const navigate = useNavigate();

  if (!cart || cart.length === 0) {
    alert('Cart is empty!');
    return;
  }

  try {
    const res = await axios.post(
      'http://localhost:5000/api/cart/cal',
      {
        cartItems: cart,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data.totalPrice);
    navigate('/chkoutsummary', { state: { total: res.data.totalPrice } });
    // navigate('/chkoutsummary', { prop: { total: res.data.totalPrice } });
  } catch (err) {
    console.error(err);
    // alert('Failed to cal price');
    throw new Error(err.response?.data?.message || 'Something went wrong');
  }
};

const handleCheckout = async (cart, setCart, setReceipt, navigate) => {
  const token = localStorage.getItem('token');
  console.log('sending order', token);

  if (!cart || cart.length === 0) {
    alert('Cart is empty!');
    return;
  }

  try {
    // const res = await axios.post('http://localhost:5000/api/cart/cal', {
    const res = await axios.post(
      'http://localhost:5000/api/orders',
      { cartItems: cart },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // alert(
    //   `✅ Checkout successful!\nTotal: $${total.toFixed(
    //     2
    //   )}\nShipping to:\n${address}`
    // );

    // api call

    // Set receipt data
    // setReceipt({
    //   address,
    //   items: cart,
    //   total,
    //   timestamp: new Date().toLocaleString(),
    // });

    // Clear cart
    setCart([]);
    localStorage.removeItem('cart');

    console.log('res after order created', res);
    console.log(res.data);

    // Navigate to order submitted page
    navigate('/ordersubmitted', { state: { order: res.data.order } });
  } catch (err) {
    console.error(err);
    alert('Failed to place order');
  }
};

export { handleCheckout, summaryCal };
