import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import showLikes from './fbLikes.jsx';
import Login from './loginComp.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<Login />, document.getElementById('login'));
// ReactDOM.render(<showLikes />, document.getElementById('likes'));
registerServiceWorker();
