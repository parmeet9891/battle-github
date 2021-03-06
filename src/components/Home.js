import React from 'react';
import {Link} from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div className = "container">
        <div className = "row">
          <div className = "col-md-12 text-center">
            <h3 style = {{fontSize: 40}}><b>Github Battle: Battle with Friends</b></h3>
            <Link to='/battle' style = {{fontSize: 30}}>Let the Battle Begin</Link>
          </div>
        </div>

        <div style = {{marginTop: 400}}>
          <p className = "text-right" style = {{fontSize: 10}}>Developed by parmeet9891</p>
        </div>

      </div>
    )
  }
}

export default Home;
