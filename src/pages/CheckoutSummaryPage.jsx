import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import CartSummary from '../components/CartSummary';
import AddressSummary from '../components/AddressSummary';
import { handleCheckout } from '../utils/checkout';

export default function CheckoutSummaryPage() {
  const { cart, setCart, setReceipt } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const totalPrice = location.state?.total;
  //   const totalPrice = location.prop?.total;

  if (!totalPrice) return <p>No data received.</p>;

  const handleClick = (e) => {
    setSubmitted(true);

    // You can extend this to send address to backend here
    handleCheckout(cart, setCart, setReceipt, navigate);

    // if (onClose) onClose(); // Optional: close modal after checkout
  };

  return (
    <div className='p-4 border rounded shadow-md w-full max-w-lg  m-4 mx-auto'>
      <h3>This is checkout Summary</h3>
      <CartSummary totalfrombackend={totalPrice} />
      <AddressSummary />
      <button
        onClick={handleClick}
        className='w-full mb-4 bg-green-300 text-green py-2 rounded hover:bg-green-400 shadow-md'>
        Place Order
      </button>
    </div>
  );
}
