import React, { Component } from 'react';
import ContactCard from './contactCard';

export default class Community extends Component {
    state = {
        allContacts: []
    }


    componentDidMount() {
        return fetch(`http://127.0.0.1:8088/users`)
            .then(r => r.json())
            .then(user => {
                const allUsers = user
                allUsers.sort(this.compare)
                this.setState({
                    allContacts: allUsers
                })
            })
    }

    compare = (a, b) => {
        // Use toUpperCase() to ignore character casing
        const firstNameA = a.firstName.toUpperCase();
        const firstNameB = b.firstName.toUpperCase();

        let comparison = 0;
        if (firstNameA > firstNameB) {
            comparison = 1;
        } else if (firstNameA < firstNameB) {
            comparison = -1;
        }
        return comparison;
    }



    render() {
        return (
            <div>
                {this.state.allContacts.map(contact => {
                    <h1>Contacts</h1>
                    return ( <ContactCard
                        key={contact.id}
                        id={contact.id}
                        firstName={contact.firstName}
                        lastName={contact.lastName}
                        image={contact.image}
                        email={contact.email} />)
                })}
            </div>
        )
    }
}