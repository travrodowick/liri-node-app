require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var spotify = new Spotify(keys.spotify);
var fs = require('fs')


function movies () {
    axios.get("http://www.omdbapi.com/?t=enter+the+movie+here").then(
  function(response) {
    // Then we print out the imdbRating
    console.log("The movie's rating is: " + response.data.#####);
  }
);

function concert () {
    
}