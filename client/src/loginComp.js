import React, { Component } from 'react';

export default class login extends React.Component{
    render(){
        return (
            <div className="container fblogin">
                <h1> Login to see what you liked!</h1>
                <div className="showlogin">   
                    <a href="http://localhost:8080/auth/facebook">
                    <img src="https://i.stack.imgur.com/LKMP7.png"/></a>
                </div>
            </div>
        )
    }

}