import React, { Component } from 'react';
import './App.css';
import Nav from './components/Navbar.js';
import {BrowserRouter as Router} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container" style = {{marginTop: 30}}>
          <Nav/>
        </div>
      </Router>
    );
  }
}

export default App;
