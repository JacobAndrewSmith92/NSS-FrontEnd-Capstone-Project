import React, { Component } from 'react';
import logo from '../logo.svg'
import { Field, Label, Control, Input, Button } from 'bloomer';
import $ from 'jquery'

export default class Login extends Component {
    state = {
        email: "",
        password: ""
    }
    // Update state whenever an input field is edited
    handleChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }.bind(this)

    // Handle for login submit
    handleLogin = function (e) {
        e.preventDefault()

        // Determine if a user already exists in API
        fetch(`http://127.0.0.1:8088/users?email=${this.state.email}`)
            .then(r => r.json())
            .then(user => {
                // User exists. Set local storage, and show home view
                if (user.length) {
                    this.props.setActiveUser(user[0].id)
                    this.props.showView("home")

                // User doesn't exist
                } else {
                    // Create user in API
                    fetch("http://127.0.0.1:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({email: this.state.email, password: this.state.password})
                    })

                    // Set local storage with newly created user's id and show home view
                    .then(newUser => {
                        this.props.setActiveUser(newUser.id)
                        this.props.showView("home")
                    })
                }

            })
    }.bind(this)


    render() {
        return (
            <div>
                <img src={logo} className="App-logo" alt="logo"/>
                <form onSubmit={this.handleLogin}>
                <Field>
                    <Label>Email</Label>
                    <Input type="text" id="user__email" onChange={this.handleChange} required="" placeholder='Email' autoFocus=""/>
                    <Label>Password</Label>
                    <Input type="password" id="user__password" onChange={this.handleChange} required="" placeholder='Password'/>
                </Field>
                <Field isGrouped>
                    <Control>
                        <Button type="submit">Submit</Button>
                    </Control>
                </Field>
                </form>
            </div>
        )
    }
}