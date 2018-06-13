import React, { Component } from 'react';
import { Card, CardImage, CardContent, Media, MediaLeft, Image, MediaContent, Title, Subtitle, Button } from 'bloomer';
import './library.css';

export default class LessonCard extends Component {

    lessonMethod = function (evt) {
        const id = evt.target.id
        this.props.displayLesson(id)
    }.bind(this)


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
                    <Button onClick={this.lessonMethod} id={this.props.id}>Start Lesson</Button>
                </CardContent>
            </Card>
            </div>
        )
    }
}
// (evt) => this.props.showview("lesson", evt)


