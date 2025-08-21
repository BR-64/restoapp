import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import Cart from '../components/Cart3';
// import Cart from '../components/Cart4';
import CheckoutForm from '../components/CheckOutForm';

export default function CartPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className='p-4 border rounded shadow-md w-full max-w-lg  m-4 mx-auto'>
      <Cart />
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className='w-full mb-4 bg-green-300 text-green py-2 rounded hover:bg-green-400 shadow-md'>
          Proceed to Checkout
        </button>
      )}
      {showForm && <CheckoutForm />}
    </div>
  );
}
