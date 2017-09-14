const axios = require('axios');
var allData = [];
var paginationTag = '&limit=100&after=';

function getAll(path) {
    return new Promise((resolve, reject) => {
        getPages(path);
        function getPages(path) {
            axios.get(path)
                .then((res) => {
                    allData = allData.concat(res.data.data)
                    if (res.data.paging) {
                        pageAfter = res.data.paging.cursors.after;
                        totalPath = path + paginationTag + pageAfter;
                        console.log("The next path is " + totalPath);
                        getPages(totalPath)
                    } else {
                        allData.join(',');
                        console.log('done!');
                        return allData
                    }
                })
                .then((data) => {
                    if(data != undefined){
                        resolve(data)
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    })
}

module.exports.getAll = getAll;