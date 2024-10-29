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
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  const [cartItems, setCartItems] = useState(() => {
    // Load cart from userCart in localStorage if logged in
    if (isLoggedIn) {
      return JSON.parse(localStorage.getItem('userCart')) || [];
    } else {
      return [];
    }
  });

  const [cartCount, setCartCount] = useState(() => 
    cartItems.reduce((total, item) => total + item.quantity, 0)
  );

  useEffect(() => {
    // Update cart count based on cartItems array
    setCartCount(cartItems.reduce((total, item) => total + item.quantity, 0));
    
    // Only save cartItems in localStorage if user is logged in
    if (isLoggedIn) {
      localStorage.setItem('userCart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoggedIn]);

  const addToCart = (product) => {
    setCartItems(prevCartItems => {
      const existingProduct = prevCartItems.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCartItems.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCartItems, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} setCartItems={setCartItems} />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home is the default route */}
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<App setCartCount={setCartCount} cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/Products" element={<Products setCartCount={setCartCount} addToCart={addToCart} cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/Cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="*" element={<Home />} /> {/* Redirect unknown routes to Home */}
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
