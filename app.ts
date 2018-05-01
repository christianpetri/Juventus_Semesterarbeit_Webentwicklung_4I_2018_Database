//import {MovieSearchQuery} from "./MovieSearchQuery";

let express = require( 'express' );
let app = express();
let path = require( 'path' );
//var favicon = require('serve-favicon');
let logger = require( 'morgan' );
let cookieParser = require( 'cookie-parser' );
let bodyParser = require( 'body-parser' );

let MongoClient = require( 'mongodb' ).MongoClient , assert = require( 'assert' );
// Connection URL
let url = 'mongodb://localhost:27017/moviesBE';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {extended: false} ) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname , 'public' ) ) );

app.use( function (req , res , next) {
    res.setHeader( 'Access-Control-Allow-Origin' , '*' );
    res.setHeader( 'Access-Control-Allow-Methods' , 'GET, POST, OPTIONS, PUT, PATCH, DELETE' );
    res.setHeader( 'Access-Control-Allow-Headers' , 'X-Requested-With,content-type' );
    next();
} );

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
app.get( '/' , function (req , res) {
    // Connect to the server
    MongoClient.connect( url , function (err , connection) {
        assert.equal( null , err );
        if (err) {
            let message = 'Not connected to the database!';
            console.log( message );
            res.send( message );
        } else {
            let message = 'Connected successfully to database';
            console.log( message );
            res.send( message );
        }
        connection.close();
    } );
} );

app.get( '/movie/query/sort/totalresults/desc' , function (req , res) { //request result
    // Connect to the server and open database 'MoviesDB'
// Call methods to insert find, update and delete documents
    MongoClient.connect( url , function (err , connection) {
        assert.equal( null , err );
        console.log( "Connected successfully to server" );
        let database = connection.db( 'MoviesDB' );
        let collection = database.collection( 'searchHistory' );
        // Find some documents
        collection.find( {} , {'sort': [['totalResults' , 'descending']]} ).toArray( function (err , docs) { // 'ascending', 'descending'
            assert.equal( err , null );
            //console.log("Found the following records");
            //console.log(docs);
            res.send( docs );
            connection.close();
        } );
    } );
} );
app.get( '/movie/query/sort/totalresults/asc' , function (req , res) { //request result
    // Connect to the server and open database 'MoviesDB'
// Call methods to insert find, update and delete documents
    MongoClient.connect( url , function (err , connection) {
        assert.equal( null , err );
        console.log( "Connected successfully to server" );
        let database = connection.db( 'MoviesDB' );
        let collection = database.collection( 'searchHistory' );
        // Find some documents
        collection.find( {} , {'sort': [['totalResults' , 'ascending']]} ).toArray( function (err , docs) { // 'ascending', 'descending'
            assert.equal( err , null );
            //console.log("Found the following records");
            //console.log(docs);
            res.send( docs );
            connection.close();
        } );
    } );
} );

app.get( '/movie/query/sort/date/asc' , function (req , res) { //request result
    // Connect to the server and open database 'MoviesDB'
// Call methods to insert find, update and delete documents
    MongoClient.connect( url , function (err , connection) {
        assert.equal( null , err );
        console.log( "Connected successfully to server" );
        let database = connection.db( 'MoviesDB' );
        let collection = database.collection( 'searchHistory' );
        // Find some documents
        collection.find( {} , {'sort': [['ts' , 'ascending']]} ).toArray( function (err , docs) { // 'ascending', 'descending'
            assert.equal( err , null );
            //console.log("Found the following records");
            //console.log(docs);
            res.send( docs );
            connection.close();
        } );
    } );
} );

app.get( '/movie/query/sort/date/desc' , function (req , res) { //request result
    // Connect to the server and open database 'MoviesDB'
// Call methods to insert find, update and delete documents
    MongoClient.connect( url , function (err , connection) {
        assert.equal( null , err );
        console.log( "Connected successfully to server" );
        let database = connection.db( 'MoviesDB' );
        let collection = database.collection( 'searchHistory' );
        // Find some documents
        collection.find( {} , {'sort': [['ts' , 'descending']]} ).toArray( function (err , docs) { // 'ascending', 'descending'
            assert.equal( err , null );
            //console.log("Found the following records");
            //console.log(docs);
            res.send( docs );
            connection.close();
        } );
    } );
} );
app.get( '/movie/query/sort/last/5' , function (req , res) { //request result
    // Connect to the server and open database 'MoviesDB'
// Call methods to insert find, update and delete documents
    MongoClient.connect( url , function (err , connection) {
        assert.equal( null , err );
        console.log( "Connected successfully to server" );
        let database = connection.db( 'MoviesDB' );
        let collection = database.collection( 'searchHistory' );
        // Find some documents
        collection.find( {} , {'sort': [['ts' , 'descending']]} ).limit( 5 ).toArray( function (err , docs) { // 'ascending', 'descending'
            assert.equal( err , null );
            //console.log("Found the following records");
            //console.log(docs);
            res.send( docs );
            connection.close();
        } );
    } );
} );

app.get( '/movie/query/date' , function (req , res) { //request result
    // Connect to the server and open database 'MoviesDB'
// Call methods to insert find, update and delete documents
    let dateFrom = '';
    if (req.param( 'timestampDateFrom' ) > '') {
        dateFrom = req.param( 'timestampDateFrom' );
        MongoClient.connect( url , function (err , connection) {
            assert.equal( null , err );
            console.log( "Connected successfully to server" );
            let database = connection.db( 'MoviesDB' );
            let collection = database.collection( 'searchHistory' );
            let number = parseInt( dateFrom );
            collection.find( {'ts': {$gte: number}} , {'sort': [['ts' , 'ascending']]} ).toArray( function (err , docs) { // 'ascending', 'descending' //,  //
                assert.equal( err , null );
                //console.log("Found the following records");
                //console.log(docs);
                res.send( docs );
                connection.close();
            } );
        } );

    } else {
        dateFrom = 'no date';
        res.send( dateFrom );
    }
} );


app.post( '/moviesearchquery' , function (req , res) { //request result
    // Connect to the server and open database 'MoviesDB'
    if (req.param( 'totalResults' ) != null) {
        MongoClient.connect( url , function (err , connection) {
            assert.equal( null , err );
            console.log( "Connected successfully to server!" );
            let database = connection.db( 'MoviesDB' );
            let collection = database.collection( 'searchHistory' );

            let message = {
                searchString: req.param( 'searchQuery' ) ,
                totalResults: req.param( 'totalResults' ) ,
                ts: Date.now()
            };

            // Insert the student data into the database
            collection.insert( [message] , function (err , result) {
                if (err) {
                    console.log( err );
                } else {
                    console.log( result );
                }
            } );
            // Close the database
            connection.close();
        } );
        res.send( "OK" );
    } else {
        res.send( "Not OK. Total Results are NULL" );
    }
} );
app.post( '/moviefavorite/add' , function (req , res) { //request result
    // Connect to the server and open database 'MoviesDB'
    MongoClient.connect( url , function (err , connection) {
        assert.equal( null , err );
        console.log( 'Connected successfully to server!' );
        let database = connection.db( 'MoviesDB' );
        let collection = database.collection( 'favoriteMovies' );

        let message = {id: req.param( 'movieID' )};
        console.log( 'message' + req.param( 'movieID' ) );
        // Insert the student data into the database
        collection.insert( message , {unique: true} , function (err , result) {
            //db.members.createIndex( { "user_id": 1 }, { unique: true } )
            if (err) {
                console.log( err );
                res.send( "Not OK" );
            } else {
                console.log( result );
                res.send( "OK" );
            }
        } );
        // Close the database
        connection.close();
    } );
} );

app.post( '/moviefavorite/remove' , function (req , res) { //request result
    // Connect to the server and open database 'MoviesDB'
    MongoClient.connect( url , function (err , connection) {
        assert.equal( null , err );
        console.log( "Connected successfully to server!" );
        let database = connection.db( 'MoviesDB' );
        let collection = database.collection( 'favoriteMovies' );

        let message = {id: req.param( 'movieID' )};
        console.log( 'id ' + req.param( 'movieID' ) );

        collection.deleteOne( message , function (err , result) {
            assert.equal( err , null );
            //assert.equal(1, result.result.n);
            console.log( result );
            res.send( "Removed" );
        } );
        // Close the database
        connection.close();
    } );
} );
app.get( '/moviefavorite' , function (req , res) { //request result
    // Connect to the server and open database 'MoviesDB'
    MongoClient.connect( url , function (err , connection) {
        assert.equal( null , err );
        console.log( "Connected successfully to server!" );
        let database = connection.db( 'MoviesDB' );
        let collection = database.collection( 'favoriteMovies' );
        // Find the Favorite Movie IDs
        collection.find( {} ).toArray( function (err , docs) {
            assert.equal( err , null );
            //console.log("Found the following records");
            //console.log(docs);
            res.send( docs );
        } );
        // Close the database
        connection.close();
    } );
} );
app.get( '/ismovieafavorite' , function (req , res) { //request result
    // Connect to the server and open database 'MoviesDB'
    MongoClient.connect( url , function (err , connection) {
        assert.equal( null , err );
        console.log( "Connected successfully to server!" );
        let database = connection.db( 'MoviesDB' );
        let collection = database.collection( 'favoriteMovies' );
        let movieID = req.param( 'movieID' );
        console.log( req.param( 'movieID' ) );
        // Find the Favorite Movie IDs

        collection.find( {id: Number( movieID )} ).count( function (err , count) {
            assert.equal( null , err );
            if (err) {
                console.log( err );
                res.send( "err" );
            } else {
                if (count > 0) {
                    console.log( count );
                    res.send( JSON.stringify( {answer: true} ) );
                } else {
                    console.log( count );
                    res.send( JSON.stringify( {answer: false} ) );
                }
            }
        } );
        // Close the database
        connection.close();
    } );


} );

app.get( '/movie/query/sort/date/desc' , function (req , res) { //request result
    // Connect to the server and open database 'MoviesDB'
// Call methods to insert find, update and delete documents
    MongoClient.connect( url , function (err , connection) {
        assert.equal( null , err );
        console.log( "Connected successfully to server" );
        let database = connection.db( 'MoviesDB' );
        let collection = database.collection( 'searchHistory' );
        // Find some documents
        collection.find( {} , {'sort': [['ts' , 'descending']]} ).toArray( function (err , docs) { // 'ascending', 'descending'
            assert.equal( err , null );
            //console.log("Found the following records");
            //console.log(docs);
            res.send( docs );
            connection.close();
        } );
    } );
} );

/*
app.get('/sample', function (req, res) {
	let response = {message: 'you called /sample with GET operation'};
	res.send(response);
});

app.get('/sample', function (req, res) {
    let message = '';
    if(req.param('message') > ''){
        message = req.param('message');
    } else{
        message = 'no query';
    }
    //let response = {message: message};
    let response = message;
    res.send(response);
});

app.post('/sample', function (req, res) {
    let message = req.param('message');
    let response = {message: message};
    res.send(response);
});

app.post('/', function(req, res) { //request , result
	console.log('Request body: ', req.body);
	let result = {message: 'you called /sample with POST operation', originData: req.body};
	res.send(result);
});
*/
app.listen( 3000 , function () {
    console.log( 'Example app listening on port 3000!' );
} );

/*
let insertDocuments = function(db, callback) {
	// Get the documents collection
    let collection = db.collection('documents');
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

let findAll = function(db, callback) {
	// Get the documents collection
    let collection = db.collection('documents');
	// Find some documents
	collection.find({}).toArray(function(err, docs) {
		assert.equal(err, null);
		console.log("Found the following records");
		console.log(docs);
        let response = docs;

		callback(docs); // Call callback function
	});
};

let updateDocument = function(db, callback) {
	// Get the documents collection
    let collection = db.collection('documents');
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

let removeDocument = function(db, callback) {
	// Get the documents collection
    let collection = db.collection('documents');
	// Delete first document where a is 3
	collection.deleteOne({ a : 3 }, function(err, result) {
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		console.log("Removed document with field a equal 3");
		callback(result);
	});
};

let removeFavoriteMovie = function(db, callback) {
	// Get the documents collection
    let collection = db.collection('documents');
	// Delete first document where a is 3
	collection.deleteOne({ a : 3 }, function(err, result) {
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		console.log("Removed document with field a equal 3");
		callback(result);
	});
};
*/

// Commands:
// node app.ts
// mongod --dbpath=C:\Users\Linda\Dev\Data\Movies

