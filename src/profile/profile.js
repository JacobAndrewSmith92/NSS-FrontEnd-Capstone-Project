import React, { Component } from 'react';
import { Image, Container, Title, Column, Columns,  } from 'bloomer';
import './profile.css';
import ChartData from './ChartData';
export default class profilePage extends Component {


    render() {
        return (
            <div>
                <Columns>
                    <Column isSize="1/3">
                        <Image className="profile__image" src={this.props.image} style={{ marginTop: 10 }} />
                        <Title isSize={3}>{this.props.name}</Title>
                        <p>ABC Certified<i className="material-icons">check_circle_outline</i></p>
                    </Column>
                    <Column isSize="2/3">
                        <ChartData />
                    </Column>
                </Columns>

            </div>
        )
    }
}