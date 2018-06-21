import React, { Component } from 'react';
import { Button } from 'bloomer';

export default class Lesson extends Component {

    // Finished Button
    /*
        1. When the Finished button is clicked a message that says "Great Job" and a Back to Library button displays
        2. The API needs to grab that userId and libraryId and update the current end time to date.now()
        3. The item needs to be spliced out of 'in progress' and moved to 'completed'
    */

    // var array = [2, 5, 9];
    // var index = array.indexOf(5);
    // if (index > -1) {
    //   array.splice(index, 1);
    // }
    //  array = [2, 9]

    grabId = function (evt) {
        const id = evt.target.id
        fetch(`http://127.0.0.1:8088/userLibrary/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                end: Date.now()
            })
        })
            .then(() => {
                this.props.getUserHistory()
            })
    }.bind(this)


    render() {
        return (
            <div>
                <h1>Lesson: {this.props.lesson.title}</h1>
                <p>{this.props.lesson.content}</p>
                <Button onClick={this.grabId} id={this.props.id}>Finished</Button>
                <Button id={this.props.id} onClick={() => this.props.showview("library")}>All Lessons</Button>
            </div>
        )
    }
}