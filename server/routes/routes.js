const axios = require('axios');
const getLikePages = require('../likePages');

module.exports = function (app, db) {

    app.get('/react', (req, res) => {
        res.render('react') 
    })

    // Add a seperate route for registered users to clean up the code
    app.get('/home', (req, res) => {
        var userId = req.session.passport.user;
        db.collection('users').findOne({ fbId : userId }, (err, item) => {
            if (err) return console.log(err)
            this.accessToken = item.access_token ;
            this.facebookId = item.fbId;
            var path = `https://graph.facebook.com/v2.10/${this.facebookId}/likes?fields=name,fan_count,category,about,link,picture&access_token=${this.accessToken}`;
            getLikePages.pageDetails(path)
                .then((details) => {
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
            
                            // Add another .then() here?
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
                    // res.send(pageObj)
                })
                .catch((err) => {
                    console.log(err);
                })
        })
    })

    app.get('/profile', (req, res) => {
        console.log(req.session)
        var userId = req.session.passport.user;
        db.collection('users').findOne({ fbId: userId }, (err, item) => {
            if (err) return console.log(err)
            var personalInfo= {};
            personalInfo.name = item.fbName;
            personalInfo.picture = item.fbPhoto;
            res.send(personalInfo);
        })
    })

    app.get('/likedPage', (req, res) => {
        // var userId = req.session.passport.user;
        var userId = '1808586925832988';
        db.collection('users').findOne({ fbId: userId }, (err, item) => {
            if (err) return console.log(err)
            var pageArr = item.likes;
            var categoryArr = []
            pageArr.forEach((val) => {
                categoryArr.push(val.category);
            })
            console.log(categoryArr)
        })
    })


    app.get('/checkSamePages', (req, res) => {
        db.collection('pagedetails').find({}).toArray((err, item) => {
            var pageArr = [];
            item.forEach((val) => {
                var checkArr = val.fbUserId;
                if(checkArr != null && checkArr.length > 1) {
                    pageArr.push(val);
                }
            })
            // console.log(pageArr);
        })
    })

    app.get('/morris', (req, res) => {
        var counter = 0;
        db.collection('users').findOne({ fbId: '10155438871243820'}, (err, item) => {
            item.likes.forEach((val)=>{
                counter++;
            })
            console.log(counter);
        })
    })

    app.get('/getCategory', (req, res) => {
        db.collection('pagedetails').find({}).toArray((err, item) => {
            console.log(item);
        })
    })
}


