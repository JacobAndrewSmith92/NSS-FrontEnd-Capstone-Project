import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'bloomer';

export default class Home extends Component {


    render() {
        return (
            <div>
                <Breadcrumb>
                    <ul>
                        <BreadcrumbItem  onClick={() => this.props.showview("progress")}><a>In Progress {this.props.inProgressNum}</a></BreadcrumbItem>
                        <BreadcrumbItem onClick={() => this.props.showview("needed")}><a>Need to Complete {this.props.needToCompleteNum}</a></BreadcrumbItem>
                        <BreadcrumbItem><a>Completed {this.props.completedNum}</a></BreadcrumbItem>
                    </ul>
                </Breadcrumb>

            </div >
        )
    }
}