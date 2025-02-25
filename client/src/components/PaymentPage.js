import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentPage.css';

function PaymentPage() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  const [upiId, setUpiId] = useState('');

  // Handle payment option change
  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
    setCardDetails({ number: '', expiry: '', cvv: '' }); // Reset card details
    setUpiId(''); // Reset UPI ID
  };

  // Handle input change for card details
  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  // Handle input change for UPI ID
  const handleUpiChange = (e) => {
    setUpiId(e.target.value);
  };

  // Validate card details (basic validation)
  const isCardValid = () => {
    return (
      cardDetails.number.length === 16 && 
      /^\d{2}\/\d{2}$/.test(cardDetails.expiry) && 
      cardDetails.cvv.length === 3
    );
  };

  // Validate UPI ID (basic validation)
  const isUpiValid = () => upiId.includes('@') && upiId.length > 5;

  // Enable Place Order Button only when required details are entered
  const isFormValid = () => {
    if (paymentMethod === "Credit Card" || paymentMethod === "Debit Card") {
      return isCardValid();
    } else if (paymentMethod === "UPI") {
      return isUpiValid();
    } else if (paymentMethod === "Cash on Delivery") {
      return true;
    }
    return false;
  };

  // Handle order placement
  const handlePlaceOrder = () => {
    alert(`🎉 Order Placed Successfully using ${paymentMethod}!`);
    navigate('/'); // Redirect to Home Page after order placement
  };

  return (
    <div className="payment-page">
      <h2>💳 Payment Details</h2>
      <form className="payment-form">
        {/* Payment Options */}
        <label>
          <input 
            type="radio" 
            value="Credit Card" 
            checked={paymentMethod === "Credit Card"} 
            onChange={handlePaymentChange} 
          />
          Credit Card
        </label>

        <label>
          <input 
            type="radio" 
            value="Debit Card" 
            checked={paymentMethod === "Debit Card"} 
            onChange={handlePaymentChange} 
          />
          Debit Card
        </label>

        <label>
          <input 
            type="radio" 
            value="UPI" 
            checked={paymentMethod === "UPI"} 
            onChange={handlePaymentChange} 
          />
          UPI (Google Pay, PhonePe, Paytm)
        </label>

        <label>
          <input 
            type="radio" 
            value="Cash on Delivery" 
            checked={paymentMethod === "Cash on Delivery"} 
            onChange={handlePaymentChange} 
          />
          Cash on Delivery
        </label>

        {/* Card Details Section */}
        {(paymentMethod === "Credit Card" || paymentMethod === "Debit Card") && (
          <div className="card-details">
            <label>Card Number</label>
            <input 
              type="text" 
              name="number" 
              placeholder="Enter 16-digit card number" 
              value={cardDetails.number} 
              onChange={handleCardChange}
              maxLength="16"
            />
            <label>Expiry Date (MM/YY)</label>
            <input 
              type="text" 
              name="expiry" 
              placeholder="MM/YY" 
              value={cardDetails.expiry} 
              onChange={handleCardChange}
              maxLength="5"
            />
            <label>CVV</label>
            <input 
              type="password" 
              name="cvv" 
              placeholder="CVV (3 digits)" 
              value={cardDetails.cvv} 
              onChange={handleCardChange}
              maxLength="3"
            />
          </div>
        )}

        {/* UPI ID Section */}
        {paymentMethod === "UPI" && (
          <div className="upi-details">
            <label>Enter UPI ID</label>
            <input 
              type="text" 
              placeholder="example@upi" 
              value={upiId} 
              onChange={handleUpiChange}
            />
          </div>
        )}
      </form>

      {/* Place Order Button */}
      <button 
        className="place-order-btn" 
        onClick={handlePlaceOrder} 
        disabled={!isFormValid()} // Check form validation before enabling the button
      >
        🛒 Place Order
      </button>
    </div>
  );
}

export default PaymentPage;
