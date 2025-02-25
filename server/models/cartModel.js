const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true }
});

// Prevent Overwrite Error
const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

module.exports = Cart;
