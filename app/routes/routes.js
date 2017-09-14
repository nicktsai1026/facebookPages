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
            getLikePages.pageDetails(path)
                .then((details) => {
                    //...
                    var newPageIdOnly = details[1];
                    db.collection('users').findOne({ fbId: userId }, (err, item) => {
                        if(item.likes) {
                            var oldPageIdOnly = [];
                            item.likes.forEach((val) => {
                                oldPageIdOnly.push(val.id);
                            })
                            let a = new Set(oldPageIdOnly);
                            let b = new Set(newPageIdOnly);
                            // ab difference set差集
                            let differenceABSet = new Set([...a].filter(x => !b.has(x)));
                            let differenceArr = Array.from(differenceABSet);

                            differenceArr.forEach((value) => {
                                db.collection('pagedetails').findOne({ id: value }, (err, item) => {
                                    var newfbUserId = item.fbUserId.filter(function (id) {
                                        return id != userId;
                                    })
                                    db.collection('pagedetails').updateOne({ id: value }, { $set: { fbUserId: newfbUserId } }, (err, item) => {
                                        if (err) return console.log(err)
                                    })
                                })
                            })
                        }
                        var pageObj = {};
                        pageObj.likes = details[0];
                        db.collection('users').updateOne({ fbId: userId }, { $set: pageObj }, (err, item) => {
                            if (err) return console.log(err)
                        })
                    })
                    //.....
                    // var pageObj = {};
                    // pageObj.likes = details;
                    // db.collection('users').updateOne({ fbId: userId }, { $set: pageObj }, (err, item) => {
                    //     if (err) return console.log(err)
                    // })
                    //return details;
                    return details[0];
                })
                .then((detailArr) => {
                    detailArr.forEach((val) => {
                        db.collection('pagedetails').findOne({ id: val.id }, (err, item) => {
                            if (item == null) {
                                val.fbUserId = [this.facebookId];
                                db.collection('pagedetails').insert(val, (err, item) => {
                                    if (err) return console.log(err)
                                })
                            } else {
                                //check fbUserId arr had this facebookId or not
                                var judge = item.fbUserId.indexOf(this.facebookId);
                                if( judge < 0) {
                                    item.fbUserId.push(this.facebookId);
                                    db.collection('pagedetails').updateOne({ id: val.id}, { $set: item}, (err, item) => {
                                        if (err) return console.log(err)
                                    })
                                }
                            }
                        })
                    })
                    //home should be change
                    res.render('home');
                })
                .catch((err) => {
                    console.log(err);
                })
        })
    })



}
