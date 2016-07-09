// // This file allows us to seed our application with data
// // simply run: `node seed.js` from the root of this project folder.

// var mongoose = require('mongoose');
var db = require('./models');
// var conn = mongoose.createConnection('mongodb://localhost/personal-api');




var favoriteSongs =  [
	{rank: 1, artistName:"testing 1", songName:"test 1", year:"2015"},
	{rank: 2, artistName:"testing 2", songName:"test 2", year: "2016"},
	{rank: 3, artistName:"testing 3", songName:"test 3", year: "2016"},
	{rank: 4, artistName:"testing 4", songName:"test 4", year:"2015"},
	{rank: 5, artistName:"testing 5", songName:"test 5", year: "2013"},
	{rank: 6, artistName:"testing 6", songName:"test 6", year: "2012"}
	];


db.Song.remove({}, function(err, songs){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all songs');

    // create new records based on the object favorite songs
    db.Song.create(favoriteSongs, function(err, songs){
      if (err) { return console.log('err', err); }
      console.log("created", favoriteSongs.length, "songs");
      process.exit();
    });
  }
});



