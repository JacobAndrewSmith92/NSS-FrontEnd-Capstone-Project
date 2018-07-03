import React, { Component } from 'react';
import { Title, Image } from 'bloomer';
import PersonalityLogo from '../enneagramGraphic.png'
export default class Personality extends Component {

    render() {
        return (
            <div>
                <Title isSize={1}>Your Personality</Title>
                <Image src={PersonalityLogo}/>
            </div>
        )
    }
}