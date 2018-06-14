import React, { Component } from 'react';
import Status from '../home/status';
import { Button } from 'bloomer';





export default class Lesson extends Component {


    render() {
        return (
            <div>
                <Status />
                <h1>Lesson: {this.props.lesson.title}</h1>
                <p>{this.props.lesson.content}</p>
                <Button>Finished</Button>
                <Button id={this.props.id} onClick={() => this.props.showview("library")}>All Lessons</Button>
            </div>
        )
    }
}