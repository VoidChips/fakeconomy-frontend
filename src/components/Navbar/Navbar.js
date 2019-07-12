import React from 'react';
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
                <ul className='login-register'>
                    <li
                        onClick={() => updateSection('login')}
                        className={selectCSS('login')}
                    >
                        Login
                    </li>
                    <li
                        onClick={() => updateSection('register')}
                        className={selectCSS('register')}
                    >
                        Register
                    </li>
                </ul>
            );
        }

        const showLoggedInState = () => {
            return (
                <ul className='account-logout'>
                    <li
                        onClick={() => updateSection('account')}
                        className={selectCSS('account')}
                    >
                        Account
                    </li>
                    <li
                        onClick={() => signOut()}
                        className={selectCSS('logout')}
                    >
                        Logout
                    </li>
                </ul>
            );
        }

        return (
            <nav id='navbar' >
                <ul className='main-content'>
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