export default function OItemList({ items }) {
  return (
    <div className='p-4 border-gray-400 rounded shadow-md m-3 w-full max-w-lg mx-auto'>
      {items.map((item) => (
        <div key={item._id} className='flex justify-between items-center mb-3'>
          <div>
            <h4 className='font-semibold'>{item.name}</h4>
            <p>
              &nbsp;฿{item.price} × {item.quantity}
            </p>
            <p className='text-sm text-gray-500'>
              Total: &nbsp;฿{item.price * item.quantity}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
