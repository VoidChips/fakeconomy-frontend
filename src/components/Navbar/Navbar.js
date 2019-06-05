import React from 'react';
// import Login from './Login/Login';
// import Register from './Register/Register';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav id='navbar'>
            <ul id='main-content'>
                <li>Buy</li>
                <li>Sell</li>
                <li>About</li>

            </ul>
            <ul id='login'>
                <li>Login</li>
                <li>Register</li>
            </ul>
        </nav>
    );
}

export default Navbar;