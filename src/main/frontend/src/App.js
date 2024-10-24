import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  // Existing state for personalized greeting
  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState(''); 
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  // Personalized greeting
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const response = await fetch('/hello/personalized', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ first: firstName, last: lastName }),
    });

    const text = await response.text();
    setMessage(text);
  };

  const navigateToPage2 = () => {
    navigate('/Home');
  };

  return (
    <div className="container">
      <h1>Personalized Greeting</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>} 
      <br />
      <button onClick={navigateToPage2}>Home</button>
      <br />
      <button onClick={() => navigate('/Products')}>Shop Now</button> {/* Navigation to Products */}
      <br />
      <button onClick={() => navigate('/Cart')}>View Cart</button> {/* Navigation to Cart */}
    </div>
  );
}

export default App;
