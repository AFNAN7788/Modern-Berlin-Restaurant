import { useParams, useNavigate } from 'react-router-dom';
import { dishes, categories } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import '../styles/dishpage.css';

export default function MenuPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const { showToast } = useToast();

  const categoryData = categories.find((c) => c.id === category);
  const categoryDishes = dishes[category] || [];

  const handleAddToCart = (dish) => {
    if (!isLoggedIn) {
      localStorage.setItem('clickedDish', JSON.stringify(dish));
      navigate('/login');
      return;
    }
    addToCart(dish);
    showToast(`${dish.name} added to cart!`);
  };

  if (!categoryData) {
    return (
      <div className="dishpage-container">
        <h1>Category not found</h1>
        <p>The menu category you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="dishpage-container">
      <div className="dishpage-header">
        <h1>{categoryData.name}</h1>
        <p>{categoryData.description}</p>
      </div>
      <div id="dish-container">
        {categoryDishes.map((dish) => (
          <div key={dish.id} className="dish-card">
            <img src={dish.img} alt={dish.name} width="200" />
            <h2>{dish.name}</h2>
            <p>{dish.price} €</p>
            <button className="add-to-cart" onClick={() => handleAddToCart(dish)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}