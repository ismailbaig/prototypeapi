const express = require('express');
var cors = require('cors')
const app = express();
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const port = process.env.PORT || 4000;

const url = 'mongodb://candidate:PrototypeRocks123654@ds345028.mlab.com:45028/star-wars';

app.use(express.json())
app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}));
// parse application/json
app.use(bodyParser.json())

/* Use the following code if UI is not sending the content-type properly */
// app.use(function(req, res, next) {
//     if (req.headers['content-type'] === 'application/json;') {
//       req.headers['content-type'] = 'application/json';
//     }
//     next();
// });

// ***************Prototype API **************************
// Feature : Enabled CORS. Currently done for all CORS with *, but 
//           we can also make it for a specific URL only to access
// Author: Ismail Baig
// Type : REST API
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// function validatToken(pwd){
//     const salt = bcrypt.genSaltSync(10);

//     const pwdHashed = bcrypt.hashSync("prototype@123", salt);

//     const validUser = bcrypt.compareSync(pwd, pwdHashed);

//     if(validUser){
        
//     }
// }

app.post('/login', (req, res) => {
    var user = {userid: '11', pwd: '11'}
    var reqId = req.body.userid, reqpwd = req.body.pwd;
    console.log(req.body);

    var isValidUser = (reqId === user.userid && reqpwd === user.pwd);
    res.send(isValidUser);
})

// ***************Prototype API **************************
// Feature : Which of all Star Wars movies has the longest opening crawl (counted by number of characters)?
// Author: Ismail Baig
// Type : REST API
// Geiven generic names to API for security reason as it is exposed to outside world.
app.get('/task1', (req, res) => {
    MongoClient.connect(url, 
    { useNewUrlParser: true,  useUnifiedTopology: true },
    function(err, client) {
        if (err) throw err;
        
        var db = client.db('star-wars');

        var query = {};

        var cursor = db.collection('films').find(query);

        cursor.toArray((err, films) => {
            var lngtCrwlFilm = films.sort(( a, b) => parseInt(b.opening_crawl.length) - parseInt(a.opening_crawl.length))[0]; 
            console.dir(lngtCrwlFilm.opening_crawl.length);
            console.dir(lngtCrwlFilm.title);
            res.send(lngtCrwlFilm.title);

            if(!films){
                client.close();
            }
        })
    })
});


// ***************Prototype API **************************
// Feature : What character (person) appeared in most of the Star Wars films?
// Author: Ismail Baig
// Type : REST API
// Geiven generic names to API for security reason as it is exposed to outside world.
app.get('/task2', (req, res) => {
    MongoClient.connect(url, 
    { useNewUrlParser: true,  useUnifiedTopology: true },
    function(err, client){
        if (err) throw err;
        
        var db = client.db('star-wars');

        var query = {};

        var cursor = db.collection('films').find(query);
        var spList = [];
        cursor.toArray(function(err, films) {
            console.dir('Got flims');
        if (err) throw err;        
        

        films.forEach((film) => {
            film.characters.forEach((chr) => {
                var index = spList.findIndex((obj => obj.id == chr));
                
                index >= 0 ? spList[index].count += 1 : spList.push({id: chr, count: 1})

                })
            })

           var charsIDWithMostFilms = spList
                                    .filter( o => o.count == Math.max.apply(Math,spList.map( o => o.count)));


          console.dir(charsIDWithMostFilms);
        
        cursor = db.collection('people').find(query);

        var final = [];

        cursor.toArray(function(err, people) {
            console.dir('Got people');

            people.forEach( o => charsIDWithMostFilms.forEach (x => x.id == o.id ? x.name = o.name : ''))

            res.send(charsIDWithMostFilms);
        }); 
        client.close();
        });
    });
});

// ***************Prototype API **************************
// Feature : Port Listening
// Author: Ismail Baig
// Type : REST API
app.listen(port, function () {
    console.log('Rest API is up and is listening on port 4000!');
});