import $ from 'jquery';


const ArrayManager = Object.create(null, {
    startedMandatoryLesson: {
        value: function (id) {
            // Spliced lessonId that user has started
            let oldNeedToCompleteState = this.state.needToComplete.map(item => Object.assign({}, item))
            let indexedLesson = oldNeedToCompleteState.findIndex(lesson => lesson.id === id)
            if (indexedLesson > -1) {
                // Add spliced item to in Progress array in state
                const lessonToBeMoved = oldNeedToCompleteState.splice(indexedLesson, 1)
                const oldInProgressState = this.state.inProgress.map(item => Object.assign({}, item))
                oldInProgressState.push(lessonToBeMoved)
                this.setState({
                    needToComplete: oldNeedToCompleteState,
                    inProgress: oldInProgressState
                })
            } else {
                let oldAllLessonsState = this.state.allLessons.map(item => Object.assign({}, item))
                let indexedLesson = oldAllLessonsState.findIndex(lesson => lesson.id === id)
                debugger
                if (indexedLesson > -1) {
                    // Add spliced item to in Progress array in state
                    const lessonToBeMoved = oldAllLessonsState.splice(indexedLesson, 1)
                    const oldInProgressState = this.state.inProgress.map(item => Object.assign({}, item))
                    oldInProgressState.push(lessonToBeMoved)
                    this.setState({
                        allLessons: oldAllLessonsState,
                        inProgress: oldInProgressState
                    })
                }

            }
        }
    },
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
    }
})

export default ArrayManager