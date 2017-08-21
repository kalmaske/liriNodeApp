var fs = require("fs"); //reads and writes files
var request = require("request");
var keys = require("./key.js");
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
        "Make sure that the movie or song name in quotation marks if it's more than one word.");
};

//twitter
function myTweets() {
    var user = new twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret, 
    });
    var twitterUsername = process.argv[3];
    if(!twitterUsername){
        twitterUsername = "LiriTest";
    }
    params = {screen_name: twitterUsername};
    user.get("statuses/user_timeline", params, function(error, data, response){
        if (!error) {
            for(var i = 0; i < data.length; i++) {
                //console.log(response); 
                var twitterResults = 
                "@" + data[i].user.screen_name + ": " + 
                data[i].text + "\r\n" + 
                data[i].created_at + "\r\n";
                console.log(twitterResults);
                
            }
        }  else {
            console.log("Error :"+ JSON.stringify(error));
            return;
        }
    });
}

	// Spotify 
	function spotifyThisSong(songName) {
		var songName = process.argv[3];
		if(!songName){
			songName = "I'm Alive";
		}
		params = songName;
		spotify.search({ type: "track", query: params }, function(err, data) {
			if(!err){
                console.log(JSON.stringify(data));
				var songInfo = data.tracks.items;
				for (var i = 0; i < 5; i++) {
					if (songInfo[i] != undefined) {
						var spotifyResults =
						"Artist: " + songInfo[i].artists[0].name + "\r\n" +
						"Song: " + songInfo[i].name + "\r\n" +
						"Album: " + songInfo[i].album.name + "\r\n" +
						"Preview Url: " + songInfo[i].preview_url + "\r\n" ;
						console.log(spotifyResults);
						log(spotifyResults); // calling log function
					}
				}
			}	else {
				console.log("Error :"+ err);
				return;
			}
		});
	};

//movie this
function movieThis(){
    var movie = process.argv[3];
    if(!movie){
        movie = "";
    }
    movieName = movie
    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var movieInfo = JSON.movieName(body);
            //console.log(movieObject); 
            var movieResults =
           
            "Title: " + movieInfo.Title+"\r\n"+
            "Year: " + movieInfo.Year+"\r\n"+
            "Imdb Rating: " + movieInfo.imdbRating+"\r\n"+
            "Country: " + movieInfo.Country+"\r\n"+
            "Language: " + movieInfo.Language+"\r\n"+
            "Plot: " + movieInfo.Plot+"\r\n"+
            "Actors: " + movieInfo.Actors+"\r\n"+
            "Rotten Tomatoes Rating: " + movieInfo.tomatoRating+"\r\n"+
            "Rotten Tomatoes URL: " + movieInfo.tomatoURL + "\r\n";
           
            console.log(movieResults);
            log(movieResults); // call log function
        } else {
            console.log("Error :"+ error);
            return;
        }
    });

    	// What It Says function, random.txt
	function doWhatItSays() {
		fs.readFile("random.txt", "utf8", function(error, data){
			if (!error) {
				doWhatItSaysResults = data.split(",");
				spotifyThisSong(doWhatItSaysResults[0], doWhatItSaysResults[1]);
			} else {
				console.log("Error occurred" + error);
			}
		});
	};
	// What It Says function, log.txt file
	function log(logResults) {
	  fs.appendFile("log.txt", logResults, (error) => {
	    if(error) {
	      throw error;
	    }
	  });
	}
   
};