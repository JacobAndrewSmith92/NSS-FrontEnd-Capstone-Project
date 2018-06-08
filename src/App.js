import React, { Component } from 'react';
import './App.css';
import Navbar from './nav/navbar';

class App extends Component {
  state = {
    activeUser: "5b19c6c4243ff1e2201f9265",
    currentView: "",
    image: ""
  }

  componentDidMount() {
    fetch(`http://127.0.0.1:8088/users/${this.state.activeUser}`)
    .then(r => r.json()
    .then(response => {
      this.setState({
        image: response.image
      })
    })
  )
  }


  render() {
    return (
      <div>
          <Navbar image={this.state.image}/>
      </div>

    );
  }
}

export default App;
