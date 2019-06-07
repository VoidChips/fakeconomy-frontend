import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import Buy from './components/Buy/Buy';
import Sell from './components/Sell/Sell';
import About from './components/About/About';
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
          username: 'void',
          password: '123'
        }
      ]
    }
  }

  // updates what part of the website the user is in
  updateSection = (section) => {
    this.setState({ page_section: section });
    this.setState({ current_page_class: 'selected' });
  }

  signIn = () => {
    const username = prompt('Username:');
    const password = prompt('Password:');
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
    }
    else {
      alert('No such user. Try again.');
    }
  }

  register = () => {
    const username = prompt('Username:');
    const password = prompt('Password:');
    const { users } = this.state;
    users.push({ username, password });
    this.setState({ isSignedin: true });
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
        default:
          return <h2>Loading...</h2>
      }
    }
    return (
      <div className="App">
        <h1>Fakeconomy</h1>

        <Navbar updateSection={this.updateSection} page_section={page_section} current_page_class={current_page_class} signIn={this.signIn} register={this.register} signOut={this.signOut} isSignedin={isSignedin} />

        {changeSection()}
      </div>
    );
  }
}

export default App;