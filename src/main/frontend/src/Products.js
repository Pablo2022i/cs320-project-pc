import React from 'react';
import './Products.css';

const Products = () => (
  <div className='products'>
    <h2>Our Flower Collection</h2>
    <div className='product-grid'>
      <div className='product'>
        <img src='/assets/images/rose.jpg' alt="Rose" />
        <h3>Rose</h3>
        <p>$10</p>
        <button>Add to Cart</button>
      </div>
      <div className='product'>
        <img src='/assets/images/tulip.jpg' alt="Tulip" />
        <h3>Tulip</h3>
        <p>$12</p>
        <button>Add to Cart</button>
      </div>
    </div>
  </div>
);

export default Products;
