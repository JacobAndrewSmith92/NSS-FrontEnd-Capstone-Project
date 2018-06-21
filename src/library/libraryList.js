import React, { Component } from 'react';
import LibraryCard from './libraryCard';
import { HeroBody, Container, Title } from 'bloomer';
import './libraryList.css';
import 'bulma/css/bulma.min.css';

export default class LibraryList extends Component {

    render() {
        return (
            <div className="flexbox__Cards">
                <HeroBody>
                    <Container hasTextAlign='centered'>
                        <Title >Library</Title>
                    </Container>
                </HeroBody>
                {this.props.allLessons.map(lesson => (
                    <LibraryCard
                    displayLesson={this.props.displayLesson}
                    lessonMethod={this.props.lessonMethod}
                    key={lesson.id}
                    id={lesson.id}
                    title={lesson.title}
                    category={lesson.category.title}
                    image={lesson.category.image}
                    content={lesson.content}
                    showview={this.props.showview}/>
                ))}
            </div>
        )
    }
}