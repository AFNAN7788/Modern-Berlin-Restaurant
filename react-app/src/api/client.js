// Centralized API client — single source of truth for all backend calls
// Fixes: duplicate API implementations between backend/routes and frontend/server.js

const API_BASE = '/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'x-auth-token': token } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(data.message || 'Request failed');
    error.status = res.status;
    error.data = data;
    throw error;
  }
  return data;
}

export const authApi = {
  register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
};

export const bookingsApi = {
  getSlots: (date) => request(`/bookings/slots?date=${encodeURIComponent(date)}`),
  create: (payload) => request('/bookings', { method: 'POST', body: JSON.stringify(payload) }),
  getByEmail: (email) => request(`/bookings?email=${encodeURIComponent(email)}`),
};

export const cartApi = {
  get: () => request('/cart'),
  add: (payload) => request('/cart', { method: 'POST', body: JSON.stringify(payload) }),
  remove: (productId) => request(`/cart/${productId}`, { method: 'DELETE' }),
};

export const paymentsApi = {
  getConfig: () => request('/payments/config'),
  createPaymentIntent: (amount) =>
    request('/payments/create-payment-intent', { method: 'POST', body: JSON.stringify({ amount }) }),
};