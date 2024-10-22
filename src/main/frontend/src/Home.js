import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => (
  <div className='home'>
    <h2>Welcome to Eternal Flowers</h2>
    <p>Handcrafted creations that last a lifetime.</p>
    <img src='/assets/images/eternal-flowers.jpg' alt="Eternal Flowers" className="home-image" />
    
    <div className="shop-now-button">
      <button>
        <Link to="/Products">Shop Now</Link>
      </button>
    </div>

    <section className="featured-products">
      <h2>Featured Flowers</h2>
      <div className="product-grid">
        <div className="product">
          <img src="/assets/images/rose.png" alt="Handmade Rose" />
          <h3>Handmade Rose</h3>
          <p>$10.00</p>
          <button>Add to Cart</button>
        </div>
      </div>
    </section>
  </div>
);

export default Home;
