import React, { Component } from 'react';
import { Tabs, TabList, Tab, TabLink, Icon } from 'bloomer';
import 'bulma/css/bulma.min.css';

export default class Home extends Component {


    render() {
        return (
            <div>
                <Tabs>
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

            </div >
                    )
                }
}