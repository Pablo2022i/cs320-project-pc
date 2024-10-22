import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className='nav'>
            <div className='nav-links'>
                <Link to="/Home">Home</Link>
                <Link to="Products">Products</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
}; 

export default Navbar;