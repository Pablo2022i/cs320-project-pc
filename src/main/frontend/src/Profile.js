import React from 'react';
import './Profile.css';

const Profile = ({ user, cartItems }) => {
  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-info">
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Admin Status:</strong> {user.isAdmin ? "Admin" : "Regular User"}</p>
      </div>

      <h2>My Cart</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price.toFixed(2)} x {item.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Profile;
