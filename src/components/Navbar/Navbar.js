import React from 'react';
// import Login from './Login/Login';
// import Register from './Register/Register';
import './Navbar.css';

const Navbar = ({ updateSection, page_section, current_page_class, signIn, isSignedin }) => {

    const selectCSS = (page) => {
        if (page === page_section) {
            return current_page_class;
        }
        else {
            return 'unselected';
        }
    }

    return (
        <nav id='navbar'>
            <ul id='main-content'>
                <li
                    
                    onClick={() => updateSection('buy')}              
                    className={selectCSS('buy')}
                >Buy</li>
                <li
                    
                    onClick={() => updateSection('sell')}
                    className={selectCSS('sell')}
                >Sell</li>
                <li
                    
                    onClick={() => updateSection('about')}
                    className={selectCSS('about')}
                >About</li>
            </ul>
            {
                !isSignedin ?
                    <ul id='login'>
                        <li onClick={signIn}>Login</li>
                        <li onClick={signIn}>Register</li>
                    </ul>
                    :
                    <p>Signed in</p>

            }

        </nav>
    );
}

export default Navbar;