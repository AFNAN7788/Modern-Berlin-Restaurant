import { useState, useEffect } from 'react';
import { bookingsApi } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import '../styles/booking.css';

export default function BookingPage() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: '',
  });
  const [timeSlots, setTimeSlots] = useState([]);
  const [message, setMessage] = useState({ text: '', isError: false });
  const [myBookings, setMyBookings] = useState([]);
  const [showMyBookings, setShowMyBookings] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
      }));
      loadMyBookings(user.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadTimeSlots = async (date) => {
    if (!date) {
      setTimeSlots([]);
      return;
    }
    try {
      const data = await bookingsApi.getSlots(date);
      if (data.success && data.available) {
        setTimeSlots(data.available);
      } else {
        setTimeSlots([]);
      }
    } catch (err) {
      console.error('Failed to load slots:', err);
      setTimeSlots([]);
    }
  };

  const loadMyBookings = async (email) => {
    if (!email) return;
    try {
      const data = await bookingsApi.getByEmail(email);
      if (data.success && data.bookings && data.bookings.length > 0) {
        setMyBookings(data.bookings);
        setShowMyBookings(true);
      } else {
        setMyBookings([]);
        setShowMyBookings(false);
      }
    } catch (err) {
      console.error('Failed to load bookings:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'date') {
      loadTimeSlots(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ text: '', isError: false });

    try {
      const data = await bookingsApi.create(form);
      if (data.success) {
        setMessage({ text: 'Table reserved successfully. We\'ll send a confirmation to your email.', isError: false });
        showToast('Table reserved successfully!');
        setForm((prev) => ({
          ...prev,
          date: '',
          time: '',
          guests: '2',
          specialRequests: '',
        }));
        setTimeSlots([]);
        loadMyBookings(form.email);
      } else {
        setMessage({ text: data.message || 'Reservation failed.', isError: true });
      }
    } catch (err) {
      setMessage({ text: err.message || 'Network error. Is the server running?', isError: true });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="booking-page animate-in">
      <h1>Reserve a <span>Table</span></h1>
      <p className="subtitle">Choose your date, time and party size. We'll confirm your reservation.</p>

      <form id="bookingForm" className="booking-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Your name *</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="e.g. John Smith"
          value={form.name}
          onChange={handleChange}
        />

        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="john@example.com"
          value={form.email}
          onChange={handleChange}
        />

        <label htmlFor="date">Date *</label>
        <input
          type="date"
          id="date"
          name="date"
          required
          min={today}
          value={form.date}
          onChange={handleChange}
        />

        <label htmlFor="time">Time *</label>
        <select id="time" name="time" required value={form.time} onChange={handleChange}>
          <option value="">Select time</option>
          {timeSlots.length > 0 ? (
            timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))
          ) : (
            <option disabled>No slots available</option>
          )}
        </select>

        <label htmlFor="guests">Number of guests *</label>
        <select id="guests" name="guests" required value={form.guests} onChange={handleChange}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>
              {num}{num === 10 ? '+' : ''}
            </option>
          ))}
        </select>

        <label htmlFor="specialRequests">Special requests (optional)</label>
        <textarea
          id="specialRequests"
          name="specialRequests"
          placeholder="Dietary needs, high chair, etc."
          value={form.specialRequests}
          onChange={handleChange}
        />

        <button type="submit" id="submitBtn" disabled={submitting}>
          {submitting ? 'Reserving...' : 'Reserve table'}
        </button>
        {message.text && (
          <div id="bookingMessage" className={`booking-message ${message.isError ? 'error' : 'success'}`} role="alert">
            {message.text}
          </div>
        )}
      </form>

      {showMyBookings && (
        <section className="my-bookings" id="myBookingsSection">
          <h2>Your reservations</h2>
          <ul id="myBookingsList">
            {myBookings.map((b) => (
              <li key={b.id}>
                <strong>{b.date}</strong> at <strong>{b.time}</strong> – {b.guests} guest(s) – {b.name}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}