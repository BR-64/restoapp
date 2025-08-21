import OrderCard from '../components/OrderCard';
import { useLocation } from 'react-router-dom';

export default function OrderSubmittedPage() {
  const location = useLocation();
  const { order } = location.state || {};

  return (
    <div>
      <h1>Your order has been submitted</h1>
      <OrderCard order={order} />
    </div>
  );
}
