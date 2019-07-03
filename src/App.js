import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import Buy from './components/Buy/Buy';
import Sell from './components/Sell/Sell';
import About from './components/About/About';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
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
    if (section !== 'login' && section !== 'register') {
      this.setState({ current_page_class: 'selected-main' });
    }
    else {
      this.setState({ current_page_class: 'selected-login-or-register' });
    }
  }

  // get the users data from the server
  async componentDidMount() {
    // get usernames
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
        }
        else if (result.result === 'not found') {
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
        if (!isNaN(result.result)) {
          // after register, login to get user id
          const id = result.result;
          const code_input = prompt('Verification code was send to your email. Enter below to verify your account. If not found in the inbox folder, try checking the spam folder.');
          this.verifyUser(id, code_input, username, password);
        }
        else if (result.result === 'user already exists') {
          alert('User already exists. Try entering a different email or username');
        }
        else {
          alert('Something went wrong. Try again.');
        }
      });
  }

  verifyUser = (id, code, username, password) => {
    // check for valid verification code
    fetch(`${link}/verify`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'id': id,
        'code': code
      })
    })
      .then(response => response.json())
      .then(verified => {
        if (verified.verified === 'true') {
          this.componentDidMount();
          this.login(username, password);
        }
        else if (verified.verified === 'false') {
          alert('The verification code is incorrect');
        }
        else {
          alert('Something went wrong. Try again.');
        }
      })
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
          return <Sell />
        case 'login':
          return <Login login={this.login} />
        case 'register':
          return <Register register={this.register} />
        default:
          return <h2>Loading...</h2>
      }
    }

    return (
      <div>
        <h1>Fakeconomy</h1>
        <Navbar updateSection={this.updateSection} page_section={page_section} current_page_class={current_page_class} login={this.login} register={this.register} signOut={this.signOut} isSignedin={isSignedin} />

        {changeSection()}
      </div>
    );
  }
}

export default App;