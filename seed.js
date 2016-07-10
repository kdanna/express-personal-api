// // This file allows us to seed our application with data
// // simply run: `node seed.js` from the root of this project folder.

// var mongoose = require('mongoose');
var db = require('./models');
// var conn = mongoose.createConnection('mongodb://localhost/personal-api');




var favoriteSongs =  [
  {rank: 1, artistName:"Sigur Ros", songName:"Untitled 3", year:"2002"},
	{rank: 2, artistName:"Radiohead", songName:"Idioteque", year:"2000"},
	{rank: 3, artistName:"Built to Spill", songName:"You Were Right", year: "1999"},
	{rank: 4, artistName:"Wilco", songName:"Hell is Chrome", year: "2004"},
	{rank: 5, artistName:"Rilo Kiley", songName:"A Better Son / Daughter", year:"2002"},
	{rank: 6, artistName:"Elliot Smith", songName:"Son of Sam", year: "2000"},
	{rank: 7, artistName:"Joanna Newsom", songName:"The Book of Right-On", year: "2004"},
  {rank: 8, artistName:"Wolf Parade", songName:"You are a Runner and I am my Father's Son", year:"2005"},
  {rank: 9, artistName:"Portishead", songName:"Roads", year: "1994"},
  {rank: 10, artistName:"Velvet Underground", songName:"Oh! Sweet Nuthin", year: "1970"}
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



