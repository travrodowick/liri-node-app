//-------------------------------------starter stuff----------------------------
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
// var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var Spotify = require("node-spotify-api");
var request = require("request");
var moment = require("moment");
moment().format();

//----------------------get the command line input---------------------------
var cmd = process.argv[2];
var userInput = process.argv.splice(3).join(" ");

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
  }
}
//-------------------------------------------movie-----------------------------------
function movieInfo(userInput) {
  var movieUrl = "http://www.omdbapi.com/?t=" + userInput + "&apikey=trilogy";
  if (movieUrl === undefined) {
    userInput = "mr nobody";
  }
  axios.get(movieUrl).then(function(error, response, body) {
    if (error) {
      errHandling(error);
    } else {
      var movieData =
        "\n ********MOVIE INFO*******" +
        "\n The movie's title is: " +
        response.data.title +
        "\n rating:  " +
        response.data.rating;

      console.log(movieData);
    }
  });
}

//--------------------------------concert-----------------------------------------------

function concertInfo(userInput) {
  if (userInput === undefined) {
    userInput = "Devo";
  }
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        userInput +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      for (var i = 0; i < response.data.length; i++) {
        var concertDate = response.data[i].datetime;
        console.log("concert date:  ", concertDate);
        var dateSplit = concertDate.split("T");

        var concertData =
          "\nWhere: " +
          response.data[i].venue.city +
          "\nWhen: " +
          moment(concertDate[0], "MM-DD-YYYY");
        console.log(concertData);
      }
    });
}

//-----------------------------------song info-------------------------------------------

function songInfo() {
  console.log("spotify running");
}

//----------------------------------error----------------------------------------------------

function errHandling(error) {
  if (error.response) {
    console.log("---------------Data---------------");
    console.log(error.response.data);
    console.log("---------------Status---------------");
    console.log(error.response.status);
    console.log("---------------Status---------------");
    console.log(error.response.headers);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log("Error", error.message);
  }
  console.log(error.config);
}
