import React, { Component } from 'react';
import axios from 'axios';

export default class ShowLikes extends Component {
    constructor (props) {
        super(props)
        this.getPages()
    }

    getPages(){
        axios.get('http://localhost:8080/home')
            .then((data)=>{
                console.log(data.data)
            })
    }

    render () {
        return (
            <div >
                <h1> Check out the console! </h1>
            </div>    
        )
    }
}