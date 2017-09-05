var fs = require("fs"); //reads and writes files
var request = require("request");
var key = require("./key.js");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var liriArg = process.argv[2];
var spotifyKeys = key.spotify;
var spotifyInput = process.argv[3];
var spotify = new Spotify({
    id: 'e0e9d80c39244814b0e529ad845b31be',
    secret: '70db0dee5825472fa26d6d32ee413aa4'
});


switch (liriArg) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotifyThisSong(spotifyInput);
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;

    default:
        console.log("\r\n" + "Try typing one of the following commands after 'node liri.js' : " + "\r\n" +
            "1. my-tweets 'twitter name' " + "\r\n" +
            "2. spotify-this-song 'song name' " + "\r\n" +
            "3. movie-this 'movie name' " + "\r\n" +
            "4. do-what-it-says." + "\r\n" +
            "Make sure that the movie or song name in quotation marks if it's more than one word.");
};

//twitter
function myTweets() {
    var user = new twitter({
        consumer_key: key.twitterKeys.consumer_key,
        consumer_secret: key.twitterKeys.consumer_secret,
        access_token_key: key.twitterKeys.access_token_key,
        access_token_secret: key.twitterKeys.access_token_secret,
    });
    var twitterUsername = process.argv[3];
    if (!twitterUsername) {
        twitterUsername = "LiriTest";
    }
    params = {
        screen_name: twitterUsername
    };
    user.get("statuses/user_timeline", params, function (error, data, response) {
        if (!error) {
            for (var i = 0; i < data.length; i++) {
                //console.log(response);
                var twitterResults =
                    "@" + data[i].user.screen_name + ": " +
                    data[i].text + "\r\n" +
                    data[i].created_at + "\r\n";
                console.log(twitterResults);

            }
        } else {
            console.log("Error :" + JSON.stringify(error));
            return;
        }
    });
}

// Spotify



function spotifyThisSong(spotifyInput) {
    //console.log(spotifyInput);
    if (!spotifyInput) {

        spotifyInput = "summertime sadness";
        console.log(spotifyInput);
    }
    // console.log(spotify);
    spotify.search({
            type: "track",
            query: spotifyInput,
            limit: 5
        },
        function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            var list = data.tracks.items;
            console.log(list);

            for (var i = 0; i < list.length; i++) {

                console.log("Artist(s): " + data.tracks.items[i].album.artists[i] + "\n" +
                        "Song : " + data.tracks.items[i].name +
                        "\n" + "URL Link: " +
                        data.tracks.items[i].preview_url +
                        "\n" + "Album : " + data.tracks.items[i].album.name) +
                    "-------------";
            }
        })
}




//movie this
function movieThis() {
    var movie = process.argv[3];
    if (!movie) {
        movie = "";
    }
    movieName = movie
    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&tomatoes=true&apikey=" + key.OMDB.id, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var movieInfo = JSON.parse(body);
            //console.log(movieObject);
            var movieResults =

                "Title: " + movieInfo.Title + "\r\n" +
                "Year: " + movieInfo.Year + "\r\n" +
                "Imdb Rating: " + movieInfo.imdbRating + "\r\n" +
                "Country: " + movieInfo.Country + "\r\n" +
                "Language: " + movieInfo.Language + "\r\n" +
                "Plot: " + movieInfo.Plot + "\r\n" +
                "Actors: " + movieInfo.Actors + "\r\n" +
                "Rotten Tomatoes Rating: " + movieInfo.tomatoRating + "\r\n" +
                "Rotten Tomatoes URL: " + movieInfo.tomatoURL + "\r\n";

            console.log(movieResults);
            log(movieResults); // call log function
        } else {
            console.log("Error :" + error);
            return;
        }
    });
}

// What It Says function, random.txt
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
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
        if (error) {
            throw error;
        }
    });
}

// };