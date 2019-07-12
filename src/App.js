import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import Buy from './components/Buy/Buy';
import Sell from './components/Sell/Sell';
import About from './components/About/About';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Account from './components/Account/Account';
import links from './links';
import './App.css';
// for development, use links[0]
// for production, use links[1]
const link = links[0];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page_section: 'buy',
      current_page_class: 'selected-main',
      isSignedin: false,
      users: [],
      username: '',
      id: 0,
    }
  }

  // updates what part of the website the user is in
  updateSection = (section) => {
    this.setState({ page_section: section });

    if (section === 'login' || section === 'register') {
      this.setState({ current_page_class: 'selected-login-or-register' });
    }
    else if (section === 'account') {
      this.setState({ current_page_class: 'selected-logged-in' });
    }
    else {
      this.setState({ current_page_class: 'selected-main' });
    }
  }

  // get the users data from the server
  componentDidMount() {
    this.getUsers();
  }

  componentWillUpdate() {
    this.getUsers();
  }

  getUsers = async () => {
    // get usernames of verified accounts
    const response = await fetch(`${link}/users`);
    const data = await response.json();
    this.setState({ users: data });
  }

  // get login info from login screen and change to buy screen if successful
  login = (username, password) => {
    // check if user exists on the server
    fetch(`${link}/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'username': username,
        'password': password
      })
    })
      .then(response => response.json())
      .then(result => {
        // if id is a number
        if (!isNaN(result.id)) {
          this.setState({ isSignedin: true });
          this.setState({ username: username });
          this.setState({ id: result.id });
          this.updateSection('buy');
          this.getUsers();
        }
        else if (result.error === 'unverified') {
          alert('Check your email for the verification code.');
          // send email with new code
          this.verifyUser(username, true);
          // verify code
          this.verifyUser(username, false);
        }
        else if (result.error === 'not found') {
          alert('This user does not exist');
        }
        else {
          alert('Something went wrong. Try again.')
        }
      });
  }

  register = (email, username, password) => {
    // register if user doesn't exist
    fetch(`${link}/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': email,
        'username': username,
        'password': password
      })
    })
      .then(response => response.json())
      .then(result => {
        // check if the response is a number
        if (result.result === 'user registered') {
          this.login(username, password);
        }
        else if (result.result === 'user already exists') {
          alert('User already exists');
        }
        else {
          alert('Something went wrong. Try again.');
        }
      });
  }

  verifyUser = (username, isNewCodeRequest) => {
    let code = '';
    if (isNewCodeRequest) {
      code = 'reset';
    }
    else {
      code = prompt('Enter the verification code below to verify your account. If not found in the inbox, try checking the spam folder.');
    }

    if (code !== '') {
      fetch(`${link}/verify`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'username': username,
          // if the code is 'new code', update the existing code
          // otherwise check for valid verification code
          'code': code
        })
      })
        .then(response => response.json())
        .then(result => {
          if (!isNewCodeRequest) {
            if (result.verified === 'true') {
              alert('Your account was verified!');
            }
            else if (result.verified === 'false') {
              alert('The verification code was incorrect.');
            }
            else {
              alert('Something went wrong. Try again.');
            }
          }
          else {
            if (result.result !== 'new code') {
              alert('Something went wrong. Try again.');
            }
          }
        })
    }
    else {
      alert('The input cannot be blank.')
    }
  }

  signOut = () => {
    this.setState({ isSignedin: false });
    this.updateSection('about');
  }

  render() {
    const { page_section, current_page_class, isSignedin, username, users, id } = this.state;

    // change section based on what page_section is
    const changeSection = () => {
      switch (page_section) {
        case 'about':
          return <About users={users} />
        case 'buy':
          return <Buy isSignedin={isSignedin} username={username} id={id} link={link} />
        case 'sell':
          return <Sell isSignedin={isSignedin} id={id} link={link} />
        case 'login':
          return <Login login={this.login} />
        case 'register':
          return <Register register={this.register} />
        case 'account':
          return <Account id={id} link={link} signOut={this.signOut} />
        default:
          return <h2>Loading...</h2>
      }
    }

    return (
      <div>
        <h1>Fakeconomy</h1>
        <Navbar updateSection={this.updateSection} page_section={page_section} current_page_class={current_page_class} login={this.login} register={this.register} signOut={this.signOut} isSignedin={isSignedin} />
        <div id="content">
          <div></div>
          <div>
            {changeSection()}
          </div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default App;