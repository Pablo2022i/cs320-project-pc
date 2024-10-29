import React, { useState, useEffect } from 'react';
import './Products.css';

const Products = ({ setCartCount, isLoggedIn, cartItems, setCartItems }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const currentCartItems = Array.isArray(cartItems) ? cartItems : []; // Ensure cartItems is an array

    // Check if the item is already in the cart
    const existingItem = currentCartItems.find(item => item.id === product.id);

    let updatedCart;
    if (existingItem) {
      // Update quantity if item is already in the cart
      updatedCart = currentCartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // Add new item to the cart
      updatedCart = [...currentCartItems, { ...product, quantity: 1 }];
    }

    setCartItems(updatedCart); // Update cart items
    setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0)); // Update cart count

    if (isLoggedIn) {
      localStorage.setItem('userCart', JSON.stringify(updatedCart));
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="products">
      <h2>Our Flower Collection</h2>
      <div className="product-grid">
        {products.map(product => (
          <div className="product" key={product.id}>
            <img src={product.img} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
