import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  // Email validation function
  const validateEmail = (email) => {
    return email.includes('@');
  };

  // Password validation function
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  // Handle login form submission
  const handleLogin = async (event) => {
    event.preventDefault();

    // Custom validation for email and password
    if (!validateEmail(email)) {
      setMessage("Please enter a valid email with '@'.");
      setMessageType("error");
      return;
    }

    if (!validatePassword(password)) {
      setMessage("Your email or password might be wrong.");
      setMessageType("error");
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

  return (
    <div className="container">
      <h1>Welcome to Eternal Flowers</h1>
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
  );
}

export default App;
