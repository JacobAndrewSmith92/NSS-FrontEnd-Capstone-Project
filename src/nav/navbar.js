import React, { Component } from "react";
// Using bloomer tags to import bulma styling
import { Navbar, NavbarItem, NavbarBurger, NavbarBrand, NavbarMenu, NavbarLink, Image } from "bloomer";
import logo from '../logo.svg';
import 'bulma/css/bulma.min.css'
import './navbar.css'
// import Login from '../LoginRegistration/login'

export default class NavBar extends Component {
    // Storing session storage as an object in state named currentUser
    state = {
        isActive: false,
        firstName: "",
        image: "",
        searchValue: "",
        searchType: "All"
    }

    // Making a fetch request against sessionStorage to find relevant user and storing first name in state
    componentDidMount() {
        const currentUser = sessionStorage.getItem('userId')
        if (currentUser !== null) {
            fetch(`http://127.0.0.1:8088/users/${currentUser}`)
                .then(r => r.json())
                .then(response => {
                    this.setState({
                        firstName: response.name.first,
                        image: response.image
                    })
                })
        }
    }

    // event handler for clicking nav drop down burger
    // sets isActive property in state to the opposite of what it currently is
    // onClickNav = function (e) {
    //     this.setState({
    //         isActive: (!this.state.isActive)
    //     })
    //     document.querySelector("#input__search").value = ""
    //     this.props.setView(e)
    // }.bind(this)

    //on click of search button
    onClickSearch = function (e) {
        //fire function to close navbar
        this.onClickNav(e)

        /*
            add code here
            to fire search functionality
        */
    }.bind(this)

    handleSearchKeyPress = function (event) {
        this.setState({
            searchValue: event.target.value,
        })
    }.bind(this)

    handleSearchTypeChange = function (event) {
        this.setState({
            searchType: event.target.textContent
        })
    }.bind(this)

    render() {
        if (this.props.activeUser !== null){
            // debugger
            return (
                <Navbar>
                    <NavbarBrand>
                        <img src={logo} className="App-logo" alt="logo" />
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
