import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ cartCount, setCartItems }) => {
  const userData = localStorage.getItem('user');
  let user = null;

  if (userData) {
    try {
      user = JSON.parse(userData);
    } catch (error) {
      console.error("Failed to parse user data from localStorage:", error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('userCart'); // Clear cart on logout
    setCartItems([]); // Clear in-memory cart items
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <nav className="navbar">
      <h1>Eternal Flowers</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li>
          <Link to="/cart">View Cart ({cartCount})</Link>
        </li>
        {user ? (
          <>
            <li className="profile-name">{user.firstName}</li>
            <li onClick={handleLogout} style={{ cursor: 'pointer', color: 'white' }}>Logout</li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
