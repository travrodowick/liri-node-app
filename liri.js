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
  if (!movieUrl) {
    userInput = "mr nobody";
  }
  axios.get(movieUrl).then(function(error, response, body) {
    if (error) {
      errHandling(error);
    } else {
      var movieData =
        "\n ********MOVIE INFO*******" +
        "\n The movie's title is: " +
        response.data.Title +
        "\n Year:  " +
        response.data.Year +
        "\n rating:  " +
        response.data.imdbRating +
        "\n Rotten Tomatoes:  " +
        response.data.Ratings[1].Value("\n ************************");

      console.log(movieData);
    }
  });
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
            "\n------------------------------------------" +
            "\nVenue:  " +
            response.data[i].venue.name +
            "\nWhere: " +
            response.data[i].venue.city +
            "\nWhen: " +
            formattedDate;
          ("\n------------------------------------------");
          console.log(concertData);
        }
      });
  }
}

//-----------------------------------song info-------------------------------------------

function songInfo() {
  console.log("spotify running");
}

//----------------------------------error handling--------------------------------------------

// function errHandling(error) {
//   if (error.response) {
//     console.log("---------------Data---------------");
//     console.log(error.response.data);
//     console.log("---------------Status---------------");
//     console.log(error.response.status);
//     console.log("---------------Status---------------");
//     console.log(error.response.headers);
//   } else if (error.request) {
//     console.log(error.request);
//   } else {
//     console.log("Error", error.message);
//   }
//   console.log(error.config);
// }
