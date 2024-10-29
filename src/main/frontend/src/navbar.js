import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    try {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className='nav'>
      <div className='nav-links'>
        <Link to="/Home">Home</Link>
        <Link to="/Products">Products</Link>
        <Link to="/Cart">Cart</Link>
        {user ? (
          <div className="dropdown">
            <span>Profile</span>
            <div className="dropdown-content">
              <p>{user.firstName} {user.lastName}</p>
              <p>{user.email}</p>
              <button onClick={handleSignOut}>Sign Out</button>
            </div>
          </div>
        ) : (
          <Link to="/">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
