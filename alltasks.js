const express = require('express');
var cors = require('cors')
const app = express();
var MongoClient = require('mongodb').MongoClient;

// ***************Prototype API **************************
// Feature : Enabled CORS. Currently done for all CORS with *, but 
//           we can also make it for a specific URL only to access
// Author: Ismail Baig
// Type : REST API
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// ***************Prototype API **************************
// Feature : Which of all Star Wars movies has the longest opening crawl (counted by number of characters)?
// Author: Ismail Baig
// Type : REST API
// Geiven generic names to API for security reason as it is exposed to outside world.
app.get('/task1', (req, res) => {
    MongoClient.connect('mongodb://candidate:PrototypeRocks123654@ds345028.mlab.com:45028/star-wars', 
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
// Feature : Port Listening
// Author: Ismail Baig
// Type : REST API
app.listen(4000, function () {
    console.log('Rest API is up and is listening on port 4000!');
});