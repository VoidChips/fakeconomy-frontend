import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import Buy from './components/Buy/Buy';
import Sell from './components/Sell/Sell';
import About from './components/About/About';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page_section: 'about',
      current_page_class: 'unselected',
      isSignedin: false,
      users: [
        {
          email: 'void@gmail.com',
          username: 'void',
          password: '123'
        }
      ]
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

  // get login info from login screen and change to buy screen if successful
  login = (username, password) => {
    const user_found = () => {
      for (let user of this.state.users) {
        if (user.username === username && user.password === password) {
          return true;
        }
      }
      return false;
    }
    if (user_found()) {
      this.setState({ isSignedin: true });
      this.updateSection('buy');
    }
    else {
      alert('No such user. Try again.');
    }
  }

  register = (email, username, password) => {
    const { users } = this.state;
    users.push({ email, username, password });
    this.setState({ isSignedin: true });
    this.updateSection('buy');
  }

  signOut = () => {
    this.setState({ isSignedin: false });
  }

  render() {
    const { page_section, current_page_class, isSignedin } = this.state;

    // change section based on what page_section is
    const changeSection = () => {
      switch (page_section) {
        case 'about':
          return <About />
        case 'buy':
          return <Buy />
        case 'sell':
          return <Sell />
        case 'login':
          return <Login login={this.login} />
        case 'register':
          return <Register register={this.register}/>
        default:
          return <h2>Loading...</h2>
      }
    }

    return (
      <div className="App">
        <h1>Fakeconomy</h1>
        <Navbar updateSection={this.updateSection} page_section={page_section} current_page_class={current_page_class} login={this.login} register={this.register} signOut={this.signOut} isSignedin={isSignedin} />

        {changeSection()}
      </div>
    );
  }
}

export default App;