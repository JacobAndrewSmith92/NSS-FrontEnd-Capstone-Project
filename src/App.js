import React, { Component } from 'react';
import './App.css';
import Navbar from './nav/navbar';
import Login from './authentication/login';
import Profile from './profile/profile';
import Library from './library/libraryList';
import Status from './home/status';
import Community from './community/communityList';
import Landing from './home/landing';
import Lesson from './library/lesson'
import Personality from './personality/personality';
import Needed from './home/needed';
import InProgress from './home/inProgress';

class App extends Component {
  state = {
    activeUser: sessionStorage.getItem("userId"),
    email: "",
    password: "",
    currentView: "",
    image: "",
    currentLesson: "",
    allLessons: [],
    inProgress: [],
    needToComplete: [],
    completed: [],
    errorMessage: "Your email or password is incorrect"
  }

  /* Method that takes one argument, "id" and maps over allLessons in state to compare the argument id to the id in allLessons. If they match, pass content to lesson and display content. */

  displayLesson = function (id) {
    const inProgressLessons = this.state.inProgress
    let inProgressIds = []
    this.state.inProgress.map(id => {
      inProgressIds.push(id.id)
    })
    this.state.allLessons.map(lesson => {
      if (id === lesson.id) {
        if(!inProgressIds.includes(lesson.id)){
          this.postLessonAPI(lesson.id)
          inProgressLessons.push(lesson)
        }
        this.setState({
          currentLesson: lesson,
          inProgress: inProgressLessons
        })
      }
      this.showview("lesson")
    })
  }.bind(this)

  /*
  1. When user clicks on the start lesson button they are re-routed to the lessons/in progress component.
  2. A fetch is requested to post to the API with moving the lesson to in progress
  {
    id,
    userId,
    libraryId,
    start time,
    end time
  }
  */


  postLessonAPI = function (lessonId) {
    const startedLesson = {
      "userId": this.state.activeUser,
      "libraryId": lessonId,
      "start": Date.now(),
      "end": null
    }

    fetch(`http://127.0.0.1:8088/userLibrary`, {
      method: "POST",
      body: JSON.stringify(startedLesson),
      headers: {
        "Content-Type": "application/json"
      }
    })
  }.bind(this)

  /* Method that takes the response from a fetch request, and filters through the boolean key "mandatory" to check if an item is set to true. If there's  a match, return and store the content to a new array */

  mandatoryLessons = function (resp) {
    const newArray = resp.filter(Do => {
      return Do.mandatory === true
    })
    return newArray
  }.bind(this)



  // Fetch sets current user email and image
  componentDidMount() {
    return fetch(`http://127.0.0.1:8088/users/${this.state.activeUser}`)
      .then(r => r.json()
      .then(response => {
          this.setState({
            image: response.image,
            email: response.email
          })
          // Fetch that sets all lessons from library and checks against which lessons are mandatory
          return fetch(`http://127.0.0.1:8088/libraries?&_expand=category`)
            .then(r => r.json()
            .then(response => {
                const mandatoryLessons = this.mandatoryLessons(response)
                this.setState({
                  allLessons: response,
                  needToComplete: mandatoryLessons
                })
                // Fetch that checks which lessons the activeUser is currently working on and setting inProgress
                return fetch(`http://127.0.0.1:8088/userLibrary`)
              })
            .then(r => r.json())
            .then(response => {
                const inProgressLessons = this.state.inProgress
                const mapAllLessons = this.state.allLessons.map(all => {
                  response.map(resp => {
                    if (resp.userId === this.state.activeUser && resp.libraryId === all.id) {
                      inProgressLessons.push(all)
                      this.setState({
                        inProgress: inProgressLessons
                      })
                    }
                  })
                })
              })
            )
        })
      )
    // Fetch request that is going to check the userLibrary to query and set inProgress in state.
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
      return <Login
        showview={this.showview}
        setActiveUser={this.setActiveUser} />
    } else {
      switch (this.state.currentView) {
        case "logout":
          return <Login
            showview={this.showview}
            setActiveUser={this.setActiveUser} />
        case "profile":
          return <Profile
            showview={this.showview} />
        case "library":
          return <Library
            displayLesson={this.displayLesson}
            allLessons={this.state.allLessons}
            showview={this.showview} />
        case "progress":
          return <InProgress
            showview={this.showview}
            inProgress={this.state.inProgress}
            displayLesson={this.displayLesson}
          />
        case "needed":
          return <Needed
            showview={this.showview}
            needToComplete={this.state.needToComplete}
            displayLesson={this.displayLesson}
          />
        case "lesson":
          return <Lesson
            displayLesson={this.displayLesson}
            showview={this.showview} id={this.state.id}
            lesson={this.state.currentLesson} />
        case "community":
          return <Community
            showview={this.showview} />
        case "personality":
          return <Personality
            showview={this.showview} />
        case "home":
        default:
          return <Landing />
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
        <Status
          showview={this.showview}
          inProgressNum={this.state.inProgress.length}
          completedNum={this.state.completed.length}
          needToCompleteNum={this.state.needToComplete.length}
        />
        {this.View()}
      </div>

    );
  }
}

export default App;