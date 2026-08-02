const router = require('express').Router();

const { readData, writeData } = require('../utils/storage');

// Time slots (restaurant opening hours, 30-min slots)
const TIME_SLOTS = [
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
];

// Get available time slots for a date
router.get('/slots', (req, res) => {
  const { date } = req.query;
  const bookings = readData('bookings');
  if (!date) {
    return res.status(400).json({ success: false, message: 'Date is required (YYYY-MM-DD)' });
  }
  const bookedSlots = bookings
    .filter((b) => b.date === date && b.status !== 'cancelled')
    .map((b) => b.time);
  const available = TIME_SLOTS.filter((t) => !bookedSlots.includes(t));
  res.json({ success: true, date, available });
});

// Create a booking
router.post('/', async (req, res) => {
  try {
    const { name, email, date, time, guests, specialRequests } = req.body;
    const bookings = readData('bookings');
    if (!name || !email || !date || !time || !guests) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, date, time and guests are required.',
      });
    }
    if (!TIME_SLOTS.includes(time)) {
      return res.status(400).json({ success: false, message: 'Invalid time slot.' });
    }
    const existing = bookings.find(
      (b) => b.date === date && b.time === time && b.status !== 'cancelled'
    );
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'This time slot is no longer available. Please choose another.',
      });
    }
    const booking = {
      id: String(Date.now()),
      name,
      email,
      date,
      time,
      guests: Number(guests) || 2,
      specialRequests: specialRequests || '',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    bookings.push(booking);
    await writeData('bookings', bookings);
    res.status(201).json({ success: true, message: 'Table reserved successfully.', booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Get all bookings (for admin or "my bookings" - optional: filter by email)
router.get('/', (req, res) => {
  const { email } = req.query;
  const bookings = readData('bookings');
  let list = bookings.filter((b) => b.status !== 'cancelled');
  if (email) list = list.filter((b) => b.email.toLowerCase() === email.toLowerCase());
  res.json({ success: true, bookings: list });
});

module.exports = router;
