import React, { Component } from 'react';
import LibraryCard from '../library/libraryCard';

export default class Progress extends Component {
render() {
    return (
        <div>
        {this.props.inProgress.map(prog => (
            <LibraryCard
            key={prog.id}
            id={prog.id}
            displayLesson={this.props.displayLesson}
            lessonMethod={this.props.lessonMethod}
            title={prog.title}
            category={prog.category.title}
            image={prog.category.image}
            content={prog.content}
            showview={this.props.showview}
            hasStarted={true}/>
        ))}
        </div>
    )
}
}