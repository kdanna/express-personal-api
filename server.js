// require express and other modules
var express = require('express');
var mongoose = require('mongoose'); //KD-adding to require mongoose module
// var handlebars = require('express-handlebars');//KD-adding to require handlebars module
var bodyParser = require('body-parser'); // parse incoming urlencoded form data & populate req.body obj
// var routes = require('./config/routes'); //KD - adding to require 

var app = express();


// mongoose.connect('mongodb://localhost:27017/profile-app'); //KD - adding to connect to mongodb via default


app.use(bodyParser.json()); //KD
app.use(bodyParser.urlencoded({ extended: true }));

//KD - Set up our app to accept to use Handlebars
// app.set('views', path.join(__dirname, 'views'));
// app.engine('handlebars', handlebars({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');

/************
 * DATABASE *
 ************/

var db = require('./models');

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

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    Is_this_Kayce_Danna: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/kdanna/express-personal-api", // CHANGE ME
    base_url: "https://quiet-taiga-58200.herokuapp.com/", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "All about Kayce"}, // CHANGE ME
      {method: "POST", path: "/api/music", description: "Post a favorite song"} // CHANGE ME
    ]
  });
});


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





/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
