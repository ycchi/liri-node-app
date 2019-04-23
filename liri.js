require("dotenv").config();

var keys = require("./keys.js");

// fs
var fs = require("fs");

// spotify
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// momentJS
var moment = require("moment");

// capture user command line input
var userCommand = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");


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

      // console.log(response.data)

      // if exists....
      if (response.data.length === 0) {
        console.log (`No Upcoming Event of ${searchTerm}`)
      } else {
        
        //name is undefined???
        console.log(response.data[0]);

        let venueName = response.data[0]["venue"]["name"];
        let venueCity = response.data[0]["venue"]["city"];
        let venueCountry = response.data[0]['venue']['country'];
        let concertDate = moment(response.data[0]['datetime']).format("MMMM Do YYYY");
        
        console.log(`Artist: ${searchTerm}`)
        console.log(`Venue: ${venueName}`);
        console.log(`Location: ${venueCity}, ${venueCountry}`);
        console.log(`Date: ${concertDate}`)
      }
    })
};

// spotify
function spotifyThis () {
  spotify.search({ type: 'track', query: searchTerm }, function(err, response) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    
    let previewURL = response.tracks.items[0]["preview_url"]; 
    let artist = response.tracks.items[0]["artists"][0]["name"];
    let title = response.tracks.items[0]["name"];
    let album = response.tracks.items[0]["album"]["name"]
  
    console.log(`

    Artist: ${artist}
    Title: ${title}
    Album: ${album}
    Preview: ${previewURL}

    `);
  });
};



// OMDB API
function movieThis() {
  axios.get(`http://www.omdbapi.com/?t=${searchTerm}&apikey=e7bc8efb`)
    .then(function (response){
      
      

      let movieTitle = response.data["Title"];
      let movieYear = response.data["Released"];
      let movieRatingIMDB = response.data["Ratings"][0]["Value"];
      let movieRatingRottenTomato = response.data["Ratings"][1]["Value"];
      let movieRatingMetacritic = response.data["Ratings"][2]["Value"];
      let movieCountry = response.data["Country"];
      let movieLanguage = response.data["Language"];
      let moviePlot = response.data["Plot"]
      let movieActors = response.data["Actors"]

      // way to search by property name in object???

      // console.log(response.data["Ratings"][0]["Value"]);
      // for (let i = 0; i < response.data["Ratings"].length; i ++) {
      //   if (response.data["Ratings"][i]["Source"]==='Internet Movie Database') {
      //     console.log(this["Value"]);
      //     movieRatingIMDB = this["Value"];
      //   }
      // }

      console.log("Title: " + movieTitle);
      console.log("Released: " + movieYear);
      console.log("IMDB Rating: " + movieRatingIMDB);
      console.log("Rotten Tomato Rating: " + movieRatingRottenTomato);
      console.log("Metacritic Rating: " + movieRatingMetacritic);
      console.log("Country: " + movieCountry);
      console.log("Language: " + movieLanguage);
      console.log("Plot: " + moviePlot);
      console.log("Actors: " + movieActors);
  })
}