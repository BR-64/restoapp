import React, { useEffect, useState } from 'react';
import { getUserOrders } from '../utils/order';
import OrderCard from './OrderCard';

export default function OrderList({ refresh }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUserOrders = async () => {
    const result = await getUserOrders();

    console.log('getUserOrders result:', result.data);
    setOrders(Array.isArray(result.data) ? result.data : []);
    // setOrders(result.data || []);

    setLoading(false);
  };
  //fetch order list from api
  useEffect(() => {
    loadUserOrders();
  }, [refresh]);

  return (
    <div>
      <h2 className='text-xl font-bold mb-4'>Order History</h2>
      {orders.length === 0 ? (
        <p> no orders found.</p>
      ) : (
        orders.map((orders) => <OrderCard key={orders._id} order={orders} />)
      )}
    </div>
  );
}
