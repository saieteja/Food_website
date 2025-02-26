import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const BASE_URL = "http://192.168.31.172:5000"; // Your server's IP address
 // Change to your server's IP address

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      setMessage(response.data.message);
      dispatch({ type: "LOGIN_SUCCESS", payload: { email } }); // Dispatch login action
      navigate("/"); // Redirect to home page after login
    } catch (error) {
      setMessage(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <h2>🔑 User Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <label>Email:</label>
        <input 
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <label>Password:</label>
        <input 
          type="password" 
          placeholder="Enter your password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" className="login-btn">Login</button>
      </form>
      {message && <p className="message">{message}</p>} {/* Display message */}
    </div>
  );
};

export default LoginPage;
