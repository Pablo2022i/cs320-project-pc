import React, { useState, useEffect } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import Products from './Products';
import Home from './Home'; // Import Home component for signed-in view

function App({ setCartCount }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]); // Initialize cartItems here
  const navigate = useNavigate();

  // Email and password validation functions
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  // Function to initialize cart based on login status
  const initializeCart = () => {
    if (isLoggedIn) {
      const userCart = JSON.parse(localStorage.getItem('userCart')) || [];
      setCartItems(userCart);
      setCartCount(userCart.reduce((total, item) => total + item.quantity, 0));
    } else {
      setCartItems([]);
      setCartCount(0);
    }
  };

  useEffect(() => {
    initializeCart();
  }, [isLoggedIn]);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email with '@'.");
      setMessageType("error-message");
      return;
    }

    if (!validatePassword(password)) {
      setMessage("Password must be at least 8 characters long and include a number and special character.");
      setMessageType("error-message");
      return;
    }

    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('user', JSON.stringify(data.user));
        setMessage("Login successful!");
        setMessageType('success');
        setIsLoggedIn(true);

        const userCart = JSON.parse(localStorage.getItem('userCart')) || [];
        setCartItems(userCart);
        setCartCount(userCart.reduce((total, item) => total + item.quantity, 0));

        setTimeout(() => {
          navigate('/Home'); // Redirect directly to home page
        }, 1000);
      } else {
        setMessage("Invalid credentials. Please try again.");
        setMessageType('error');
      }
    } catch (error) {
      setMessage("Server error. Please try again later.");
      setMessageType('error');
    }

    setTimeout(() => setMessage(''), 5000);
  };

  return (
    <div className="container">
      <h1>Welcome to Eternal Flowers</h1>
      {!isLoggedIn ? (
        <div>
          <p>Sign in to save your cart and enjoy personalized shopping!</p>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
            {message && (
              <p className={messageType === 'success' ? 'success-message' : 'error-message'}>
                {message}
              </p>
            )}
            <div className="link-group">
              <span>Don’t have an account? <span onClick={() => navigate('/register')} className="highlight-link">Register now</span></span>
              <span onClick={() => navigate('/ForgotPassword')} className="link">Recover Account</span>
            </div>
          </form>
        </div>
      ) : (
        <Home /> // Show Home component if user is signed in
      )}
    </div>
  );
}

export default App;
