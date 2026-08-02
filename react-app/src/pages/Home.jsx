import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { categories, featuredDishes, services } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import '../styles/home.css';

export default function Home() {
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3;

  const handleAddToCart = (dish) => {
    if (!isLoggedIn) {
      localStorage.setItem('clickedDish', JSON.stringify(dish));
      navigate('/login');
      return;
    }
    addToCart(dish);
    showToast(`${dish.name} added to cart!`);
  };

  const showSlide = (index) => {
    const maxIndex = Math.max(0, featuredDishes.length - itemsToShow);
    setCurrentIndex(Math.min(Math.max(0, index), maxIndex));
  };

  const nextSlide = () => {
    const maxIndex = Math.max(0, featuredDishes.length - itemsToShow);
    showSlide(currentIndex + itemsToShow > maxIndex ? 0 : currentIndex + itemsToShow);
  };

  const prevSlide = () => {
    const maxIndex = Math.max(0, featuredDishes.length - itemsToShow);
    showSlide(currentIndex - itemsToShow < 0 ? maxIndex : currentIndex - itemsToShow);
  };

  const visibleDishes = featuredDishes.slice(currentIndex, currentIndex + itemsToShow);

  return (
    <>
      <section id="home">
        <header>
          <div className="header">
            <div className="content">
              <h2 id="title">Here Every Dish Tells a <span>Story</span></h2>
              <h4 id="intro">
                Embark on a gastronomic journey where flavors dance upon your
                palate, each dish a symphony of culinary artistry.
              </h4>
            </div>
            <div className="img">
              <img
                id="img1"
                src="/assets/images/c74d318156023a0fe71cf0dab4009ace.png"
                alt="Featured dish from Modern Berlin Restaurant"
              />
            </div>
          </div>
        </header>
      </section>

      <main>
        <section id="menus">
          <div className="popular">
            <div className="container">
              <div className="menu">
                <h3>Customer Favorites</h3>
                <h1 id="heading">Popular Categories</h1>
              </div>
            </div>
            <div className="card-container">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/menu/${cat.id}`}
                  className="card"
                  onClick={() => localStorage.setItem('selectedCategory', cat.id)}
                >
                  <p>{cat.amount}</p>
                  <h2>{cat.name}</h2>
                  <img src={cat.img} alt={cat.name} loading="lazy" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="offer">
          <div className="carocel-content">
            <h3>Special Dishes</h3>
            <div className="symbol-content">
              <h1>Standout Dishes <br /> From Our Menu</h1>
              <div className="symbols">
                <h1 id="previous" onClick={prevSlide}>{'<'}</h1>
                <h1 id="next" onClick={nextSlide}>{'>'}</h1>
              </div>
            </div>
          </div>
          <div className="carocel">
            {visibleDishes.map((dish) => (
              <div key={dish.id} className="caro">
                <div className="images">
                  <img className="image" src={dish.img} alt={dish.name} loading="lazy" />
                  <img className="heart" src="/assets/images/filledheart.png" alt="heart" loading="lazy" />
                </div>
                <div className="textcaro">
                  <h2>{dish.name}</h2>
                  <p>{dish.description}</p>
                </div>
                <div className="pricediv">
                  <h2>{dish.price} €</h2>
                </div>
                <div className="ratingtext">
                  <img className="ratingimage" src="/assets/images/fi-sr-star.png" alt="rating" loading="lazy" />
                  <h5>{dish.rating}</h5>
                </div>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(dish)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <section id="service">
        <div className="services-container">
          <div className="text-container">
            <h3>OUR STORY & SERVICES</h3>
            <p className="p-2">Our Culinary Journey <br />And Services</p>
            <p className="p-3">
              Rooted in passion, we curate unforgettable dining experiences and
              offer exceptional services, blending culinary artistry with warm hospitality.
            </p>
            <button className="btn-3" onClick={() => document.getElementById('menus')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore
            </button>
          </div>

          <div className="cards-container">
            {services.map((service, idx) => (
              <div key={idx} className="card1">
                <img src={service.icon} alt={`${service.heading} icon`} loading="lazy" />
                <p className="heading">{service.heading}</p>
                <p className="paragraph">{service.paragraph}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}