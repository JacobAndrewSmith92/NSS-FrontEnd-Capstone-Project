import React, { Component } from 'react';
import { Media, MediaContent, Content, Level, LevelLeft, LevelItem, Icon } from 'bloomer';

export default class completedCard extends Component {


    render() {
        return (
            <div>
                <Media>
                    <MediaContent>
                        <Content>
                            <p>
                            <small>Completed on: </small><strong>{this.props.finished}</strong>
                                <br/>
                                {this.props.title}
                            </p>
                        </Content>
                        <Level isMobile>
                            <LevelLeft>
                                <LevelItem href='#'>
                                    <Icon isSize='small'><span className="fa fa-reply" aria-hidden="true" /></Icon>
                                </LevelItem>
                                <LevelItem href='#'>
                                    <Icon isSize='small'><span className="fa fa-retweet" aria-hidden="true" /></Icon>
                                </LevelItem>
                                <LevelItem href='#'>
                                    <Icon isSize='small'><span className="fa fa-heart" aria-hidden="true" /></Icon>
                                </LevelItem>
                            </LevelLeft>
                        </Level>
                    </MediaContent>
                </Media>
            </div>
        )
    }
}