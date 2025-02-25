import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

function CartPage({ cartItems, removeFromCart }) {
  const navigate = useNavigate();
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-page">
      <h2>🛍️ Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Start adding some delicious food! 🍕🍔</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id} className="cart-item">
                <img src={`/assets/${item.image}`} alt={item.name} />
                <span>{item.name} - ₹{item.price}</span>
                <button className="remove-btn" onClick={() => removeFromCart(item._id)}>➖</button>
              </li>
            ))}
          </ul>

          {/* Total Amount Section */}
          <div className="cart-total">
            <h3>Total: ₹{totalAmount}</h3>
          </div>

          {/* Proceed to Buy Button */}
          <button className="checkout-btn" onClick={() => navigate('/payment')}>
            🛒 Proceed to Buy
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;
