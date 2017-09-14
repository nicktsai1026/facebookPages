const passport = require('passport');

module.exports = function (app, db) {
    
    app.get('/login', (req, res) => {
        res.render('login');
    })

    app.get('/auth/facebook',
        passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function (req, res) {
            res.redirect('/home');
        });
    
}