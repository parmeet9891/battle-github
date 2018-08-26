import React from 'react';
import axios from 'axios';
import Appconfig from './../config.js';

let client_id = 'YOUR_CLIENT_ID';
let client_secret = 'YOUR_CLIENT_SECRET_ID';

class Battle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userOne : null,
      userTwo : null,
      playerOneImage : null,
      playerTwoImage : null,
      userOneDetails : [],
      userTwoDetails : [],
      countOne : 0,
      countTwo: 0,
      winnerOne: false,
      winnerTwo : false,
      draw: false,
      show : false,
      scoreOne : 0,
      scoreTwo : 0,
      error: false,
    }
  }

  handleUserOne = (event) => {
    var value = event.target.value;
    this.setState({userOne: value});
  }

  handleUserTwo = (event) => {
    var value = event.target.value;
    this.setState({userTwo: value});
  }

  verifyUserDetails = (name, type) => {
    let {userOneDetails, userTwoDetails} = this.state;
    this.setState({error: false});
    axios.get(`${Appconfig.userapi}${name}`)
    .then((res) => {
      if(type === 'first') {
        userOneDetails.push({followers: res.data.followers, loc: res.data.location, name: res.data.name, repo: res.data.public_repos, url: res.data.html_url});
        this.setState({userOneDetails});
      }
      else if(type === 'second') {
        userTwoDetails.push({followers: res.data.followers, loc: res.data.location, name: res.data.name, repo: res.data.public_repos, url: res.data.html_url});
        this.setState({userTwoDetails});
      }
      return this.getDetails(res.data, name, type);
    })
    .catch((error) => {
      this.setState({error: true});
    })
  }

  getDetails = (data, name, type) => {
    if(type === 'first') {
      this.setState({playerOneImage : data.avatar_url});
    }
    else if(type === 'second') {
      this.setState({playerTwoImage: data.avatar_url});
    }
    axios.get(`${Appconfig.userapi}${name}/repos?client_id=${client_id}&client_secret=${client_secret}&per_page=100`)
    .then((res) => {
      return this.calcScore(res.data, name, type);
    })
  }

  calcScore = (res, name, type) => {
    let {userOneDetails, userTwoDetails, countTwo, countOne} = this.state;
    if(type === 'first') {
    res.forEach((item, index) => {
      countOne += item.stargazers_count;
    })
    this.setState({countOne});
    countOne = countOne + (3*(userOneDetails[0].followers));
    this.setState({countOne});
  }
  if(type === 'second') {
    res.forEach((item, index) => {
      countTwo += item.stargazers_count;
    })
    this.setState({countTwo});
    countTwo = countTwo + (3*(userTwoDetails[0].followers));
    this.setState({countTwo});
  }
  }

  selectWinner = () => {
    let {userOneDetails, userTwoDetails, countTwo, countOne} = this.state;
    this.setState({
      show: true,
      scoreOne: countOne,
      scoreTwo: countTwo,
    })

    if(countOne > countTwo) {
      this.setState({winnerOne: true});
    }
    else {
      this.setState({winnerTwo: true});
    }
  }

  render() {
    let {userOne, userTwo, userOneDetails, userTwoDetails} = this.state;
    return (
      <div className = "container">
        <div className = "row">
          <div className = "col-md-12 text-center">
            {
              this.state.error ? <h4 style = {{color: 'red'}}>This User does not exist.</h4> : null
            }
          </div>

          <div className = "col-md-4 text-center">
            <label style = {{fontSize: 30}}>{this.state.winnerOne ? "Winner" : "Player One"}</label>

            <div>
            { this.state.playerOneImage ?
              <center>
                <img alt="playerOneImage" className = "img-responsive" src = {this.state.playerOneImage} style = {{height:200, borderRadius: 100}}
              />
              <h4><b>@{userOne}</b></h4>
              </center>
              : <input id = 'username'
              placeholder = 'github username'
              type = 'text'
              onChange = {this.handleUserOne}
              className = "form-control"/>}

              {this.state.scoreOne ? <h3><b>Score: {this.state.scoreOne}</b></h3> : null}

              {
                  this.state.show ? userOneDetails.map((value,index) => {
                    return <div key={index}>
                      <h5><b>Full Name: </b>{value.name}</h5>
                      <h5><b>Location: </b>{value.loc}</h5>
                      <h5><b>Public Repos: </b>{value.repo}</h5>
                      <h5><b>Followers: </b>{value.followers}</h5>
                      <h5><a href = {value.url} target = "_blank">{value.url}</a></h5>
                    </div>
                  })
                  : null
              }


              </div>
             <br/>

             <div>
             { this.state.playerOneImage ? null :
              <input type = "button"
                name = "Submit"
                value = "Submit"
                className = "btn btn-primary"
                onClick = {() => {this.verifyUserDetails(userOne, 'first')}}
                disabled = {!this.state.userOne}
              />
            }

            </div>
          </div>

          <div className = "col-md-offset-4 col-md-4 text-center">
            <label style = {{fontSize: 30}}>{this.state.winnerTwo ? "Winner" : "Player Two"}</label>

            <div>
            { this.state.playerTwoImage ?
              <center>
                <img alt = "playerTwoImage" className = "img-responsive" src = {this.state.playerTwoImage} style = {{height:200, borderRadius: 100}}
              />
              <h4><b>@{userTwo}</b></h4>
              </center>
              : <input id = 'username'
                placeholder = 'github username'
                type = 'text'
                onChange = {this.handleUserTwo}
                className = "form-control"
              />
            }

            {this.state.scoreTwo ? <h3><b>Score: {this.state.scoreTwo}</b></h3> : null}

            {
                this.state.show ? userTwoDetails.map((value,index) => {
                  return <div key={index}>
                    <h5><b>Full Name: </b>{value.name}</h5>
                    <h5><b>Location: </b>{value.loc}</h5>
                    <h5><b>Public Repos: </b>{value.repo}</h5>
                    <h5><b>Followers: </b>{value.followers}</h5>
                    <h5><a href = {value.url} target = "_blank">{value.url}</a></h5>
                  </div>
                })
                : null
            }

           </div>
            <br/>

            <div>
            { this.state.playerTwoImage ? null :
            <input type = "button"
              name = "Submit"
              value = "Submit"
              className = "btn btn-primary"
              onClick = {() => {this.verifyUserDetails(userTwo, 'second')}}
              disabled = {!this.state.userTwo}
            />
          }
          </div>

          </div>

          <div className = "col-md-12 text-center">
          {
            this.state.playerOneImage && this.state.playerTwoImage && !this.state.show ?
            <input type = "button"
              name = "Submit"
              value = "Battle"
              className = "btn btn-primary"
              onClick = {this.selectWinner}
              />
              : null
          }
          </div>

        </div>
      </div>
    )
  }
}

export default Battle;
