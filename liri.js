require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var spotify = new Spotify(keys.spotify);
var fs = require('fs');
var Spotify = require('node-spotify-api');

//get the command line input
var cmd = process.argv[2];
var userInput = process.argv.splice(3).join(' ');


function GetUserInput (cmd, userInput) {
    switch (cmd) {
        case 'movie-this':
            movieInfo(userInput);
            break
    };
        {
        case 'concert-this':
            concertInfo(userInput);
            break
    };
};

function movies () {
    axios.get("http://www.omdbapi.com/?t="/*enter+the+movie+here*/"&apikey=trilogy").then(
  function(response) {
    // Then we print out the imdbRating
    console.log("The movie's rating is: " + response.data.#####);
  }
);

function concert () {
    
}

})
  .catch(errHandling(error));



  function errHandling (error){
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
  };
  }