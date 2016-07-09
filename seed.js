// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var mongoose = require('mongoose');
var db = require('./models/song.js');
var conn = mongoose.createConnection('mongodb://localhost/personal-api');

db.Song.remove({}, function(err) {
  if (err) {
    console.log("ERROR:", err);
  }
});


var favoriteSongs =  [
	{artistName:"testing 1", songName:"test 1", year:"2015"},
	{artistName:"testing 2", songName:"test 2", year: "2016"},
	{artistName:"testing 3", songName:"test 3", year: "2016"}
];





db.Song.create(favoriteSongs, function(err, song){
  if (err){
	 return console.log("Error:", err);
 }
console.log("Created new song", song._id);
// process.exit(); // we're all done! Exit the program.
  mongoose.connection.close();
});
