import React, { Component } from 'react';
import {Media, MediaLeft, MediaContent, Content, Level, LevelLeft, LevelItem, Icon, Image} from 'bloomer';


export default class ContactCard extends Component {

    render() {
        return (
            <div>
                <Media>
                    <MediaLeft>
                        <Image isSize='64x64' src={this.props.image} />
                    </MediaLeft>
                    <MediaContent>
                        <Content>
                            <p>
                                <strong>{this.props.firstName} {this.props.lastName}</strong>
                                <br />
                                {this.props.email}
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