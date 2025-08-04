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
  } catch (err) {
    console.error(err);
    alert('Failed to cal price');
  }
};

const handleCheckout = async (cart, setCart, address, setReceipt, navigate) => {
  if (!cart || cart.length === 0) {
    alert('Cart is empty!');
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Simulate checkout
  alert(
    `✅ Checkout successful!\nTotal: $${total.toFixed(
      2
    )}\nShipping to:\n${address}`
  );

  // api call
  try {
    // const res = await axios.post('http://localhost:5000/api/cart/cal', {
    const res = await axios.post('http://localhost:5000/api/orders', {
      // hello: 'helloss',
      cartItems: cart,
      address,
      total,
      // userId:
    });

    // Set receipt data
    setReceipt({
      address,
      items: cart,
      total,
      timestamp: new Date().toLocaleString(),
    });

    // Clear cart
    setCart([]);
    localStorage.removeItem('cart');

    // Navigate to receipt page
    // navigate('/receipt');
  } catch (err) {
    console.error(err);
    alert('Failed to place order');
  }
};

export { handleCheckout, summaryCal };
