import React, { Component } from 'react';
import logo from '../logo.svg'
import loginScreenLogo from '../loginScreen.svg';
import { Field, Label, Control, Input, Button } from 'bloomer';
import $ from 'jquery'
import './login.css';

export default class Login extends Component {

    // Update state whenever an input field is edited
    handleChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // Handle for login submit
    handleLogin = (e) => {
        e.preventDefault()



        // Determine if a user already exists in API
        fetch(`http://127.0.0.1:8088/users`)
            .then(r => r.json())
            .then(users => {
                let userFound = false
                users.map(user => {
                    // User doesn't exist
                    if ((user.email !== $(`#user__email`).val() || user.email === "") && (user.password === $(`#user__password`).val() || user.password === "")) {
                        // User exists
                    } else if (user.email === $(`#user__email`).val() && user.password === $(`#user__password`).val()) {
                        userFound = true
                        this.props.setActiveUser(user.id)
                        this.props.showview("home")

                    }

                })
                if (userFound === false) {
                    alert("Incorrect email or password")
                }


                // User exists. Set local storage, and show home view
                // else {
                //     // Create user in API
                //     fetch("http://127.0.0.1:8088/users", {
                //         method: "POST",
                //         headers: {
                //             "Content-Type": "application/json"
                //         },
                //         body: JSON.stringify({email: this.state.email, password: this.state.password})
                //     })

                //     // Set local storage with newly created user's id and show home view
                //     .then(newUser => {
                //         this.props.setActiveUser(newUser.id)
                //         this.props.showview("home")
                //     })
                // }

            })
    }

    render() {
        return (
            <div className="login__Page login__Logo">
                <form onSubmit={this.handleLogin} className="login__Item">
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