require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logger for debugging route matching
app.use((req, res, next) => {
  console.log('[REQ]', req.method, req.originalUrl);
  next();
});

// Routes (now in‑memory, no MongoDB/mongoose)
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const bookingsRoutes = require('./routes/bookings');
const paymentsRoutes = require('./routes/payments');

app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/payments', paymentsRoutes);

app.get('/', (req, res) => {
  res.send('API is running without MongoDB (in‑memory storage only).');
});

// Start the server locally
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;