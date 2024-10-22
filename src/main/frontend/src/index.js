import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './Home';
import Navbar from './navbar';
import Products from './Products';
import Cart from './Cart';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/Home" element={<Home/>}/> 
      <Route path="/Products" element={<Products/>}/>
      <Route path="/Cart" element={<Cart/>}/>
      <Route path="*" element={<App />} /> 
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
