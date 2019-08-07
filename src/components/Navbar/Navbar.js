import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar =
    ({ updateSection, page_section, current_page_class, signOut, isSignedin }) => {

        const selectCSS = (page) => {
            if (page === page_section) {
                return current_page_class;
            }
            else {
                return 'unselected';
            }
        }

        const showNotLoggedInState = () => {
            return (
                <div id='login-register'>
                    <Link
                        to='/login'
                        onClick={() => updateSection('/login')}
                        className={selectCSS('/login') + ' link'}
                    >Login</Link>
                    <Link
                        to='/register'
                        onClick={() => updateSection('/register')}
                        className={selectCSS('/register') + ' link'}
                    >Register</Link>
                </div>
            );
        }

        const showLoggedInState = () => {
            return (
                <div id='account-logout'>
                    <Link
                        to='/account'
                        onClick={() => updateSection('/account')}
                        className={selectCSS('/account') + ' link'}>Account</Link>
                    <p
                        onClick={() => signOut()}
                        className={selectCSS('logout') + ' link'}
                    >
                        Logout
                    </p>
                </div>
            );
        }

        return (
            <nav id='navbar' >
                <Link
                    to='/'
                    onClick={() => updateSection('/')}
                    className={selectCSS('/') + ' link'}>Buy</Link>
                <Link
                    to='/sell'
                    onClick={() => updateSection('/sell')}
                    className={selectCSS('/sell') + ' link'}>Sell</Link>
                <Link
                    to='/about'
                    onClick={() => updateSection('/about')}
                    className={selectCSS('/about') + ' link'}>About</Link>
                { // only show the login and register text when not logged in
                    !isSignedin ?
                        showNotLoggedInState()
                        :
                        // if logged in, show the account and logout text
                        showLoggedInState()
                }
            </nav >
        );
    }

export default Navbar;