import React from 'react';
import './Cart.css';

const Cart = ({ cartItems = [], setCartItems }) => {
  const handleRemove = (productId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCartItems);

    // Update localStorage if the user is logged in
    if (localStorage.getItem('isLoggedIn')) {
      localStorage.setItem('userCart', JSON.stringify(updatedCartItems));
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <p>Total: ${calculateTotal()}</p>
          <button>Proceed to Checkout</button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
