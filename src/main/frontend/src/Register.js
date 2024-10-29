import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setMessage("Password must be at least 8 characters long and include a number and special character.");
      setTimeout(() => setMessage(''), 5000);
      return;
    }

    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      const data = await response.json().catch(() => null);
      if (response.ok) {
        setMessage("Registration successful!");
        setTimeout(() => {
          setMessage('');
          navigate('/');  // Redirect to login page
        }, 1000);
      } else {
        setMessage((data && data.message) || "Registration failed.");
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }

    setTimeout(() => setMessage(''), 5000);
  };

  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
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
        <button type="submit">Register</button>
      </form>

      {message && <p className="message">{message}</p>}
      <p className="login-link" onClick={() => navigate('/')}>Already have an account? Log in here</p>
    </div>
  );
};

export default Register;
