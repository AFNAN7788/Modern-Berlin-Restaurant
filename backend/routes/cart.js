const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { readData, writeData } = require('../utils/storage');

// Get user's cart
router.get('/', auth, (req, res) => {
  const userId = req.user.id;
  const carts = readData('carts');
  const cart = carts.find((c) => c.userId === userId);

  if (!cart || !cart.items.length) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  res.json(cart);
});

// Add item to cart or update quantity
router.post('/', auth, async (req, res) => {
  const userId = req.user.id;
  const { productId, name, price, quantity } = req.body;

  const carts = readData('carts');
  let cart = carts.find((c) => c.userId === userId);

  if (!cart) {
    cart = { userId, items: [] };
    carts.push(cart);
  }

  const itemIndex = cart.items.findIndex((item) => item.productId === productId);

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ productId, name, price, quantity });
  }

  await writeData('carts', carts);
  res.status(200).json(cart);
});

// Remove item from cart
router.delete('/:productId', auth, async (req, res) => {
  const userId = req.user.id;
  const carts = readData('carts');
  const cart = carts.find((c) => c.userId === userId);

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  cart.items = cart.items.filter((item) => item.productId !== req.params.productId);
  await writeData('carts', carts);
  res.json(cart);
});

module.exports = router;