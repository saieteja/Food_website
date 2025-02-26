import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import LoginPage from "./components/LoginPage";
import SearchBar from './components/SearchBar';
import ImageSlider from './components/ImageSlider';
import RestaurantList from './components/RestaurantList';
import RestaurantMenu from './components/RestaurantMenu';
import CartPage from './components/CartPage';
import PaymentPage from './components/PaymentPage';
import './App.css';

const API_URL = "https://food-website-6.onrender.com";

function App() {
  const aboutRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  // Fetch cart items on load
  useEffect(() => {
    fetch(`${API_URL}/cart`)
      .then(res => res.json())
      .then(data => setCart(data))
      .catch(err => console.error("Error fetching cart:", err));
  }, []);

  // Add item to cart
  const addToCart = (item) => {
    fetch(`${API_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    })
    .then(res => res.json())  // Ensure we get the saved item from backend
    .then(savedItem => setCart([...cart, savedItem]))
    .catch(err => console.error("Error adding item to cart:", err));
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    fetch(`${API_URL}/cart/${id}`, { method: "DELETE" })
    .then(() => setCart(cart.filter(item => item._id !== id)))
    .catch(err => console.error("Error removing item from cart:", err));
  };

  const handleAboutClick = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar onAboutClick={handleAboutClick} cartItems={cart.length} />
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <Routes>
          <Route path="/" element={
            <>
              <ImageSlider />
              <RestaurantList searchTerm={searchTerm} />
              <section ref={aboutRef} className="about-section">
                <h2>About Food Hub</h2>
                <p>Food Hub is a leading food e-commerce platform...</p>
              </section>
            </>
          } />
          <Route path="/restaurant/:restaurantName" element={<RestaurantMenu addToCart={addToCart} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage cartItems={cart} removeFromCart={removeFromCart} />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
