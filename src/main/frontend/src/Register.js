import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');
  const [messageClass, setMessageClass] = useState(''); // To manage message styling
  
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Custom validation for each field
    if (!firstName) {
      setMessage("Please enter your first name.");
      setMessageClass("error-message");
      return;
    }
    if (!lastName) {
      setMessage("Please enter your last name.");
      setMessageClass("error-message");
      return;
    }
    if (!email.includes('@')) {
      setMessage("Please enter a valid email with '@'.");
      setMessageClass("error-message");
      return;
    }
    if (!validatePassword(password)) {
      setMessage("Password must be at least 8 characters long and include a number and special character.");
      setMessageClass("error-message");
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
        setMessage("Account created successfully!");
        setMessageClass("success-message");
        setTimeout(() => navigate('/'), 1000);
      } else {
        setMessage((data && data.message) || "Registration failed.");
        setMessageClass("error-message");
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      setMessageClass("error-message");
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
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>

      {message && <p className={messageClass}>{message}</p>}
      <div>
        <span>Already have an account? </span>
        <span className="login-link" onClick={() => navigate('/')}>
          <span className="highlight">Log in here</span>
        </span>
      </div>
    </div>
  );
};

export default Register;
