import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState(''); // Track registration status
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://food-hub-6.onrender.com/api/auth/register`, { // Update the URL as needed
        email,
        password,
      });
      setRegistrationStatus('Yes'); // Set status to 'Yes' on successful registration
      dispatch({ type: "REGISTER_SUCCESS", payload: { email } }); // Dispatch registration action
      navigate("/"); // Redirect to home page after registration
    } catch (error) {
      setRegistrationStatus('No'); // Set status to 'No' on failed registration
    }
  };

  return (
    <div className="login-page">
      <h2>📝 User Registration</h2>
      <form onSubmit={handleRegister} className="login-form">
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
        <button type="submit" className="login-btn">Register</button>
      </form>
      {registrationStatus && <p className="status-message">{registrationStatus}</p>} {/* Display 'Yes' or 'No' */}
    </div>
  );
};

export default Register;
