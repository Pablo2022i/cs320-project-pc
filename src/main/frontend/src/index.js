import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './Home';
import Navbar from './Navbar';
import Products from './Products';
import Cart from './Cart';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Root = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('isLoggedIn'));
  const userId = JSON.parse(localStorage.getItem('user'))?.id; // Retrieve user ID from localStorage

  const [cartItems, setCartItems] = useState(() => {
    // Load cart from user-specific key if logged in
    if (isLoggedIn && userId) {
      const savedCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      console.log("Loaded saved cart for user:", savedCart); // Debug log
      return savedCart;
    }
    return [];
  });

  const [cartCount, setCartCount] = useState(() =>
    cartItems.reduce((total, item) => total + item.quantity, 0)
  );

  useEffect(() => {
    // Update cart count based on cartItems array
    setCartCount(cartItems.reduce((total, item) => total + item.quantity, 0));
    
    // Save cartItems in localStorage 
    if (isLoggedIn && userId) {
      console.log("Saving cart for user:", cartItems); // Debug log
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
    }
  }, [cartItems, isLoggedIn, userId]);

  const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      const existingProduct = prevCartItems.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCartItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleLogout = () => {
    // Save the current cart to localStorage under the user-specific key
    if (userId) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
    }
    // Clear login state and cart items
    setIsLoggedIn(false);
    setCartItems([]);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
  };

  useEffect(() => {
    // Load the cart again if the login status or user ID changes
    if (isLoggedIn && userId) {
      const savedCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      setCartItems(savedCart);
      console.log("User signed in, loading saved cart:", savedCart); // Debug log
    }
  }, [isLoggedIn, userId]);

  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} setCartItems={setCartItems} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<App setCartCount={setCartCount} cartItems={cartItems} setCartItems={setCartItems} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/Products" element={<Products setCartCount={setCartCount} addToCart={addToCart} cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/Cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="*" element={<Home />} /> 
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
