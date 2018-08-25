import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Battle from './Battle.js';
import Home from './Home.js';
import Popular from './Popular.js';

class Navbar extends React.Component {
  render() {
    return (
      <Router>
        <div className = "container">
          <nav className="navbar navbar-default">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/battle'>Battle</Link></li>
                <li><Link to='/popular'>Popular</Link></li>
              </ul>
            </div>
          </nav>
          <Route exact path='/' component = {Home}/>
          <Route exact path='/battle' component = {Battle}/>
          <Route exact path='/popular' component = {Popular}/>
        </div>
      </Router>
    )
  }
}
export default Navbar;
