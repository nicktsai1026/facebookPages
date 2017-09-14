const axios = require('axios');
// var allData = [];
// var paginationTag = '&limit=100&after=';


// function getAll(path) {
//     return new Promise((resolve, reject) => {
//         getPages(path);
//         function getPages(path) {
//             axios.get(path)
//                 .then((res) => {
//                     allData = allData.concat(res.data.data)
//                     if (res.data.paging) {
//                         pageAfter = res.data.paging.cursors.after;
//                         totalPath = path + paginationTag + pageAfter;
//                         console.log("The next path is " + totalPath);
//                         getPages(totalPath)
//                     } else {
//                         allData.join(',');
//                         console.log('done!');
//                         return allData
//                     }
//                 })
//                 .then((data) => {
//                     if(data != undefined){
//                         resolve(data)
//                     }
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                 })
//         }
//     })
// }

function pageDetails (path) {
    return new Promise((resolve, reject) => {
        var pageData = [];
        getDetail(path) 
        function getDetail (path) {
            axios.get(path)
                .then((res) => {
                    if (res.data.paging == null) {
                        pageData.join(',');
                        console.log('last page is empty');
                        return pageData;
                    }
                    pageData = pageData.concat(res.data.data)
                    var nextPage = res.data.paging.next;
                    if (nextPage == null) {
                        pageData.join(',');
                        console.log('done');
                        return pageData
                    } else {
                        console.log(nextPage);
                        getDetail(nextPage)
                    }
                })
                .then((data) => {
                    if (data != undefined) {
                        //......
                        var pageIdArr = [];
                        data.forEach((val) => {
                            pageIdArr.push(val.id);
                        })
                        var doubleArr = [];
                        doubleArr.push(data,pageIdArr);
                        resolve(doubleArr)
                        //......

                        //resolve(data)
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    })
}


module.exports.pageDetails = pageDetails;
// module.exports.getAll = getAll;