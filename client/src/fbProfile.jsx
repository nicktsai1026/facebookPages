import React, { Component } from 'react';
import axios from 'axios';

export default class fbProfile extends Component {
    constructor (props) {
        super(props)
        this.getProfile = this.getProfile.bind(this);
    }

    getProfile () {
        axios.get('http://localhost:8080/profile')
            .then((data) => {
                console.log(data)
            })
    }

    render(){
        return (
            <div>
                <button type="button" onClick={this.getProfile}>See profile</button>
            </div>
        )
    }
}