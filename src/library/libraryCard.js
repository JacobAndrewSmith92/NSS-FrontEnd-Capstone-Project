import React, { Component } from 'react';
import { Card, CardImage, CardContent, Media, MediaLeft, Image, MediaContent, Title, Subtitle, Button } from 'bloomer';
import './library.css';

export default class LessonCard extends Component {


// Function that checks whether or not the boolean value is true or false based on whether the user has started a lesson or not.
resumeLessonId = (evt) => {
    const id = evt.target.id
    this.props.resumeLesson(id)
}



    hasStarted = function (bool) {
        if (bool) {
            return <Button onClick={this.resumeLessonId} id={this.props.id}>Resume Lesson</Button>

        } else {
            return <Button onClick={this.props.lessonMethod} id={this.props.id}>Start Lesson</Button>
        }
    }

    render() {
        return (
            <div className="card">
                <Card className="library__card">

                    <CardImage>
                        <Image className="library__img" isRatio='4:3' src={this.props.image} />
                    </CardImage>
                    <CardContent>
                        <Media>
                            <MediaLeft>
                                <Image className="library__img" isSize='48x48' src={this.props.image} />
                            </MediaLeft>
                            <MediaContent>
                                <Title isSize={4}>{this.props.title}</Title>
                                <Subtitle isSize={6}>Category: {this.props.category}</Subtitle>
                            </MediaContent>
                        </Media>
                        {this.hasStarted(this.props.hasStarted)}
                        {/* <Button onClick={this.lessonMethod} id={this.props.id}>Start Lesson</Button> */}
                    </CardContent>
                </Card>
            </div>
        )
    }
}


