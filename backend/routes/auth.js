const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { readData, writeData } = require('../utils/storage');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const users = readData('users');

    const existing = users.find((u) => u.email === email);
    if (existing) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      id: String(Date.now()),
      name,
      email,
      password: hashedPassword,
    };

    users.push(newUser);
    await writeData('users', users);

    const payload = {
      user: {
        id: newUser.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'supersecretjwtkey',
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          success: true,
          message: 'User registered successfully',
          token,
          user: { id: newUser.id, name: newUser.name, email: newUser.email },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = readData('users');

    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'supersecretjwtkey',
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          message: 'Logged in successfully',
          token,
          user: { id: user.id, name: user.name, email: user.email },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update profile (name, email, password)
async function handleUpdate(req, res) {
  try {
    const { currentEmail, name, email, password } = req.body;
    const users = readData('users');

    const user = users.find((u) => u.email === currentEmail);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (email && email !== currentEmail) {
      const existing = users.find((u) => u.email === email);
      if (existing) {
        return res.status(400).json({ success: false, message: 'Email is already in use' });
      }
      user.email = email;
    }

    if (name) {
      user.name = name;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await writeData('users', users);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
}

// Register handler for both PUT and POST to be tolerant to clients
router.put('/update', handleUpdate);
router.post('/update', handleUpdate);

module.exports = router;