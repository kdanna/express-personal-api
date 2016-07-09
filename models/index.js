// //This is the index that server.js pulls from.

var mongoose = require("mongoose");
mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL ||
                  "mongodb://localhost/personal-api");


module.exports.Song = require("./song.js");








// Shold this go from to another file?? musicController 

// // var musicController = {
// //   index: function(req, res) {
// //     Reminder.find({}, function(err, docs) {
// //       res.json("music/index");
// //     });	
// //   }
// // };

// // module.exports = remindersController;


// // app.get("/music", remindersController.index);
// // app.get("/music/new", remindersController.new);
// // app.post("/music", remindersController.create);