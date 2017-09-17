const passport = require('passport');

module.exports = function (app, db) {
    
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/facebookLogin');
    }

    app.get('/login', isLoggedIn, (req, res) => {
        res.render('home');
    })

    app.get('/facebookLogin', (req, res) => {
        res.render('login');
    })

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function (req, res) {
            // redirect home page with jwt token
            res.redirect('/home/' + token);
        });

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