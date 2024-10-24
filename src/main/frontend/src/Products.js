import React, { useEffect, useState } from 'react';
import './Products.css';

const Products = ({ addToCart }) => {
  // Use state to hold products fetched from the backend
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors

  // Fetch products from the backend 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products'); // Replace with the actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data); // Set the products in state
        setLoading(false); // Stop loading
      } catch (error) {
        setError(error.message); // Set the error state
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, []);

  // If there's an error, display the error message
  if (error) {
    return <p>Error: {error}</p>;
  }

  // If loading is still true, show a loading message
  if (loading) {
    return <p>Loading products...</p>;
  }

  // If there are no products, show a message indicating the list is empty
  if (products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="products">
      <h2>Our Flower Collection</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <img src={product.img} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
