# liriNodeApp

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

LIRI will display your latest tweets for a dummy twitter account .

I sent requests to the Twitter, Spotify and OMDB APIs. Also, founf npm packages for:

1.Twitter

2.Spotify

3. Request - to grab data from OMBD API

liri.js can take in one of the following commands:

First Command
my-tweets : show your last 20 tweets and when they were created at in your terminal/bash window.

Second Command
spotify-this-song: show the following information about the song in your terminal/bash window

	*Artist(s)

	*The song's name

	*A preview link of the song from Spotify

	*The album that the song is from

Third Command
movie-this : output the following information to your terminal/bash window:

	* Title of the movie.

	* Year the movie came out.

	* IMDB Rating of the movie.

	* Rotten Tomatoes Rating of the movie.

	* Country where the movie was produced.
  
	* Language of the movie.
  
	* Plot of the movie.
  
 	* Actors in the movie

Fourth Command
do-what-it-says : Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
