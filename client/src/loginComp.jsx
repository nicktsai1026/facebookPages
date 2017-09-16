import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends React.Component{
    login () {
        axios.get('http://localhost:8080/auth/facebook')
            .then((data) => {
                console.log(data)
            })
    }

    render(){
        return (
            <div className="container fblogin">
                <h1> Login to see what you liked!</h1>
                <div className="showlogin">   
                    <a href='http://localhost:8080/auth/facebook'>
                    <img src="https://i.stack.imgur.com/LKMP7.png"/></a>
                </div>
            </div>
        )
    }

}