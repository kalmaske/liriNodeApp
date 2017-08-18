var fs = require("fs"); //reads and writes files
var request = require("request");
var keys = require("./keys.js");
var twitter = require("twitter");
var spotify = require ("spotify");
var liriArg = process.argv[2];


switch(liriArg) {
    case 
        "my-tweets": myTweets(); 
        break;
    case 
        "spotify-this-song": spotifyThisSong(); 
        break;
    case 
        "movie-this": movieThis(); 
        break;
    case 
        "do-what-it-says": doWhatItSays(); 
        break;

    default: 
        console.log("\r\n" +"Try typing one of the following commands after 'node liri.js' : " +"\r\n"+
        "1. my-tweets 'twitter name' " +"\r\n"+
        "2. spotify-this-song 'song name' "+"\r\n"+
        "3. movie-this 'movie name' "+"\r\n"+
        "4. do-what-it-says."+"\r\n"+
        "Be sure to put the movie or song name in quotation marks if it's more than one word.");
};