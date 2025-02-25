// Navbar.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ onAboutClick, cartItems }) {
  const [showContact, setShowContact] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isLoggedIn = user.isLoggedIn;

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" }); // Dispatch logout action
    navigate("/"); // Redirect to home page on logout
  };

  const handleAboutClick = () => {
    navigate("/"); // Redirect to home
    setTimeout(() => {
      onAboutClick(); // Call the scroll function after redirecting
    }, 0);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile); // Toggle profile visibility
  };

  return (
    <nav className="navbar">
      <h1>Food Hub</h1>
      <ul>
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={handleAboutClick}>About</li>
        <li onClick={() => setShowContact(!showContact)}>Contact</li>
        <li className="cart-icon" onClick={() => navigate("/cart")}> 🛒 Cart ({cartItems}) </li>
        
        {isLoggedIn ? (
          <>
            <li onClick={toggleProfile}>Profile</li>
            <li onClick={handleLogout}>Logout</li>
          </>
        ) : (
          <>
            <li onClick={() => navigate("/login")}>🔑 Login</li>
            <li onClick={() => navigate("/register")}>Register</li>
          </>
        )}
      </ul>

      {showContact && (
        <div className="contact-details">
          <h3>Contact Us</h3>
          <p><strong>Phone:</strong> +1 (000) 12345667</p>
          <p><strong>Email:</strong> ganjisaiteja123456@gmail.com</p>
          <p><strong>Address:</strong> 123 Food St, Food Hub, FC 12345</p>
        </div>
      )}

      {showProfile && isLoggedIn && (
        <div className="profile-details">
          <h3>Profile</h3>
          <p><strong>Email:</strong> {user.user?.email}</p>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
