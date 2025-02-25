const express = require('express');
const router = express.Router();
const auth = require('./authMiddleware'); // Auth middleware
const Cart = require('./models/cartModel'); // Cart model

// Protected route example
router.get('/protected-route', auth, (req, res) => {
  res.send('This is a protected route. You are authenticated!');
});

// Get all cart items
router.get('/', async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart data" });
  }
});

// Add item to cart
router.post('/', async (req, res) => {
  try {
    const newItem = new Cart(req.body);
    await newItem.save();
    res.json({ message: 'Item added to cart' });
  } catch (err) {
    res.status(500).json({ error: "Failed to add item" });
  }
});

// Delete cart item
router.delete('/:id', async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove item" });
  }
});

module.exports = router;
