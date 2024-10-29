import React, { useState } from 'react';
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
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existingProduct = cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Home" element={<Home />} /> 
        <Route path="/Products" element={<Products addToCart={addToCart} />} /> {/* Pass addToCart */}
        <Route path="/Cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} /> {/* Pass cart state */}
        <Route path="/register" element={<Register />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
