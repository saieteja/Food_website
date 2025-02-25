require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./auth'); // Import authentication routes
const routes = require('./routes'); // Import cart routes

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "your-mongodb-uri-here";

// Middleware
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000", "http://192.168.31.172:3000"] })); // Allow frontend requests from both origins

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Cart Schema
const cartSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number
});

const Cart = mongoose.model('Cart', cartSchema);

// Cart Routes
app.get('/cart', async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart data" });
  }
});

app.post('/cart', async (req, res) => {
  try {
    const newItem = new Cart(req.body);
    await newItem.save();
    res.json({ message: 'Item added to cart' });
  } catch (err) {
    res.status(500).json({ error: "Failed to add item" });
  }
});

app.delete('/cart/:id', async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove item" });
  }
});

// Use the authentication and cart routes
app.use('/api/auth', authRoutes); // Prefix auth routes with /api/auth
app.use('/api/cart', routes); // Prefix cart routes with /api/cart

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
