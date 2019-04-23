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
  // if searchTerm not defined..
  if (searchTerm === "") {
    console.log(`
    
    SEARCH TERM NOT DEFINED!
    LIRI WILL SEARCH FOR "Drake"
    `);
    searchTerm = "Drake";
  }

  axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp")
    .then(function (response){

      // console.log(response.data)

      // if exists....
      if (response.data.length === 0) {
        console.log (`
        
        No Upcoming Event of ${searchTerm}
        
        `)
      } else {
        
        //name is undefined???
        // console.log(response.data[0]);

        let venueName = response.data[0]["venue"]["name"];
        let venueCity = response.data[0]["venue"]["city"];
        let venueCountry = response.data[0]['venue']['country'];
        let concertDate = moment(response.data[0]['datetime']).format("MMMM Do YYYY");
        
        // print to console
        console.log(`

        Artist: ${searchTerm}
        Venue: ${venueName}
        Location: ${venueCity}, ${venueCountry}
        Date: ${concertDate}

        `);

        // create obj based on information -> will be used to log
        const concert = {
          venueName: response.data[0]["venue"]["name"],
          venueCity: response.data[0]["venue"]["city"],
        };

        fs.appendFile("log.txt", `\n${JSON.stringify(concert)}`, function(err) {

          // If an error was experienced we will log it.
          if (err) {
            console.log(err);
          }
        
          // If no error is experienced, we'll log the phrase "Content Added" to our node console.
          else {
            console.log("Content Added to log.txt");
          }
        
        });
        


        
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
  if (searchTerm === "") {
    console.log(`
    
    SEARCH TERM NOT DEFINED!
    LIRI WILL SEARCH FOR "MR. NOBODY"
    `);
    searchTerm = "Mr. Nobody";
  }

  axios.get(`http://www.omdbapi.com/?t=${searchTerm}&apikey=e7bc8efb`)
    .then(function (response){
      
      

      let movieTitle = response.data["Title"];
      let movieYear = response.data["Released"];
      let movieRatingIMDB = response.data["Ratings"][0]["Value"];
      let movieRatingRottenTomato = response.data["Ratings"][1]["Value"];
      let movieRatingMetacritic = response.data["Ratings"][2]["Value"];
      let movieCountry = response.data["Country"];
      let movieLanguage = response.data["Language"];
      let moviePlot = response.data["Plot"];
      let movieActors = response.data["Actors"];


      console.log(`

      Title: ${movieTitle}
      Released: ${movieYear}
      IMDB Rating: ${movieRatingIMDB}
      Rotten Tomato Rating: ${movieRatingRottenTomato}
      Metacritic Rating: ${movieRatingMetacritic}
      Country: ${movieCountry}
      Language: ${movieLanguage}
      Plot: ${moviePlot}
      Actors: ${movieActors}
      
      `);
  })
};


// do-what-it-says
function doWhatItSays () {
  fs.readFile("random.txt", "utf8", function(error, response) {

    if (error) {
      return console.log(error);
    }
  
    // Then split it by commas (to make it more readable)
    var dataArr = response.split(",");

    //reassign searchTerm
    searchTerm = dataArr[1]
    
    //run spotify-this-song
    spotifyThis();
  
  });
}