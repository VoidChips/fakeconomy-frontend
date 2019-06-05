import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
// import Buy from './components/Buy/Buy';
// import Sell from './components/Sell/Sell';
import About from './components/About/About';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {page_section: 'about'}
  }

  render() {
    const {page_section} = this.state;
    return (
      <div className="App">
        <h1>Fakeconomy</h1>
        <Navbar />
        {page_section === 'about' ? <About />
        : <h2>Loading...</h2>
        }
      </div>
    );
  }
}

export default App;
