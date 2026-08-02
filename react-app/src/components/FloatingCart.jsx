import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function FloatingCart() {
  const { itemCount } = useCart();

  if (itemCount === 0) return null;

  return (
    <Link to="/cart" className="floating-cart" id="floatingCart">
      <i className="ri-shopping-cart-line"></i>
      <span className="cart-count" id="cartCount">{itemCount}</span>
    </Link>
  );
}