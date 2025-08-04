import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function CartSummary({ totalfrombackend }) {
  const { cart, getTotal } = useCart();

  return (
    <div className='p-4 border-gray-400 rounded shadow-md m-3 w-full max-w-lg mx-auto'>
      <h2 className='text-xl font-bold mb-4'>🛒 Cart</h2>
      {cart.length === 0 ? (
        <p className='text-gray-500'>Cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div
            key={item._id}
            className='flex justify-between items-center mb-3'>
            <div>
              <h4 className='font-semibold'>{item.name}</h4>
              <p>
                &nbsp;฿{item.price} × {item.quantity}
              </p>
              <p className='text-sm text-gray-500'>
                Total: &nbsp;฿{(item.price * item.quantity).toLocaleString(2)}
              </p>
            </div>
          </div>
        ))
      )}

      {/* Total and checkout button */}
      <hr className='my-4' />
      <div className='flex justify-between font-bold mb-4'>
        <span>Total:</span>
        <span>&nbsp;฿ {totalfrombackend.toLocaleString(2)}</span>
      </div>
    </div>
  );
}
