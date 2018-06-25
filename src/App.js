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
import Completed from './home/completed';
import { Container } from 'bloomer';
class App extends Component {
  state = {
    activeUser: sessionStorage.getItem("userId"),
    email: "",
    password: "",
    currentView: "",
    image: "",
    currentLesson: "",
    currentLessonId: "",
    allLessons: [],
    inProgress: [],
    needToComplete: [],
    completed: [],
    categories: [],
    errorMessage: "Your email or password is incorrect"
  }

  // Method that grabs the event target id from the Button and stores it as id and passes it to a function called displayLesson

  lessonMethod = function (evt) {
    const id = evt.target.id
    console.log(id)
    fetch(`http://127.0.0.1:8088/userLibrary`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: this.state.activeUser,
        libraryId: id,
        start: Date.now(),
        end: null
      })
    })
      .then(r => r.json())
      .then(response => {
        this.displayLesson(response.libraryId)
      })

  }.bind(this)


  setCategories = () => {
    fetch(`http://127.0.0.1:8088/categories`)
      .then(r => r.json())
      .then(response => {
        console.log(response)
        this.setState({
          categories: response
        })

      })
  }

  setCategories() { console.log(this.state.categories) }
  displayLesson = (id) => {
    // id is suppose to be the user history id
    fetch(`http://127.0.0.1:8088/userLibrary/${id}?_expand=library`)
      .then(r => r.json())
      .then(userLessonHistory => {
        console.log(userLessonHistory)
        const newstartedLessons = []
        const inProgressArray = this.state.inProgress
        inProgressArray.map(lesson => {
          console.log("InProgress Lessons:", lesson)
          console.log("User Intersection Library", userLessonHistory)
          if (lesson.library.id !== userLessonHistory.library.id) {
            newstartedLessons.push(userLessonHistory.library)
          }
        })
        inProgressArray.push(newstartedLessons)
        this.setState({
          inProgress: inProgressArray,
          currentLesson: userLessonHistory.library,
          currentLessonId: userLessonHistory.id
        })
        this.showview("lesson")
      })
  }
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


  startedLessonAPI = function (lessonId) {
    console.log(lessonId)
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
      .then(r => r.json())
      .then(response => {

      })
  }

  // completedLessonAPI = function () {
  //   const completedLesson = {
  //     "userId": this.state.activeUser,
  //     libraryId: "",
  //   }
  // }

  finishedBtnLesson = function (e) {

    const oldInProgressState = this.state.inProgress.map(item => Object.assign({}, item))
    const lessonIndex = this.state.inProgress.findIndex(lesson => lesson.id === e)
    const lesson = oldInProgressState.splice(lessonIndex, 1)
    const lessonObject = lesson[0]
    console.log(lessonObject)
    const objectToPush = {
      library: lessonObject
    }
    const oldCompletedLessonsState = this.state.completed.map(item => Object.assign({}, item))
    oldCompletedLessonsState.push(objectToPush)
    this.setState({
      inProgress: oldInProgressState,
      completed: oldCompletedLessonsState

    })
  }.bind(this)



  /* Method that takes the response from a fetch request, and filters through the boolean key "mandatory" to check if an item is set to true. If there's a match, return and store the content to a new array */

  mandatoryLessons = (resp) => {
    const newArray = resp.filter(Do => {
      return Do.mandatory === true
    })
    return newArray
  }

  userCompletedLessons = (resp) => {
    const completedLessons = resp.filter(Done => {
      return Done.end !== null
    })
    return completedLessons
  }

  getUserHistory = () => {
    fetch(`http://127.0.0.1:8088/userLibrary?&_expand=library`)
      .then(r => r.json())
      .then(userLessons => {
        const userId = this.state.activeUser
        const completed = this.userCompletedLessons(userLessons)
        const inProgressLessons = []
        this.state.allLessons.map(singleLesson => {
          userLessons.map(singleUserLesson => {
            if (singleUserLesson.userId === userId && singleUserLesson.libraryId === singleLesson.id) {
              inProgressLessons.push(singleUserLesson)
            }
          })
        })
        this.setState({
          inProgress: inProgressLessons,
          completed: completed
        })
      })

  }

  renderUserInformation = () => {
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
            .then(allLibraryAndCategories => {
              const categoriesIds = []
              const categories = []
              allLibraryAndCategories.map(oneCategory => {
                if (categoriesIds.indexOf(oneCategory.category.id) === -1) {
                  categoriesIds.push(oneCategory.category.id)
                  categories.push(oneCategory.category)
                }
              })
              const mandatoryLessons = this.mandatoryLessons(allLibraryAndCategories)
              this.setState({
                allLessons: allLibraryAndCategories,
                needToComplete: mandatoryLessons,
                categories: categories
              })
              // Fetch that checks which lessons the activeUser is currently working on and setting to inProgress
              this.getUserHistory()
            })
          )
      })
    )
  }

  // Fetch sets current user email and image
  componentDidMount() {
    if (!this.state.activeUser) {
    } else {
      this.renderUserInformation()

    }
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
    if (this.state.activeUser === null) {
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
            lessonMethod={this.lessonMethod}
            showview={this.showview} />
        case "progress":
          return <InProgress
            allLessons={this.state.allLessons}
            categories={this.state.categories}
            showview={this.showview}
            inProgress={this.state.inProgress}
            displayLesson={this.displayLesson}
            lessonMethod={this.lessonMethod}
          />
        case "completed":
          return <Completed
            showview={this.showview}
            completed={this.state.completed}
            activeUser={this.state.activeUser}
          />
        case "needed":
          return <Needed
            showview={this.showview}
            needToComplete={this.state.needToComplete}
            displayLesson={this.displayLesson}
            lessonMethod={this.lessonMethod}
          />
        case "lesson":
          return <Lesson
            activeUser={this.state.activeUser}
            getUserHistory={this.getUserHistory}
            id={this.state.currentLessonId}
            key={this.state.currentLesson.id}
            displayLesson={this.displayLesson}
            finishedBtnLesson={this.finishedBtnLesson}
            completedLessonAPI={this.completedLessonAPI}
            showview={this.showview}
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
        <Container>
          <Status
            activeUser={this.state.activeUser}
            showview={this.showview}
            inProgressNum={this.state.inProgress.length}
            completedNum={this.state.completed.length}
            needToCompleteNum={this.state.needToComplete.length}
          />
          {this.View()}
        </Container>
      </div>

    );
  }
}

export default App;