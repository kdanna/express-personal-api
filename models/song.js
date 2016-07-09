// //This is the Schema and model builder for songs

var mongoose = require('mongoose'),

Schema = mongoose.Schema;

var SongSchema = new Schema({
rank: Number,
artistName: String,
songName: String,
year: Number
});


// //creating the model
var Song = mongoose.model("Song", SongSchema);

// //exporting the module song.js to all files that have "required" the Song
module.exports = Song;
