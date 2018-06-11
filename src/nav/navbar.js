import React, { Component } from "react";
// Using bloomer tags to import bulma styling
import { Navbar, NavbarItem, NavbarBurger, NavbarBrand, NavbarMenu, Image } from 'bloomer';
import logo from '../logo.svg';
import 'bulma/css/bulma.min.css'
import './navbar.css'
// import Login from '../LoginRegistration/login'

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
                onClick={this.props.viewHandler} href="#">Login</a>
        } else {
            return <a className="nav-link" id="nav__logout"
                onClick={this.props.viewHandler} href="#">Logout</a>
        }
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    render() {
        if (this.props.activeUser !== null){
            // debugger
            return (
                <Navbar>
                    <NavbarBrand>
                        <img src={logo} className="App-logo" alt="logo"/>
                        <NavbarItem>Home |</NavbarItem>
                        <NavbarBurger isActive={this.state.isActive} onClick={this.onClickNav} />
                    </NavbarBrand>
                    <NavbarMenu isActive={this.state.isActive}>
                        <NavbarItem  id="nav__notifications" className="nav__pointer" onClick={this.onClickNav}> <Image isSize="32x32" src={this.props.image}/>Profile</NavbarItem>
                        <NavbarItem  id="nav__profile" className="nav__pointer" onClick={this.onClickNav}>Library</NavbarItem>
                        <NavbarItem  id="nav__profile" className="nav__pointer" onClick={this.onClickNav}>Community</NavbarItem>
                        <NavbarItem  id="nav__profile" className="nav__pointer" onClick={this.onClickNav}>Personality Assessment</NavbarItem>
                    </NavbarMenu>
                    <NavbarItem  id="nav__logout" className="nav__pointer" onClick={this.onClickNav}>Logout</NavbarItem>
                </Navbar>
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
