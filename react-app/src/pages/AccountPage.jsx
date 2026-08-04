import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import '../styles/account.css';

export default function AccountPage() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully.');
    navigate('/');
  };

  return (
    <div className="account-page">
      <div className="account-container">
        <h1>My Account</h1>

        <div className="account-section">
          <h2>Profile Information</h2>
          <p><strong>Name:</strong> <span>{user?.name || 'Not set'}</span></p>
          <p><strong>Email:</strong> <span>{user?.email || 'Not set'}</span></p>
          <p><strong>Phone:</strong> <span>{localStorage.getItem('userPhone') || '+49 170 1234567'}</span></p>
          <p><strong>Delivery Address:</strong> <span>{localStorage.getItem('userAddress') || 'Friedrichstraße 12, 10117 Berlin'}</span></p>
        </div>

        <div className="account-section">
          <h2>Logout</h2>
          <p>Click below to securely log out of your account.</p>
          <button id="logoutBtn" className="btn" onClick={handleLogout}>
            <i className="ri-logout-box-r-line"></i> Logout
          </button>
        </div>
      </div>
    </div>
  );
}