// require express and other modules
var express = require('express');
var mongoose = require('mongoose'); //KD-adding to require mongoose module
// var handlebars = require('express-handlebars');//KD-adding to require handlebars module
var bodyParser = require('body-parser'); // parse incoming urlencoded form data & populate req.body obj
// var routes = require('./config/routes'); //KD - adding to require 

var app = express();
var port = process.env.PORT || 3000;

// mongoose.connect('mongodb://localhost:27017/profile-app'); //KD - adding to connect to mongodb via default


app.use(bodyParser.json()); //KD
app.use(bodyParser.urlencoded({ extended: true }));

// Don't need to use
// Set up our app to accept to use Handlebars
// app.set('views', path.join(__dirname, 'views'));
// app.engine('handlebars', handlebars({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');

/************
 * DATABASE *
 ************/

var db = require('./models');

// var favoriteSongs =  [
//   {_id: 1, artistName:"testing 1", songName:"test 1", year:"2015"},
//   {_id: 2, artistName:"testing 2", songName:"test 2", year: "2016"},
//   {_id: 3, artistName:"testing 3", songName:"test 3", year: "2016"}
// ];


/**********
 * ROUTES *
 **********/



// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



/*
 * JSON API Endpoints
 */

//WORKS
app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    Is_this_Kayce_Danna: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/kdanna/express-personal-api", // CHANGE ME
    base_url: "https://quiet-taiga-58200.herokuapp.com/", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "All about Kayce"},
      {method: "GET", path: "/api/music", description: "Get list of favorite songs"},
      {method: "GET", path: "/api/music/:id", description: "Get a favorite song. Search by rank #."},
      {method: "PUT", path: "/api/music/:id", description: "Update a favorite song"},
      {method: "DELETE",path: "/api/music/:id", description: "Delete if it isn't a favorite song"},
      {method: "POST", path: "/api/music", description: "Post a favorite song. Artist Name, Song Title, and Year it was released"},
       // CHANGE ME
    ]
  });
});

//WORKS! This will return all my profile information that is outlined below
app.get('/api/profile', function api_index(req, res) {
  res.json({
    name:"Kayce Danna",
    github_link: "https://github.com/kdanna/express-personal-api",
    github_profile_image: "https://avatars2.githubusercontent.com/u/18216073?v=3&s=460",
    current_city: "Denver, CO",
    age: "30 years old",
    profession: "jr. web developer",
    hobbies: ["running", "skiing", "mountain biking", "camping", "live music", "park days", "cooking"]
  });
});



//RESTful Routes

//WORKS! INDEX. This endpoint will return all of the objects in the "favoriteSongs" array.
app.get('/api/music', function index(req, res) {
    db.Song.find(function(err, songs){
    if (err) { return console.log("index error: " + err); }
    res.json(songs);
  });
});


//WORKS!  CREATE. This will add to the "favoriteSongs" array.
app.post('/api/music', function create(req, res) {
  var newSong = new db.Song({
    rank: req.body.rank,
    artistName: req.body.artistName,
    songName: req.body.songName,
    year: req.body.year,
  });
    newSong.save(function(err, songs){
      if (err) {
        return console.log("create error: " + err);
      }
      console.log("created ", songs.songName);
      res.json(songs);
    });
});


// WORKS!  SHOW. This endpoint returns a single favoriteSong object based on the user input of rank #.
app.get('/api/music/:id', function show(req, res) {
  var userWants = {"rank":req.params.id};
  db.Song.findOne(userWants, function (err, song){
    if(err){
      console.log(err);
    } 
      res.json(song);
   });
  });


// DOESNT WORK. UPDATE.  This endpoint will update a single favoriteSong object.
app.put('/api/music/:id', function update(req, res) {
  var updateID = req.params.id;
  var update = req.body;
  db.Song.findOneAndUpdate({_id: updateID}, update, function (err, song){
    if(err){
      console.log(err);
    } 
      res.json(song);
   });
  });

//WORKS!  DELETE. This endpoint should delete a favoriteSong and 
app.delete('/api/music/:id', function (req, res) {
 var oneToDelete = req.params.id;
 db.Song.findOneAndRemove({ _id: oneToDelete}, function (err, deletedSong) {
   res.json(deletedSong);
 });
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
