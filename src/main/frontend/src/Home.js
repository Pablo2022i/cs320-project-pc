import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import { API_URL } from './config';

const Home = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Check if user is signed in
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    navigate('/login'); // Redirect to login page after sign out
  };

  const handleSubmitName = async (e) => {
    e.preventDefault();

    if (!name || name.trim() === '') {
      setErrorMessage('First name is required and cannot be blank.');
      return;
    }
    if (!lastName || lastName.trim() === '') {
      setErrorMessage('Last name is required and cannot be blank.');
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      setErrorMessage('Phone number must be exactly 10 digits.');
      return;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!message || message.trim() === '') {
      setErrorMessage('Message is required and cannot be blank.');
      return;
    }

    const formData = { name, lastName, phone, email, message };

    try {
      const response = await fetch(`${API_URL}/hello/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Your information has been submitted successfully!');
        setName('');
        setLastName('');
        setPhone('');
        setEmail('');
        setMessage('');
        setErrorMessage('');
      } else if (response.status === 400) {
        const error = await response.json();
        setErrorMessage(error.message || 'Invalid submission.');
      } else {
        setErrorMessage('An error occurred while submitting your information.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while submitting your information.');
    }
  };

  return (
    <div className='home'>
      <h2>Welcome to Eternal Flowers</h2>
      <p>Handcrafted creations that last a lifetime.</p>
      <img src='/assets/images/eternal-flowers.jpg' alt="Eternal Flowers" className="home-image" />

      <div className="shop-now-button">
        <button>
          <Link to="/Products">Shop Now</Link>
        </button>
      </div>

      <section className="featured-products">
        <h2>Featured Flowers</h2>
        <div className="product-grid">
          <div className="product">
            <img src="/assets/images/rose.png" alt="Handmade Rose" />
            <h3>Handmade Rose</h3>
            <p>$10.00</p>
            <button>Add to Cart</button>
          </div>
        </div>
      </section>

      {/* Sign-Out Button */}
      {isLoggedIn && (
        <div style={{ marginTop: '20px' }}>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}

      {/* Contact Us Form */}
      <h2>Contact Us</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmitName}>
        <input
          type="text"
          placeholder="First Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          type="text"
          placeholder="Phone (10 digits)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          pattern="\d{10}"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={{ width: '25%', height: '100px', marginTop: '10px', marginBottom: '20px' }}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;
