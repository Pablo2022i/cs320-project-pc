import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email.includes('@') || password.length < 8) {
      setMessage("The email or password might be incorrect.");
      setMessageType('error');
      setTimeout(() => setMessage(''), 5000);
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
