import { Link } from 'react-router-dom';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer>
      <section className="footer-bottom-wrapper">
        <div className="site-footer">
          <div className="footer-grid">
            <div className="footer-col footer-brand">
              <h2 className="footer-logo">Modern Berlin Restaurant</h2>
              <p className="footer-tagline">Savor the artistry where every dish is a culinary masterpiece</p>
              <div className="social-icons">
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Facebook">
                  <img src="/assets/icons/facebook.png" alt="Facebook" loading="lazy" />
                </a>
                <a href="https://www.instagram.com/hassantahir688/" target="_blank" rel="noreferrer" className="social-icon" aria-label="Instagram">
                  <img src="/assets/icons/instagram.svg" alt="Instagram" loading="lazy" />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Twitter">
                  <img src="/assets/icons/twitter.png" alt="Twitter" loading="lazy" />
                </a>
                <a href="https://www.youtube.com/@unitedproductions8062" target="_blank" rel="noreferrer" className="social-icon" aria-label="YouTube">
                  <img src="/assets/icons/youtube.png" alt="YouTube" loading="lazy" />
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h3 className="footer-heading">Useful Links</h3>
              <ul className="footer-links-list">
                <li><Link to="/#service">About Us</Link></li>
                <li><Link to="/#offer">Events</Link></li>
                <li><Link to="/#menus">Blogs</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3 className="footer-heading">Main Menu</h3>
              <ul className="footer-links-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/#offer">Offers</Link></li>
                <li><Link to="/menu/main-dish">Menus</Link></li>
                <li><Link to="/booking">Reservation</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3 className="footer-heading">Contact Us</h3>
              <ul className="footer-links-list">
                <li><a href="mailto:contact@modernberlinrestaurant.com">contact@modernberlinrestaurant.com</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2023 Modern Berlin Restaurant. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/booking">Reserve Table</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/account">Account</Link>
              <Link to="/privacy">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}