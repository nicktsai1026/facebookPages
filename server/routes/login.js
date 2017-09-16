const passport = require('passport');

module.exports = function (app, db) {

    app.get('/login', (req, res) => {
        res.render('login');
    })

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/home', failureRedirect: '/fail'
        }),
    );

    app.get('/auth/facebook',
        passport.authenticate('facebook'));

    // app.get('/auth/facebook/callback',
    //     passport.authenticate('facebook', { 
    //         successRedirect: 'http://localhost:3000/home',
    //         failureRedirect: 'http://localhost:3000' 
    //     }),);
    // function (req, res) {
    //     // res.redirect('/home');
    //     // res.send('logged in!')
    //     res.redirect('http://localhost:3000')
    // });

}