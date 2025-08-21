import AddressCard from './AddressCard';

export default function OrderCard({ order }) {
  // const order_from_props = order;
  // console.log('order from prop', order_from_props);

  return (
    <div className='max-w-xl mx-auto p-4'>
      {/* ordercard */}
      <div className='p-4 border rounded shadow'>
        <h3 className='font-semibold mb-2'>Order ID : {order._id}</h3>
        <h4 className='font-semibold mb-2'>username : {order.username}</h4>
        <ul className='text-right w-80 mx-auto'>
          {order.items.map((item, index) => (
            <li key={index}>
              {item.name} × {item.quantity} —{' '}
              {(item.price * item.quantity).toLocaleString(2)}
            </li>
          ))}
          <p>total : &nbsp;฿ {order.total.toLocaleString(2)}</p>
        </ul>
        {/* show section only if address exists */}
        {order.shipAddress && (
          <>
            <h3 className='font-semibold m-2'>Shipping Address</h3>
            <AddressCard address={order.shipAddress} />
          </>
        )}
      </div>
    </div>
  );
}
