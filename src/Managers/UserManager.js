const UserManager = Object.create(null, {
    clearActiveUser: {
        value: function () {
            this.setState({
                activeUser: null,
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
            })
        }
    }
})

export default UserManager