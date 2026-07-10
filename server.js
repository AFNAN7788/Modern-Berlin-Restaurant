const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { readData, writeData } = require('./backend/utils/storage');

const app = express();
const port = Number(process.env.PORT) || 3000;

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const TIME_SLOTS = [
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
];

app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Name, email and password are required.' });
        }

        const users = readData('users');
        const existing = users.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
        if (existing) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { id: String(Date.now()), name, email, password: hashedPassword };
        users.push(newUser);
        writeData('users', users);

        const token = jwt.sign(
            { user: { id: newUser.id } },
            process.env.JWT_SECRET || 'supersecretjwtkey',
            { expiresIn: '1h' }
        );

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: { id: newUser.id, name: newUser.name, email: newUser.email }
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required.' });
        }

        const users = readData('users');
        const user = users.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { user: { id: user.id } },
            process.env.JWT_SECRET || 'supersecretjwtkey',
            { expiresIn: '1h' }
        );

        return res.json({
            success: true,
            message: 'Logged in successfully',
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.get('/api/bookings/slots', (req, res) => {
    const { date } = req.query;
    if (!date) {
        return res.status(400).json({ success: false, message: 'Date is required (YYYY-MM-DD)' });
    }

    const bookings = readData('bookings');
    const bookedSlots = bookings
        .filter((b) => b.date === date && b.status !== 'cancelled')
        .map((b) => b.time);
    const available = TIME_SLOTS.filter((slot) => !bookedSlots.includes(slot));

    return res.json({ success: true, date, available });
});

app.post('/api/bookings', (req, res) => {
    try {
        const { name, email, date, time, guests, specialRequests } = req.body;
        if (!name || !email || !date || !time || !guests) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, date, time and guests are required.'
            });
        }

        if (!TIME_SLOTS.includes(time)) {
            return res.status(400).json({ success: false, message: 'Invalid time slot.' });
        }

        const bookings = readData('bookings');
        const existing = bookings.find(
            (b) => b.date === date && b.time === time && b.status !== 'cancelled'
        );
        if (existing) {
            return res.status(409).json({
                success: false,
                message: 'This time slot is no longer available. Please choose another.'
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
            createdAt: new Date().toISOString()
        };
        bookings.push(booking);
        writeData('bookings', bookings);

        return res.status(201).json({ success: true, message: 'Table reserved successfully.', booking });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error.' });
    }
});

app.get('/api/bookings', (req, res) => {
    const { email } = req.query;
    const bookings = readData('bookings');
    let list = bookings.filter((b) => b.status !== 'cancelled');
    if (email) {
        list = list.filter((b) => b.email.toLowerCase() === String(email).toLowerCase());
    }
    return res.json({ success: true, bookings: list });
});

// Explicit routes for common pages MUST come before static middleware
const pages = ['booking', 'contact', 'cart', 'breakfast', 'Fastfood', 'dessert', 'main-dish', 'login', 'signup', 'account'];
pages.forEach(page => {
    app.get(`/${page}`, (req, res) => {
        const filePath = path.join(__dirname, `${page}.html`);
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error(`Error sending ${page}.html:`, err);
                res.status(404).send(`Page ${page} not found`);
            }
        });
    });
});

// Specific route for FAQ index
app.get('/FAQ 2/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'FAQ 2', 'index.html'));
});

// Serve static files from the current directory
app.use(express.static(path.join(__dirname), { extensions: ['html'] }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Frontend server running at http://localhost:${port}`);
});