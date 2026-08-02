import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import '../styles/account.css';

export default function AccountPage() {
  const { user, logout, updateProfile } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: localStorage.getItem('userPhone') || '+49 170 1234567',
    address: localStorage.getItem('userAddress') || 'Friedrichstraße 12, 10117 Berlin',
  });

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully.');
    navigate('/');
  };

  const handleEditOpen = () => {
    setForm({
      name: user?.name || '',
      email: user?.email || '',
      phone: localStorage.getItem('userPhone') || '+49 170 1234567',
      address: localStorage.getItem('userAddress') || 'Friedrichstraße 12, 10117 Berlin',
    });
    setEditOpen(true);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    updateProfile({ name: form.name, email: form.email });
    localStorage.setItem('userPhone', form.phone);
    localStorage.setItem('userAddress', form.address);
    setEditOpen(false);
    showToast('Profile updated successfully!');
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
          <button id="editProfileBtn" className="btn" type="button" onClick={handleEditOpen}>
            <i className="ri-edit-line"></i> Edit Profile
          </button>
        </div>

        <div className="account-section">
          <h2>Logout</h2>
          <p>Click below to securely log out of your account.</p>
          <button id="logoutBtn" className="btn" onClick={handleLogout}>
            <i className="ri-logout-box-r-line"></i> Logout
          </button>
        </div>
      </div>

      {editOpen && (
        <div id="editProfileModal" className="order-modal-overlay active">
          <div className="order-modal-card edit-profile-modal-card">
            <h2 className="edit-profile-title">Edit Profile</h2>
            <form id="editProfileForm" className="edit-profile-form" onSubmit={handleSave}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                placeholder="+49 170 1234567"
                value={form.phone}
                onChange={handleChange}
              />

              <label htmlFor="address">Delivery Address</label>
              <input
                type="text"
                id="address"
                placeholder="Street, City, Postal Code"
                value={form.address}
                onChange={handleChange}
              />

              <div className="edit-profile-actions">
                <button type="button" id="cancelEditBtn" className="btn btn-secondary" onClick={() => setEditOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}