import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(''); // Change to track login status
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://food-hub-6.onrender.com/api/auth/login`, {
        email,
        password,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: { email } }); // Dispatch login action
      setLoginStatus('Yes'); // Set status to 'Yes' on successful login
      navigate("/"); // Redirect to home page after login
    } catch (error) {
      setLoginStatus('No'); // Set status to 'No' on failed login
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
      {loginStatus && <p className="status-message">{loginStatus}</p>} {/* Display 'Yes' or 'No' */}
    </div>
  );
};

export default LoginPage;
