import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
    getPages(){
        axios.get('http://localhost:8080/home')
            .then((data)=>{
                console.log(data)
            })
    }

}