import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
// import './test.css';
// import '@tailwindcss/vite';

//icon
import { MdAddShoppingCart } from 'react-icons/md';

const AddToCartBar = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const decrease = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  const increase = () => {
    setQuantity((q) => q + 1);
  };

  // const handleClick = () => {
  //   addToCart(product);
  //   // if (onAdded) onAdded()
  // };

  return (
    // <div className='mt-auto w-full h-15 bg-green-300'>add to cart bar</div>
    <div class='flex items-center border-gray-400 border rounded overflow-hidden mt-auto w-full h-12 pl-5'>
      <button
        className='px-3 py-1  rounded-md  bg-gray-200 text-gray-700 hover:bg-gray-200'
        onClick={decrease}>
        -
      </button>
      <span className='px-6'>{quantity}</span>
      <button
        className='px-3 py-1  rounded-md  bg-gray-200 text-gray-700 hover:bg-gray-200'
        onClick={increase}>
        +
      </button>
      <button
        className='bg-green-300 text-pink px-6 py-2 rounded-lg  transition m-auto'
        onClick={handleAdd}>
        <MdAddShoppingCart />
      </button>
    </div>
  );
};

export default AddToCartBar;
