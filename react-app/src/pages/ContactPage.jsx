import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import '../styles/contact.css';

export default function ContactPage() {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Your query has been submitted! We will get back to you soon.');
    navigate('/');
  };

  return (
    <div className="page">
      <div className="image"></div>
      <div className="contactPage">
        <h1>Contact <span>Us</span></h1>
        <p>24/7 We will answer your questions and problems</p>
        <form className="form" onSubmit={handleSubmit}>
          <div className="names">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              required
              value={form.firstname}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              required
              value={form.lastname}
              onChange={handleChange}
            />
          </div>
          <div className="names">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              value={form.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              required
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div className="inputsDiv2">
            <textarea
              name="message"
              placeholder="Describe your issue (optional)"
              value={form.message}
              onChange={handleChange}
            />
          </div>
          <button type="submit" id="btn">Submit Queries</button>
        </form>
      </div>
      <div className="but">
        <button id="btn2" onClick={() => navigate('/')}>
          <i className="ri-close-line"></i>
        </button>
      </div>
    </div>
  );
}