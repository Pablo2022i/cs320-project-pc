import React, { useState, useEffect } from 'react';
import './Products.css';
import { API_URL } from './config';

const Products = ({ setCartCount, isLoggedIn, cartItems, setCartItems, isAdmin }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products`);
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
    const existingItem = cartItems.find(item => item.id === product.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(updatedCart);
    setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0));
    if (isLoggedIn) {
      localStorage.setItem('userCart', JSON.stringify(updatedCart));
    }
  };

  const handleEditProduct = (product) => {
    console.log("Editing product:", product);
  };

  const handleAddNewProduct = () => {
    console.log("Adding a new product");
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="products">
      <h2>Our Flower Collection</h2>
      <div className="product-grid">
        {products.map(product => (
          <div className="product" key={product.id} style={{ position: 'relative' }}>
            <img src={product.img} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
            {isAdmin && (
              <button 
                onClick={() => handleEditProduct(product)} 
                className="edit-button"
                style={{ position: 'absolute', top: '10px', right: '10px' }}
              >
                Edit
              </button>
            )}
          </div>
        ))}
      </div>
      {isAdmin && (
        <button onClick={handleAddNewProduct} className="add-product-button">Add New Product</button>
      )}
    </div>
  );
};

export default Products;
