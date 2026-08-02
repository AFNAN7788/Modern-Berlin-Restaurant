import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/nav.css';

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="nav">
      <nav>
        <input
          type="checkbox"
          id="check"
          checked={menuOpen}
          onChange={() => setMenuOpen(!menuOpen)}
        />
        <label htmlFor="check" className="checkbtn">
          <i className="ri-menu-line"></i>
        </label>
        <Link to="/" className="logo-text">Modern Berlin Restaurant</Link>
        <ul>
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu/main-dish" className={({ isActive }) => (isActive ? 'active' : '')}>
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/booking" className={({ isActive }) => (isActive ? 'active' : '')}>
              Reserve Table
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active' : '')}>
              Cart {itemCount > 0 && <span className="nav-cart-count">({itemCount})</span>}
            </NavLink>
          </li>
          {!isLoggedIn ? (
            <>
              <li>
                <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Signup
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/account" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Account
                </NavLink>
              </li>
              <li>
                <button className="nav-logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}