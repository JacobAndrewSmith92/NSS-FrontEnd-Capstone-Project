import React, { Component } from 'react';
import LibraryCard from '../library/libraryCard';
import Status from './status';

export default class Progress extends Component {
render() {
    return (
        <div>
        {this.props.inProgress.map(prog => (
            <LibraryCard key={prog.id} displayLesson={this.props.displayLesson} id={prog.id} title={prog.title} category={prog.category.title} image={prog.category.image} content={prog.content} showview={this.props.showview} hasStarted={true}/>
        ))}
        </div>
    )
}
}