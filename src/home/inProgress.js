import React, { Component } from 'react';
import LibraryCard from '../library/libraryCard';
import '../library/libraryList.css';
export default class Progress extends Component {


render() {
    return (
        <div className="flexbox__Cards">
        {this.props.inProgress.map(progress => {
            let categoryTitleImage = ""
            this.props.categories.forEach(category => {
                if (category.id === progress.library.categoryId ) {
                return categoryTitleImage = category
                }
            })
            return (<LibraryCard
                key={progress.id}
                id={progress.id}
                displayLesson={this.props.displayLesson}
                lessonMethod={this.props.lessonMethod}
                resumeLesson={this.props.resumeLesson}
                title={progress.library.title}
                category={categoryTitleImage.title}
                image={categoryTitleImage.image}
                content={progress.content}
                showview={this.props.showview}
                hasStarted={true}/>)
        })}
        </div>
    )
}
}