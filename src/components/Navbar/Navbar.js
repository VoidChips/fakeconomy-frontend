import React from 'react';
import './Navbar.css';

const Navbar =
    ({ updateSection, page_section, current_page_class, login, register, signOut, isSignedin }) => {

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
                <ul id='login-register'>
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

        return (
            <nav id='navbar' >
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
                { // only show the login and register text when not logged in
                    !isSignedin ?
                        showNotLoggedInState()
                        :
                        <p onClick={signOut}>Logout</p >

                }

            </nav >
        );
    }

export default Navbar;