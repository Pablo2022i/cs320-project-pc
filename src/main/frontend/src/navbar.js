import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <div>
                <Link to="/">Portal</Link>
                <span> </span>
                <Link to="/Home">Home</Link>
            </div>
        </nav>
    );
};  

export default Navbar;