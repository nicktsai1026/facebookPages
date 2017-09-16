import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './loginComp.jsx'
import ShowLikes from './fbLikes.jsx'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { status: false }
  } 

  renderLogin () {
    if (this.state.status == false ){
      return <Login />
    } else {
      return <ShowLikes />
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ShowLikes />
      </div>
    );
  }
}

export default App;
