import React, { Component } from 'react';
import './App.css';
import Navbar from './nav/navbar';
import Login from './authentication/login';
import Profile from './profile/profile';
import Library from './library/libraryList';
import Home from './home/home';
import Community from './community/community';
import Lesson from './library/lesson'
import Personality from './personality/personality';

class App extends Component {
  state = {
    activeUser: sessionStorage.getItem("userId"),
    email: "",
    password: "",
    currentView: "",
    image: "",
    allLessons: [],
    inProgress: [],
    needToDo: [],
    completed: [],
    errorMessage: "Your email or password is incorrect"
  }

  myLessons = function () {

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
    fetch(`http://127.0.0.1:8088/library?&_expand=category`)
      .then(r => r.json()
        .then(response => {
          console.log(response)
          this.setState({
            allLessons: response
          })
        })

      )
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

  showview = function (e) {
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
      return <Login showview={this.showview} setActiveUser={this.setActiveUser} />
    } else {
      switch (this.state.currentView) {
        case "logout":
          return <Login showview={this.showview} setActiveUser={this.setActiveUser} />
        case "profile":
          return <Profile showview={this.showview} />
        case "library":
          return <Library allLessons={this.state.allLessons} showview={this.showview} />
        case "lesson":
          return <Lesson showview={this.showview} id={this.state.id} />
        case "community":
          return <Community showview={this.showview} />
        case "personality":
          return <Personality showview={this.showview} />
        case "home":
        default:
          return <Home activeUser={this.state.activeUser} />
      }
    }
  }







  render() {
    return (
      <div>
        <Navbar
          showview={this.showview}
          activeUser={this.state.activeUser}
          setActiveUser={this.setActiveUser}
          image={this.state.image} />
        {this.View()}
      </div>

    );
  }
}

export default App;
