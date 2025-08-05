import { useCart } from '../context/CartContext';
import ItemList from './CartItemList';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, setCart, getTotal } = useCart();

  return (
    <div className='p-4 border-gray-400 rounded shadow-md m-3 w-full max-w-lg mx-auto'>
      <p>this is cart 4</p>
      <h2 className='text-xl font-bold mb-4'>🛒 Cart</h2>
      {cart.length === 0 ? (
        <p className='text-gray-500'>Cart is empty.</p>
      ) : (
        <ItemList items={cart} />
      )}
      <hr className='my-4' />
      <div className='flex justify-between font-bold mb-4'>
        <span>Total:</span>
        <span>&nbsp;฿ {getTotal().toLocaleString(2)}</span>
      </div>
    </div>
  );
}
