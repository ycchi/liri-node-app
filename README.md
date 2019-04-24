# LIRI-NODE-APP

## Overview

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.


## What LIRI Can Search

* Upcoming concert information of artist of your search
* Song information  
* Movie data 


## Commands

* node liri.js concert-this "artist"
    * LIRI responds with upcoming concert of your search.
* node liri.js spotify-this-song "song-title"
    * LIRI responds with song information (Title, Artist, Album, Preview URL)
    * if search term is not inputted, LIRI, by default, will search for 'The Sign' by Ace of Base
* node liri.js movie-this "movie-title"
    * LIRI responds with movie data 
    * if search term is not inputted, LIRI, by default, will search for 'Mr. Nobody'.
* node liri.js do-what-it-says 
    * LIRI will run commands according to contents of random.txt


## Screenshot

* concert-this ariana grande


![](https://github.com/ycchi/liri-node-app/blob/master/assets/img/screenshot/concert-this.png)
![](https://github.com/ycchi/liri-node-app/blob/master/assets/img/concert-this-1.gif)
---

* spotify-this-song

![](https://github.com/ycchi/liri-node-app/blob/master/assets/img/screenshot/spotify-this-song.png)
![](https://github.com/ycchi/liri-node-app/blob/master/assets/img/spotify-this-song.gif)
---

* spotify-this-song No Title

![](https://github.com/ycchi/liri-node-app/blob/master/assets/img/screenshot/spotify-this-song-noTitle.png)
![](https://github.com/ycchi/liri-node-app/blob/master/assets/img/spotify-this-song-no%20song.gif)
---

* movie-this


![](https://github.com/ycchi/liri-node-app/blob/master/assets/img/screenshot/movie-this.png)
![](https://github.com/ycchi/liri-node-app/blob/master/assets/img/movie-this.gif)
---

* movie-this No Title


![](https://github.com/ycchi/liri-node-app/blob/master/assets/img/screenshot/movie-this-noTitle.png)
![](https://github.com/ycchi/liri-node-app/blob/master/assets/img/movie-this-noTitle.gif)
---

* do-what-it-says


![](https://github.com/ycchi/liri-node-app/blob/master/assets/img/screenshot/do-what-it-says.png)
![](https://github.com/ycchi/liri-node-app/blob/master/assets/img/do-what-it-says.gif)
---


## Technologies Used

* node JS
* Spotify API
* Bands In Town API
* OMDB API
* Axios 


## Contributor

Young Chi
young.c.chi@gmail.com