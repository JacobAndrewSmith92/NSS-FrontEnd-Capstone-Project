import React, { Component } from 'react';
import LibraryCard from '../library/libraryCard';
import Status from './status';

export default class Needed extends Component {


    render() {
        return (
            <div>
                {this.props.needToComplete.map(needed => (
                    <LibraryCard key={needed.id} displayLesson={this.props.displayLesson} id={needed.id} title={needed.title} category={needed.category.title} image={needed.category.image} content={needed.content} showview={this.props.showview} hasStarted={false}/>
                ))}
            </div>
        )
    }
}

// needToCompleteNumber={this.props.needToCompleteNumber} completed={this.props.completed} inProgress={this.props.inProgress}