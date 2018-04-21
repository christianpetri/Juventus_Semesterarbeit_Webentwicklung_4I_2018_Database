//import {MovieSearchQuery} from "./MovieSearchQuery";

var express = require('express');
var app = express();
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient, assert = require('assert');
// Connection URL
var url = 'mongodb://localhost:27017/moviesBE';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	next();
});

/*
// Connect to the server and open database 'MoviesDB'
// Call methods to insert find, update and delete documents
MongoClient.connect(url, function(err, connection) {
	assert.equal(null, err);
	console.log("Connected successfully to server");

	var database = connection.db('MoviesDB');

	insertDocuments(database, function() {
		findAll(database, function () {
			updateDocument(database, function () {
				removeDocument(database, function () {
					connection.close();
				});
			});
		});
	});

});
*/
/*
app.get('/movie/query/sort/date', function (req, res) { //request result
    // Connect to the server and open database 'MoviesDB'
    // Call methods to insert find, update and delete documents
    MongoClient.connect(url, function(err, connection) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        var database = connection.db('MoviesDB');
        var collection = database.collection('searchHistory');
        // Find some documents
        collection.find({} , {'sort' : [['ts', 'ascending']]}).toArray(function(err, docs) { // 'ascending', 'descending'
            assert.equal(err, null);
            //console.log("Found the following records");
            //console.log(docs);
            var response = docs;
            res.send(response);
            connection.close();
        });
    });
});
*/

app.get('/movie/query/sort/totalresults/desc', function (req, res) { //request result
    // Connect to the server and open database 'MoviesDB'
// Call methods to insert find, update and delete documents
    MongoClient.connect(url, function(err, connection) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        var database = connection.db('MoviesDB');
        var collection = database.collection('searchHistory');
        // Find some documents
        collection.find({} , {'sort' : [['totalResults', 'descending']]}).toArray(function(err, docs) { // 'ascending', 'descending'
            assert.equal(err, null);
            //console.log("Found the following records");
            //console.log(docs);
            var response = docs;
            res.send(response);
            connection.close();
        });
    });
});
app.get('/movie/query/sort/totalresults/asc', function (req, res) { //request result
    // Connect to the server and open database 'MoviesDB'
// Call methods to insert find, update and delete documents
    MongoClient.connect(url, function(err, connection) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        var database = connection.db('MoviesDB');
        var collection = database.collection('searchHistory');
        // Find some documents
        collection.find({} , {'sort' : [['totalResults', 'ascending']]}).toArray(function(err, docs) { // 'ascending', 'descending'
            assert.equal(err, null);
            //console.log("Found the following records");
            //console.log(docs);
            var response = docs;
            res.send(response);
            connection.close();
        });
    });
});

app.get('/movie/query/sort/date/asc', function (req, res) { //request result
    // Connect to the server and open database 'MoviesDB'
// Call methods to insert find, update and delete documents
    MongoClient.connect(url, function(err, connection) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        var database = connection.db('MoviesDB');
        var collection = database.collection('searchHistory');
        // Find some documents
        collection.find({} , {'sort' : [['ts', 'ascending']]}).toArray(function(err, docs) { // 'ascending', 'descending'
            assert.equal(err, null);
            //console.log("Found the following records");
            //console.log(docs);
            var response = docs;
            res.send(response);
            connection.close();
        });
    });
});

app.get('/movie/query/sort/date/desc', function (req, res) { //request result
    // Connect to the server and open database 'MoviesDB'
// Call methods to insert find, update and delete documents
    MongoClient.connect(url, function(err, connection) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        var database = connection.db('MoviesDB');
        var collection = database.collection('searchHistory');
        // Find some documents
        collection.find({} , {'sort' : [['ts', 'descending']]}).toArray(function(err, docs) { // 'ascending', 'descending'
            assert.equal(err, null);
            //console.log("Found the following records");
            //console.log(docs);
            var response = docs;
            res.send(response);
            connection.close();
        });
    });
});

app.post('/moviesearchquery', function (req, res) { //request result
    // Connect to the server and open database 'MoviesDB'
    MongoClient.connect(url, function(err, connection) {
        assert.equal(null, err);
        console.log("Connected successfully to server!");
        var database = connection.db('MoviesDB');
        var collection = database.collection('searchHistory');

        var message = {searchString: req.param('searchQuery'),totalResults: req.param('totalResults'), ts: Date.now()};

        // Insert the student data into the database
        collection.insert([message], function (err, result){
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });
        // Close the database
        connection.close();
    });
    res.send("OK");
});
app.post('/moviefavorite/add', function (req, res) { //request result
    // Connect to the server and open database 'MoviesDB'
    MongoClient.connect(url, function(err, connection) {
        assert.equal(null, err);
        console.log("Connected successfully to server!");
        var database = connection.db('MoviesDB');
        var collection = database.collection('favoriteMovies');

        var message = {id: req.param('movieID')};
        console.log('message' + req.param('movieID'));
        // Insert the student data into the database
        collection.insert(message,{ unique: true }, function (err, result){
            //db.members.createIndex( { "user_id": 1 }, { unique: true } )
            if (err) {
                console.log(err);
                res.send("Not OK");
            } else {
                console.log(result);
                res.send("OK");
            }
        });
        // Close the database
        connection.close();
    });
});

app.post('/moviefavorite/remove', function (req, res) { //request result
    // Connect to the server and open database 'MoviesDB'
    MongoClient.connect(url, function(err, connection) {
        assert.equal(null, err);
        console.log("Connected successfully to server!");
        var database = connection.db('MoviesDB');
        var collection = database.collection('favoriteMovies');

        var message = {id: req.param('movieID')};
        console.log('id ' + req.param('movieID'));

        collection.deleteOne(message, function(err, result) {
            assert.equal(err, null);
            //assert.equal(1, result.result.n);
            console.log("Removed");
            //console.log(result);
            res.send("Removed");
        });
        // Close the database
        connection.close();
    });
});
app.get('/moviefavorite', function (req, res) { //request result
    // Connect to the server and open database 'MoviesDB'
    MongoClient.connect(url, function(err, connection) {
        assert.equal(null, err);
        console.log("Connected successfully to server!");
        var database = connection.db('MoviesDB');
        var collection = database.collection('favoriteMovies');
        // Find the Favorite Movie IDs
        collection.find({}).toArray(function(err, docs) {
            assert.equal(err, null);
            //console.log("Found the following records");
            //console.log(docs);
            var response = docs;
            res.send(response);
        });
        // Close the database
        connection.close();
    });
});
app.get('/ismovieafavorite', function (req, res) { //request result
    // Connect to the server and open database 'MoviesDB'
    MongoClient.connect(url, function(err, connection) {
        assert.equal(null, err);
        console.log("Connected successfully to server!");
        var database = connection.db('MoviesDB');
        var collection = database.collection('favoriteMovies');
        var movieID = req.param('movieID');
        console.log(req.param('movieID'));
        // Find the Favorite Movie IDs

        collection.find({id : Number(movieID)}).count(function(err, count) {
            assert.equal(null, err);
            if (err) {
                console.log(err);
                res.send("err");
            } else {
                if(count>0){
                    console.log(count);
                    res.send(JSON.stringify({ answer: true }));
                } else{
                    console.log(count);
                    res.send(JSON.stringify({ answer: false }));
                }
            }
        });
        // Close the database
        connection.close();
    });


});

app.get('/movie/query/sort/date/desc', function (req, res) { //request result
    // Connect to the server and open database 'MoviesDB'
// Call methods to insert find, update and delete documents
    MongoClient.connect(url, function(err, connection) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        var database = connection.db('MoviesDB');
        var collection = database.collection('searchHistory');
        // Find some documents
        collection.find({} , {'sort' : [['ts', 'descending']]}).toArray(function(err, docs) { // 'ascending', 'descending'
            assert.equal(err, null);
            //console.log("Found the following records");
            //console.log(docs);
            var response = docs;
            res.send(response);
            connection.close();
        });
    });
});

/*
app.get('/sample', function (req, res) {
	var response = {message: 'you called /sample with GET operation'};
	res.send(response);
});

app.post('/sample', function (req, res) {
    var message = req.param('message');
    var response = {message: message};
    res.send(response);
});

app.post('/', function(req, res) { //request , result
	console.log('Request body: ', req.body);
	var result = {message: 'you called /sample with POST operation', originData: req.body};
	res.send(result);
});
*/
app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});

var insertDocuments = function(db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	// Insert some documents
	collection.insertMany([ {a : 1}, {a : 2}, {a : 3} ],
		function(err, result) {
			assert.equal(err, null);
			assert.equal(3, result.result.n); // result = the document
			assert.equal(3, result.ops.length); // ops = the inserted docs
			console.log("Inserted 3 documents into the collection");
			callback(result); // Call callback function
		});
};

var findAll = function(db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	// Find some documents
	collection.find({}).toArray(function(err, docs) {
		assert.equal(err, null);
		console.log("Found the following records");
		console.log(docs);
        var response = docs;

		callback(docs); // Call callback function
	});
};

var updateDocument = function(db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	// Update first document where a is 2, set b equal to 1
	// $set updates existing attributes or inserts new attributes
	collection.updateOne({ a : 2 } , { $set: { b : 1 } },
		function(err, result) {
			assert.equal(err, null);
			assert.equal(1, result.result.n);
			console.log("Updated document with field a equal 2");
			callback(result);
		});
};

var removeDocument = function(db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	// Delete first document where a is 3
	collection.deleteOne({ a : 3 }, function(err, result) {
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		console.log("Removed document with field a equal 3");
		callback(result);
	});
};

var removeFavoriteMovie = function(db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	// Delete first document where a is 3
	collection.deleteOne({ a : 3 }, function(err, result) {
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		console.log("Removed document with field a equal 3");
		callback(result);
	});
};


// Commands:
// node app.ts
// mongod --dbpath=C:\Users\Linda\Dev\Data\Movies