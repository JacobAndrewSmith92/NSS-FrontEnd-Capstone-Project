import React, { Component } from 'react';
import './App.css';
import Navbar from './nav/navbar';
import Login from './authentication/login';
import Profile from './profile/profile';
import Library from './library/library';
import Home from './home/home';
import Community from './community/community';
class App extends Component {
  state = {
    activeUser: sessionStorage.getItem("userId"),
    email: "",
    password: "",
    currentView: "login",
    image: "",
    errorMessage: "That's the incorrect username"
  }

setActiveUser = (val) => {
    if (val) {
      sessionStorage.setItem("userId", val)
    } else {
      sessionStorage.removeItem("userId")
    }
    this.setState({
      activeUser: val
    })
  }

  showView = function (e) {
    let view = null

    // Click event triggered switching view
    if (e.hasOwnProperty("target")) {
        view = e.target.id.split("__")[1]

        // View switch manually triggered by passing in string
    } else {
        view = e
    }

    // If user clicked logout in nav, empty local storage and update activeUser state
    if (view === "logout") {
        this.setActiveUser(null)
    }

    // Update state to correct view will be rendered
    this.setState({
        currentView: view
    })

}.bind(this)


  View = () => {
    if (sessionStorage.getItem("userId") === null) {
      return <Login showView={this.showView} setActiveUser={this.setActiveUser} />
    } else {
      switch (this.state.currentView) {
        case "logout":
          return <Login showView={this.showView} setActiveUser={this.setActiveUser} />
        case "profile":
          return <Profile showView={this.showView} />
        case "library":
          return <Library showView={this.showView} />
        case "community":
          return <Community showView={this.showView} />
        case "home":
        default:
          return <Home activeUser={this.state.activeUser} />
      }
    }
  }



  componentDidMount() {
    fetch(`http://127.0.0.1:8088/users/${this.state.activeUser}`)
      .then(r => r.json()
        .then(response => {
          this.setState({
            image: response.image,
            email: response.email
          })
        })
      )
  }


  render() {
    return (
      <div>
        <Navbar
        viewHandler={this.showView}
        activeUser={this.state.activeUser}
        setActiveUser={this.setActiveUser}
        image={this.state.image} />
        {this.View()}
      </div>

    );
  }
}

export default App;
