import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { summaryCal } from '../utils/checkout';
import AddAddressForm from './AddressForm';
import AddressList from './AddressList';

export default function CheckoutForm({ onClose }) {
  const { cart, setCart, setReceipt } = useCart();
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    console.log('Refresh called');
    setRefresh((prev) => !prev);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (!address.trim()) {
  //     alert('Please enter a shipping address.');
  //     return;
  //   }

  //   setSubmitted(true);

  //   // You can extend this to send address to backend here
  //   handleCheckout(cart, setCart, address, setReceipt, navigate);

  //   if (onClose) onClose(); // Optional: close modal after checkout
  // };

  // const handleSubmit = (e) => {
  //   navigate('/chkoutsummary');
  // };

  const handleClick = (e) => {
    summaryCal(cart, navigate);
  };

  return (
    <>
      <AddressList refresh={refresh} />
      <AddAddressForm onSubmitSuccess={handleRefresh} />
      <div className='p-4 rounded max-w-md mx-auto m-3'>
        <button
          onClick={handleClick}
          className='w-full mb-4 bg-green-300 text-green py-2 rounded hover:bg-green-400 shadow-md'>
          Checkout Summary
        </button>
      </div>
    </>
  );
}
