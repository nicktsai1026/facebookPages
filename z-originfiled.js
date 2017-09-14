

module.exports = function (app, db) {

    app.get('/home', (req, res) => {
        var userId = req.session.passport.user;
        db.collection('users').findOne({ fbId: userId }, (err, item) => {
            if (err) return console.log(err)
            this.accessToken = item.access_token;
            this.facebookId = item.fbId;
            var path = `https://graph.facebook.com/v2.10/${this.facebookId}/likes?access_token=${this.accessToken}`;
            //get all like pages
            getLikePages.getAll(path)
                .then((pages) => {
                    var pageObj = {};
                    pageObj.likes = pages;
                    db.collection('users').updateOne({ fbId: userId }, { $set: pageObj }, (err, item) => {
                        if (err) return console.log(err)
                    })
                    return pageObj;
                })
                .then((details) => {
                    var pageArr = details.likes;
                    pageArr.forEach((val) => {
                        axios.get(`https://graph.facebook.com/v2.10/${val.id}?fields=name,fan_count,category,about,link,picture&access_token=${this.accessToken}`)
                            .then((response) => {
                                db.collection('pagedetails').findOne({ id: response.data.id }, (err, item) => {
                                    if (item == null) {
                                        db.collection('pagedetails').insert(response.data, (err, item) => {
                                            if (err) return console.log(err)
                                        })
                                    } else {
                                        db.collection('pagedetails').updateOne({ id: response.data.id }, { $set: response.data }, (err, item) => {
                                            if (err) return console.log(err)
                                        })
                                    }
                                })
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

    app.get('/userlikes', (req, res) => {
        db.collection('pagedetails').find({}, (err, item) => {
            res.send(item);
        })
        // db.collection('pagedetails').find({}).toArray((err, item) => {
        //     res.send(item);
        // })
    })

}