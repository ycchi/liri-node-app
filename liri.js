require("dotenv").config();

var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);

// momentJS
var moment = require("moment");

// capture user command line input
var userCommand = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");

console.log(searchTerm);

// axios
var axios = require("axios");

// switch statement to run corresponding function according to userCommand
switch (userCommand) {
  case "concert-this":
  concertThis();
  break;
  case "spotify-this-song":
  spotifyThis();
  break;
  case "movie-this":
  movieThis();
  break;
  case "do-what-it-says":
  doWhatItSays();
  break;
  default:
  return console.log("command/Search Term not found..");
  break;
}

// bands in town API
function concertThis () {
  axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp")
    .then(function (response){
      let venueName = response.data[0]["venue"]["name"];
      let venueCity = response.data[0]["venue"]["city"];
      let venueCountry = response.data[0]['venue']['country'];
      let concertDate = moment(response.data[0]['datetime']).format("MMMM Do YYYY");
      
      console.log(`Venue: ${venueName}`);
      console.log(`Location: ${venueCity}, ${venueCountry}`);
      console.log(`Date: ${concertDate}`)
    })
}