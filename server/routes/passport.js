const passport = require('passport');
const facebookStrategy = require('passport-facebook').Strategy;
const jwt = require('jsonwebtoken');
//const secret = 'accelerateHK';

module.exports = (app, db) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use('facebook', new facebookStrategy({
        clientID: '109100156427112',
        clientSecret: '6fcf61cd163db93babd249db426d73d9',
        callbackURL: 'http://localhost:8080/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'email'],
        enableProof: true
    },
        function (accessToken, refreshToken, profile, cb) {
            var fbInfoObj = {
                access_token: accessToken,
                fbId: profile.id,
                fbName: profile.displayName,
                fbPhoto: profile.photos[0].value
            }
            db.collection('users').findOne({ fbId: profile.id }, (err, item) => {
                if (item == null) {
                    db.collection('users').insert(fbInfoObj, (err, item) => {
                        if (err) {
                            console.log(err)
                        } else {
                            return cb(null, fbInfoObj);
                        }
                    })
                } else {
                    var updatePhoto = { fbPhoto: profile.photos[0].value };
                    db.collection('users').updateOne({ fbId: profile.id }, { $set: updatePhoto }, (err, item) => {
                        if (err) return console.log(err)
                        return cb(null, fbInfoObj);
                    })
                }
            })
        }
    ));

    passport.serializeUser((user, done) => {
        //set token with jwt return to login file
        token = jwt.sign({ userName: user.fbName, userId: user.fbId }, app.get('secret'), {expiresIn:'24h'});
        done(null, user.fbId);
    });

    passport.deserializeUser((id, done) => {
        db.collection('users').findOne({ fbId: id }, (err, item) => {
            if (item == null) {
                done(new Error('Wrong user id.'));
            } else {
                console.log(item)
                done(null, item);
            }
        })
    });

};
