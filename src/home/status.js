import React, { Component } from 'react';
import { Tabs, TabList, Tab, TabLink, Icon, Container } from 'bloomer';
import 'bulma/css/bulma.min.css';
import '../nav/navbar.css';

export default class Home extends Component {


    render() {
        if (this.props.activeUser !== null ) {

            return (
                <div className="status__Bar">
                    <Tabs >
                        <TabList>
                            <Tab>
                                <TabLink>
                                    <Icon isSize='small'><span className='fa fa-image' aria-hidden='true' /></Icon>
                                    <span onClick={() => this.props.showview("progress")}>In Progress {this.props.inProgressNum}</span>
                                </TabLink>
                            </Tab>
                            <Tab>
                                <TabLink>
                                    <Icon isSize='small'><span className='fa fa-image' aria-hidden='true' /></Icon>
                                    <span  onClick={() => this.props.showview("needed")}>Need to Complete {this.props.needToCompleteNum}</span>
                                </TabLink>
                            </Tab>
                                <TabLink>
                                    <Icon isSize='small'><span className='fa fa-image' aria-hidden='true' /></Icon>
                                    <span  onClick={() => this.props.showview("completed")}>Completed {this.props.completedNum}</span>
                                </TabLink>
                            <Tab>
                            </Tab>
                        </TabList>
                    </Tabs>
                </div>
                        )
        } else {
            return (
                null
            )
        }
    }
}