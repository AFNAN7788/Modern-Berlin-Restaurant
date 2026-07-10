const router = require('express').Router();
const auth = require('../middleware/authMiddleware');

// In‑memory cart storage: { [userId]: { userId, items: [...] } }
const carts = {};

// Get user's cart
router.get('/', auth, (req, res) => {
  const userId = req.user.id;
  const cart = carts[userId];

  if (!cart || !cart.items.length) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  res.json(cart);
});

// Add item to cart or update quantity
router.post('/', auth, (req, res) => {
  const userId = req.user.id;
  const { productId, name, price, quantity } = req.body;

  if (!carts[userId]) {
    carts[userId] = { userId, items: [] };
  }

  const cart = carts[userId];
  const itemIndex = cart.items.findIndex((item) => item.productId === productId);

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ productId, name, price, quantity });
  }

  res.status(200).json(cart);
});

// Remove item from cart
router.delete('/:productId', auth, (req, res) => {
  const userId = req.user.id;
  const cart = carts[userId];

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  cart.items = cart.items.filter((item) => item.productId !== req.params.productId);
  res.json(cart);
});

module.exports = router;