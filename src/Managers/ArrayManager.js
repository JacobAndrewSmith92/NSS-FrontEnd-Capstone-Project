const ArrayManager = Object.create(null, {
    startedMandatoryLesson: {
        value: function (id) {
            // the function grabs an id from the clicked button and passes it down
            // Spliced lessonId that user has started
            let oldNeedToCompleteState = this.state.needToComplete.map(item => Object.assign({}, item))
            let indexedLesson = oldNeedToCompleteState.findIndex(lesson => lesson.id === id)
            if (indexedLesson > -1) {
                // Add spliced item to in Progress array in state
                // If no item is found findIndex returns a -1
                const lessonToBeMoved = oldNeedToCompleteState.splice(indexedLesson, 1)
                        // fetch(`http://127.0.0.1:8088/userLibrary/${response.id}?_expand=library`)
        // .then(r => r.json())
        // .then(response => {// })
                const oldInProgressState = this.state.inProgress.map(item => Object.assign({}, item))
                oldInProgressState.push(lessonToBeMoved[0])
                this.setState({
                    needToComplete: oldNeedToCompleteState
                    // inProgress: oldInProgressState
                })
            } else {

                // if item doesn't exist in the mandatory array
                // map and index over all lessons and find which item the user clicked on
                // findIndex returns -1
                let oldAllLessonsState = this.state.allLessons.map(item => Object.assign({}, item))
                let indexedLesson = oldAllLessonsState.findIndex(lesson => lesson.id === id)
                if (indexedLesson > -1) {
                    // Add spliced item to in Progress array in state
                    const lessonToBeMoved = oldAllLessonsState.splice(indexedLesson, 1)
                    const oldInProgressState = this.state.inProgress.map(item => Object.assign({}, item))
                    oldInProgressState.push(lessonToBeMoved)
                // if an item is found in all Lessons (which it will find in all lessons, I think)
                // Set the state of all lessons and restate the in Progress and all lessons array
                // finds item and moves it out of that particular array
                    this.setState({
                        allLessons: oldAllLessonsState,
                        inProgress: oldInProgressState
                    })
                }

            }
        }
    },
    // Not in use right now.
    filteredUserStatusLessons: {
        value: function () {
            const currentUserId = sessionStorage.getItem("userId")
            fetch('http://127.0.0.1:8088/libraries')
            .then(r => r.json())
            .then(allLessons => {
                fetch(`http://127.0.0.1:8088/userLibrary?userId=${currentUserId}&_expand=library`)
                .then(r => r.json())
                .then(currentUserLesson => {
                    const allLessonsState = []
                    const needToCompleteState = []
                    const inProgressState = []
                    const completedState = []
                    allLessons.forEach(lesson => {
                        if (lesson.end !== null) {
                            completedState.push(lesson)
                        }
                    })
                })
            })
        }
    },
    completedUserLessons: {
        value: function (id) {
            debugger
            let oldInProgressState = this.state.inProgress.map(item => Object.assign({}, item))
            let indexedLesson = oldInProgressState.findIndex(lesson => lesson.id === parseInt(id))
            if (indexedLesson > -1 ) {
                const lessonToBeMoved = oldInProgressState.splice(indexedLesson, 1)
                const oldCompletedState = this.state.completed.map(item => Object.assign({}, item))
                oldCompletedState.push(lessonToBeMoved)

                this.setState({
                    inProgress: oldInProgressState,
                    completed: oldCompletedState
                })
            }
        }
    }
})

export default ArrayManager