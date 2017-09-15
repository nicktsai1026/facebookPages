import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import showLikes from './showLikes';
import Login from './loginComp';
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Login />, document.getElementById('login'));
ReactDOM.render(<showLikes />, document.getElementById('likes'));
registerServiceWorker();
