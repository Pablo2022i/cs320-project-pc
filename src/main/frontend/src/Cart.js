import React, { useState } from 'react';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([{ name: 'Rose', quantity: 1, price: 10 }]);

  const handleRemove = (itemName) => {
    const updatedCart = cartItems.filter(item => item.name !== itemName);
    setCartItems(updatedCart);
  };

  return (
    <div className='cart'>
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map(item => (
            <li key={item.name}>
              {item.name} - ${item.price} x {item.quantity}
              <button onClick={() => handleRemove(item.name)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <button>Proceed to Checkout</button>
    </div>
  );
};

export default Cart;
