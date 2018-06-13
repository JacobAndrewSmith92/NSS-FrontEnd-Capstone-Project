import React, { Component } from 'react';
import { Button } from 'bloomer';


export default class Lesson extends Component {

    displayLesson = function (id) {

    }



    render() {
        return (
            <div>
                <p>Lesson Card</p>
                <Button>Finished </Button>
                <Button id={this.props.id} onClick={() => this.props.showview("library")}>All Lessons</Button>
            </div>
        )
    }
}