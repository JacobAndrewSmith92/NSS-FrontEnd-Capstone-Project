import React, { Component } from "react";
// Using bloomer tags to import bulma styling
import { Navbar, NavbarItem, NavbarBrand, NavbarMenu, Image } from 'bloomer';
import 'bulma/css/bulma.min.css';
// import Login from '../authentication/login';
import logo from '../logo.svg';
import 'bulma/css/bulma.min.css'
import './navbar.css'

export default class NavBar extends Component {
    // Set initial state
    state = {
        searchTerms: ""
    }

    /**
     * Local search handler, which invokes the searchHandler reference
     * passed from App
     */
    search = (e) => {
        if (e.charCode === 13) {
            this.props.searchHandler(this.state.searchTerms)
            this.setState({ searchTerms: "" })
        }
    }

    LoginLogout = () => {
        if (this.props.activeUser === null) {
            return <a className="nav-link" id="nav__login"
                onClick={this.props.showview} href="/">Login</a>
        } else {
            return <a className="nav-link" id="nav__logout"
                onClick={this.props.showview} href="/">Logout</a>
        }
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    render() {
        if (this.props.activeUser !== null){
            return (
                <div>
                <Navbar className="nav__bar">
                    <NavbarBrand>
                        <img src={logo} className="App-logo" alt="logo"/>
                        <NavbarItem className="nav__pointer" onClick={() => this.props.showview("home")}>Home</NavbarItem>
                        {/* <NavbarBurger isActive={this.state.isActive} onClick={this.props.showview} /> */}
                    </NavbarBrand>
                    <NavbarMenu isActive={this.state.isActive}>
                        <NavbarItem id="nav__profile" className="nav__pointer" onClick={() => this.props.showview("profile")}> <Image isSize="32x32" src={this.props.image}/>Profile</NavbarItem>
                        <NavbarItem id="nav__library" className="nav__pointer" onClick={() => this.props.showview("library")}>Library</NavbarItem>
                        <NavbarItem id="nav__community" className="nav__pointer" onClick={() => this.props.showview("community")}>Community</NavbarItem>
                        <NavbarItem id="nav__personality" className="nav__pointer" onClick={() => this.props.showview("personality")}>Personality Assessment</NavbarItem>
                    </NavbarMenu>
                    <NavbarItem id="nav__logout" className="nav__pointer" onClick={() => this.props.showview("logout")}>Logout</NavbarItem>
                </Navbar>
                </div>
            )
        } else {
            return(
                <Navbar>
                    <NavbarBrand>
                        <NavbarItem>Train Up</NavbarItem>
                        {/* <NavbarBurger isActive={this.state.isActive} onClick={this.onClickNav} /> */}
                        <NavbarItem>
                            {/* <Login setActiveUser={this.props.setActiveUser} setView={this.props.setView}/> */}
                        </NavbarItem>
                    </NavbarBrand>
                </Navbar>
            )
        }

    }
}
