import React, { Component } from 'react';
import { Title, HeroBody, Container } from 'bloomer';
import Slogan from '../Slogan.png';
import '../library/libraryList.css';
export default class Landing extends Component {

    render() {
        return (
            <div>
                <HeroBody>
                    <Container hasTextAlign='centered'>
                            <Title isSize={1}>Welcome to Train Up</Title>
                        <div className="flexbox__Cards">
                            <img className="image__home" src={Slogan} alt="Slogan"/>
                        </div>
                    </Container>
                </HeroBody>

            </div>
        )
    }
}