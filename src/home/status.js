import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'bloomer';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Hello World</h1>
                <Breadcrumb>
                    <ul>
                        <BreadcrumbItem><a>In Progress {this.props.inProgress}</a></BreadcrumbItem>
                        <BreadcrumbItem onClick={() => this.props.showview("needed")}><a>Need to Complete {this.props.needToCompleteNumber}</a></BreadcrumbItem>
                        <BreadcrumbItem><a>Completed {this.props.completed}</a></BreadcrumbItem>
                    </ul>
                </Breadcrumb>

            </div >
        )
    }
}