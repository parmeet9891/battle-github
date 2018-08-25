import React from 'react';
import axios from 'axios';
import Appconfig from './../config.js';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'

var languages = ['JavaScript', 'Java', 'Ruby', 'CSS', 'Python'];
class Popular extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      arr: [false],
      result : [],
      show: false,
    }
  }

  componentDidMount() {
    let {arr} = this.state;
    arr[0] = true;
    this.setState({arr});
    this.getSelectLangData('javascript');
  }

  selectedLanguage = (lang, index)=> {
    let {arr} = this.state;
    arr = [false];
    this.setState({arr});
    if(index > -1) {
      arr[index] = true;
      this.setState({arr});
    }
    this.getSelectLangData(lang);
  }

  getSelectLangData = (lang) => {
    let {result} = this.state;
    this.setState({result: [], show: true});

    axios.get(`https://api.github.com/search/repositories?q=stars:%3E1+language:${lang}&sort=stars&order=desc&type=Repositories`)
    .then((res) => {
      console.log(res);
      this.setState({show: false});
      this.filterData(res.data.items);
    })
  }

  filterData = (data) => {
    let {result} = this.state;
    data.forEach((item, index) => {
      result.push({logo : item.owner.avatar_url, name: item.name, stars: item.stargazers_count, owner: item.owner.login, url: item.html_url});
    })
    this.setState({result});
  }

  render() {
    let {arr, result} = this.state;
    return (
      <div className = "container">
        <Loading
            show={this.state.show}
            color="red"
          />
        <div className = "row">
          <div className = "col-md-12 text-center">

            <ul className = "languages">
              {
                languages.map((value, index) => {
                  return <li key={index} className = "active" onClick = {() => {this.selectedLanguage(value, index)}}>
                    <p style = {{fontSize: 18, color: arr[index] ? '#d0021b': 'black', fontWeight: arr[index] ? 'bold': null, textDecoration: arr[index] ? 'underline':null}}>{value}</p>
                  </li>
                })
              }
            </ul>

          </div>
        </div>
        <br/>
        <div className = "row">
          <div className = "col-md-12">
            <center>
            {
              result ? result.map((value, index) => {
                return <div key = {index} className = "col-md-3">
                  <div>
                    <img className = "img-responsive" src = {value.logo} style = {{height:150, borderRadius: 75}} alt="Logo"/>
                    <a href = {value.url} target = "_blank" style = {{fontSize: 20}}>{value.name}</a>
                    <p style = {{fontSize: 18}}>@{value.owner}</p>
                    <p style = {{fontSize: 18}}>{value.stars} stars</p>
                  </div>
                <br/>
                </div>
              })
              : null
            }
            </center>
          </div>
        </div>

      </div>
    )
  }
}

export default Popular;
