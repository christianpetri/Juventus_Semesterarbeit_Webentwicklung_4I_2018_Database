let express = require( 'express' );
let app = express();
let path = require( 'path' );
let logger = require( 'morgan' );
let cookieParser = require( 'cookie-parser' );
let bodyParser = require( 'body-parser' );

let MongoClient = require( 'mongodb' ).MongoClient , assert = require( 'assert' );
// Connection URL
let url = 'mongodb://localhost:27017';

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

//test page if the MongoDB is available
app.get( '/' , function (req , res) {
    // Connect to the server
    MongoClient.connect( url , function (err , connection) {
        assert.equal( null , err );
        let message = '';
        if (err) {
            message = '{"response":"Not connected to the MongoDB!"}';
        } else {
            message = '{"response":"Backend connected successfully to the MongoDB"}';
        }
        res.send( message );
        connection.close();
    } );
} );

app.get( '/movie/query/sort/totalresults/desc' , function (req , res) {
    // Connect to the server and open database 'MoviesDB'
    MongoClient.connect( url , function (err , connection) {
        assert.equal( null , err );
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
app.get( '/movie/query/sort/totalresults/asc' , function (req , res) {
    // Connect to the server and open database 'MoviesDB'
    MongoClient.connect( url , function (err , connection) {
        assert.equal( null , err );
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
app.get( '/movie/query/sort/date/asc' , function (req , res) {
    // Connect to the server and open database 'MoviesDB'
    MongoClient.connect( url , function (err , connection) {
        assert.equal( null , err );
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
app.get( '/movie/query/sort/date/desc' , function (req , res) {
    // Connect to the server and open database 'MoviesDB'
    MongoClient.connect( url , function (err , connection) {
        assert.equal( null , err );
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
app.get( '/movie/query/sort/last/5' , function (req , res) {
    MongoClient.connect( url , function (err , connection) {
        assert.equal( null , err );
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

app.get( '/movie/query/date/from/this/date/until/now' , function (req , res) {

    if (req.query.timestampDateFrom != null) {
        MongoClient.connect( url , function (err , connection) {
            assert.equal( null , err );
            let database = connection.db( 'MoviesDB' );
            let collection = database.collection( 'searchHistory' );
            let number = parseInt( req.query.timestampDateFrom );
            collection.find( {'ts': {$gte: number}} , {'sort': [['ts' , 'ascending']]} ).toArray( function (err , docs) { // 'ascending', 'descending'
                assert.equal( err , null );
                //console.log("Found the following records");
                //console.log(docs);
                res.send( docs ); 
            } );
            connection.close();
        } );
    } else {
        res.send( 'Please provide a timestamp (for example ?timestampDateFrom=1525132800000)' );
    }
} );

//Movie search history
app.post( '/moviesearchquery' , function (req , res) {
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
            // Insert the message data into the database
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

app.get( '/moviefavorite/find/all' , function (req , res) {
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
app.post( '/moviefavorite/add' , function (req , res) {
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
app.post( '/moviefavorite/remove' , function (req , res) {
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
app.get( '/is/movie/a/favorite' , function (req , res) {
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

app.listen( 3000 , function () {
    console.log( 'Example app listening on port 3000!' );
} );

// Commands:
// node app.ts
// mongod --dbpath=C:\Users\Linda\Dev\Data\Movies
