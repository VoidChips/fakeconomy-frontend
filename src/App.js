import ReactGA from 'react-ga';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Buy from './components/Buy/Buy';
import Sell from './components/Sell/Sell';
import About from './components/About/About';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Account from './components/Account/Account';
import apis from './links';
import './App.css';
// for development, use links[0]
// for production, use links[1]
const api = apis[1];
// google analytics tracking
ReactGA.initialize('UA-141723318-1');
ReactGA.pageview('window.location.pathname + window.location.search');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page_section: window.location.pathname,
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

    if (section === '/login' || section === '/register') {
      this.setState({ current_page_class: 'selected-login-or-register' });
    }
    else if (section === '/account') {
      this.setState({ current_page_class: 'selected-logged-in' });
    }
    else {
      this.setState({ current_page_class: 'selected-main' });
    }
  }

  // get the users data from the server
  componentDidMount() {
    this.getUsers();
    // if the user didn't log out, login using cookies
    if (this.getCookie('username').search('null') === -1 && this.getCookie('id'.search('null') === -1)) {
      this.setState({ isSignedin: true });
      this.setState({ id: this.getCookie('id') });
      this.setState({ username: Number(this.getCookie('username')) });
    }
    // selects corrects css when the initial current_page_class is not selected-main
    this.updateSection(window.location.pathname);
  }

  getUsers = async () => {
    // get usernames of verified accounts
    const response = await fetch(`${api}/users`);
    const data = await response.json();
    this.setState({ users: data });
  }

  setCookie = (name, value) => {
    // get date
    const date = new Date();
    const year = date.getUTCFullYear();
    // the year the cookie will expire
    const nextYear = year + 1;
    // convert date to string
    let dateString = date.toDateString();
    const weekDate = dateString.substr(0, 3);
    const month = dateString.substr(4, 3);
    const dayOfMonth = dateString.substr(8, 2);
    // modify date to cookie expire date format
    dateString = dateString.replace(weekDate, `${weekDate},`);
    dateString = dateString.replace(dayOfMonth, month);
    dateString = dateString.replace(month, dayOfMonth);
    dateString = dateString.replace(year, nextYear);
    const expireDate = `${dateString} 23:59:59 GMT`;
    document.cookie = `${name}=${value} expires=${expireDate}`;
  }

  getCookie = (name) => {
    const cookie = document.cookie;
    // get the index where the name starts
    const indexStart = cookie.search(name);
    // get the index where the cookie ends
    const indexEnd = cookie.substr(indexStart).search('expires=');
    let value = '';
    // the first cookie won't have indexEnd
    if (indexEnd !== -1) {
      value = cookie.substr(indexStart, indexEnd);
    }
    else {
      value = cookie.substr(indexStart);
    }
    // return the cookie value
    return value.replace(`${name}=`, '');
  }

  deleteCookie = (name) => {
    // make the cookie expire
    document.cookie = `${name}=null expires=Mon, 01 Jan 1900 23:59:59 GMT`;
  }

  // listens to enter key
  keyPressed = (event, key) => {
    if (event.key === key) {
      return true;
    }
    return false;
  }

  // get login info from login screen and change to buy screen if successful
  login = (username, password) => {
    // check if user exists on the server
    fetch(`${api}/login`, {
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
          this.setCookie('id', this.state.id);
          this.setCookie('username', username);
          this.updateSection('/');
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
          alert('Invalid information. Try again');
        }
        else {
          alert('Invalid information. Try again.')
        }
      });
  }

  register = (email, username, password) => {
    // register if user doesn't exist
    fetch(`${api}/register`, {
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
      fetch(`${api}/verify`, {
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
    this.getUsers();
    // cookies turn invalid so the user have to login again
    this.deleteCookie('id');
    this.deleteCookie('username');
    this.setState({ id: 0 });
    this.setState({ username: '' });
    this.updateSection('/about');
  }

  render() {
    const { page_section, current_page_class, isSignedin, username, users, id } = this.state;

    // change section based on what page_section is
    const changeSection = () => {
      switch (page_section) {
        case '/':
          return <Buy isSignedin={isSignedin} username={username} id={id} api={api} />
        case '/sell':
          return <Sell isSignedin={isSignedin} id={id} api={api} keyPressed={this.keyPressed} />
        case '/about':
          return <About users={users} />
        case '/login':
          return <Login login={this.login} KeyPressed={this.keyPressed} />
        case '/register':
          return <Register register={this.register} KeyPressed={this.keyPressed} />
        case '/account':
          return <Account id={id} api={api} signOut={this.signOut} />
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
            <Route path='/' exact component={changeSection} />
            <Route path='/sell' component={changeSection} />
            <Route path='/about' component={changeSection} />
            <Route path='/login' component={changeSection} />
            <Route path='/register' component={changeSection} />
            <Route path='/account' component={changeSection} />
          </div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default App;