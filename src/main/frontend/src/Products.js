import React, { useEffect, useState } from 'react';
import './Products.css';

const Products = ({ addToCart }) => {
  // State for products, loading, error, and confirmation message
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(''); // State for confirmation message

  // Fetch products from the backend
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

  // Handle add to cart with confirmation message
  const handleAddToCart = (product) => {
    addToCart(product);
    setMessage("Item added to cart!");
    setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
  };

  // Display error if there's an error
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Display loading message if still loading
  if (loading) {
    return <p>Loading products...</p>;
  }

  // Display message if no products are available
  if (products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="products">
      <h2>Our Flower Collection</h2>
      {message && <p className="confirmation-message">{message}</p>} {/* Confirmation message */}
      <div className="product-grid">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <img src={product.img} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
