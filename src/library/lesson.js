import React, { Component } from 'react';
import { Button } from 'bloomer';

export default class Lesson extends Component {

    render() {
        return (
            <div>
                <h1>Lesson: {this.props.lesson.title}</h1>
                <p>{this.props.lesson.content}</p>
                <Button onClick={() => console.log("you clicked me")} key={this.props.id} id={this.props.id}>Finished</Button>
                <Button id={this.props.id} onClick={() => this.props.showview("library")}>All Lessons</Button>
            </div>
        )
    }
}