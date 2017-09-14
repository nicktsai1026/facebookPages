const axios = require('axios');
const getLikePages = require('../likePages');

module.exports = function (app, db) {

    app.get('/home', (req, res) => {
        var userId = req.session.passport.user;
        db.collection('users').findOne({ fbId : userId }, (err, item) => {
            if (err) return console.log(err)
            this.accessToken = item.access_token;
            this.facebookId = item.fbId;
            var path = `https://graph.facebook.com/v2.10/${this.facebookId}/likes?fields=name,fan_count,category,about,link,picture&access_token=${this.accessToken}`;
            axios.get(path)
                .then((response) => {
                    var pageObj = {}
                    pageObj.likes = response.data.data;
                    db.collection('users').updateOne({ fbId: userId }, { $set: pageObj }, (err, item) => {
                        if (err) return console.log(err)
                    })
                    //home should be change
                    res.render('home');
                })
        })
    })



}
