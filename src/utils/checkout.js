import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const summaryCal = async (cart, navigate) => {
  console.log('summaryCal called with cart:', cart);

  // const navigate = useNavigate();

  if (!cart || cart.length === 0) {
    alert('Cart is empty!');
    return;
  }

  try {
    const res = await axios.post('http://localhost:5000/api/cart/cal', {
      cartItems: cart,
    });
    console.log(res.data.totalPrice);
    navigate('/chkoutsummary', { state: { total: res.data.totalPrice } });
    // navigate('/chkoutsummary', { prop: { total: res.data.totalPrice } });
  } catch (err) {
    console.error(err);
    alert('Failed to cal price');
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

    // Navigate to receipt page
    navigate('/receipt');
  } catch (err) {
    console.error(err);
    alert('Failed to place order');
  }
};

export { handleCheckout, summaryCal };
