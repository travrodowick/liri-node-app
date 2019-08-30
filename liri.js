//-------------------------------------starter stuff----------------------------
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var request = require("request");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
moment().format();

//----------------------get the command line input---------------------------
var cmd = process.argv[2];
var userInput = process.argv.splice(3).join(" ");
//call get user input to get user input
GetUserInput(cmd, userInput);

function GetUserInput(cmd, userInput) {
  switch (cmd) {
    case "movie-this":
      movieInfo(userInput);
      break;
    case "concert-this":
      concertInfo(userInput);
      break;
    case "spotify-this-song":
      songInfo(userInput);
      break;
    case "do-what-it-says":
      itSays();
      break;
  }
}
//-------------------------------------------movie-----------------------------------
function movieInfo(userInput) {
  var movieUrl = "http://www.omdbapi.com/?t=" + userInput + "&apikey=trilogy";
  if (!movieUrl) {
    userInput = "my nobody";
    console.log("no user input");
  } else {
    axios.get(movieUrl).then(function(response) {
      console.log("taking movie input");
      var movieData =
        "\n ********MOVIE INFO*******" +
        "\n The movie's title is: " +
        response.data.Title +
        "\n Year:  " +
        response.data.Year +
        "\n rating:  " +
        response.data.imdbRating +
        "\n Rotten Tomatoes:  " +
        response.data.Ratings[1].Value +
        "\n ************************";
      console.log(movieData);
    });
  }
}

//--------------------------------concert-----------------------------------------------

function concertInfo(userInput) {
  if (!userInput) {
    console.log("please enter an artist");
  } else {
    axios
      .get(
        "https://rest.bandsintown.com/artists/" +
          userInput +
          "/events?app_id=codingbootcamp"
      )
      .then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
          var concertDate = response.data[i].datetime;
          var formattedDate = moment(concertDate).format("MM-DD-YYYY");
          var concertData =
            "\n *****************************************" +
            "\n------------------------------------------" +
            "\nVenue:  " +
            response.data[i].venue.name +
            "\nWhere: " +
            response.data[i].venue.city +
            "\nWhen: " +
            formattedDate +
            "\n------------------------------------------";
          console.log(concertData);
        }
      });
  }
}

//-----------------------------------song info-------------------------------------------

function songInfo(userInput) {
  if (!userInput) {
    userInput = "the sign";
  } else {
    spotify.search({ type: "track", query: userInput }, function(err, data) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      for (var i = 0; i < data.tracks.items.length; i++) {
        console.log("************************");
        console.log("artist:  ", data.tracks.items[i].album.artists[0].name);
        console.log("song name:  ", data.tracks.items[i].name);
        console.log("album:  ", data.tracks.items[i].album.name);
        console.log(
          "preview URL:  ",
          data.tracks.items[i].album.external_urls.spotify
        );
      }
    });
  }
}
//-------------------------------do what it says-------------------------------

function itSays(userInput) {
  fs.readFile("random.txt", "utf8", function(error, data) {
    var song = data.split(",");
    userInput = song[1];
    songInfo(userInput);
  });
}
