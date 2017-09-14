const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const hb = require('express-handlebars');
const session = require('express-session');
const db = require('./config/db');

app.engine('handlebars', hb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'supersecret',
    resave: true,
    saveUninitialized: true
}));

//use style.css file
//app.use('/public', express.static(__dirname + '/public'));

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    require('./app/routes')(app, database);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
})

// for unit test
module.exports.app = app;