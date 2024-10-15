import React, { useEffect, useState } from 'react';
import './App.css';

function App() { //useState variables
  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState(''); 
  const [message, setMessage] = useState(''); 

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

    return (
      <div className="container">
        <h1>Personalized Greeting</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} // Update first name
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} // Update last name
            required
          />
          <button type="submit">Submit</button>
        </form>
        {message && <p>{message}</p>} 
      </div>
    );
  }

export default App;
