import React, { useState, useEffect } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import Products from './Products';

function App({ setCartCount, cartItems, setCartItems }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('isLoggedIn'));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  useEffect(() => {
    if (isLoggedIn) {
      // Retrieve the current user's cart using their ID
      const user = JSON.parse(localStorage.getItem('user'));
      const userCart = JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];
      setCartItems(userCart);
      setCartCount(userCart.reduce((total, item) => total + item.quantity, 0));
    }
  }, [isLoggedIn, setCartCount, setCartItems]);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email with '@'.");
      setMessageType("error-message");
      return;
    }

    if (!validatePassword(password)) {
      setMessage("Your password or email might be incorrect.");
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
        console.log("Login successful. User data:", data.user); // Logging user data to verify admin status
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('user', JSON.stringify(data.user));
        setMessage("Login successful!");
        setMessageType('success');
        setIsLoggedIn(true);

        // Check if user is admin
        if (data.user.isAdmin === 1) {
          localStorage.setItem('isAdmin', 'true');
          setIsAdmin(true);
          console.log("Admin privileges granted."); // Log when admin status is set
        } else {
          localStorage.removeItem('isAdmin');
          setIsAdmin(false);
          console.log("No admin privileges for this user."); // Log for non-admin users
        }

        // Retrieve the user's cart using their ID
        const userCart = JSON.parse(localStorage.getItem(`cart_${data.user.id}`)) || [];
        setCartItems(userCart);
        setCartCount(userCart.reduce((total, item) => total + item.quantity, 0));

        setTimeout(() => navigate('/Home'), 1000);
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

  const handleSignOut = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && cartItems.length > 0) {
      // Save the user's cart before signing out
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartItems));
    }
    
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCartItems([]); // Clear cart items on sign-out
    setCartCount(0);  // Reset cart count
    localStorage.removeItem('isLoggedIn'); // Clear login status
    localStorage.removeItem('user'); // Clear user data
    localStorage.removeItem('isAdmin'); // Clear admin status
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
        <>
          <button onClick={handleSignOut}>Sign Out</button>
          <Products
            setCartCount={setCartCount}
            isLoggedIn={isLoggedIn}
            cartItems={cartItems}
            setCartItems={setCartItems}
            isAdmin={isAdmin} // Pass admin status to Products
          />
        </>
      )}
    </div>
  );
}

export default App;
