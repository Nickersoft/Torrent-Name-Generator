//https://github.com/gouch/to-title-case/blob/master/to-title-case.js
String.prototype.toTitleCase = function(){
	var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

	return this.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title){
		if (index > 0 && index + match.length !== title.length &&
			match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
			(title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
			title.charAt(index - 1).search(/[^\s-]/) < 0) {
				return match.toLowerCase();
			}

			if (match.substr(1).search(/[A-Z]|\../) > -1) {
				return match;
			}

			return match.charAt(0).toUpperCase() + match.substr(1);
		});
	};

function generate() {

	var name = document.getElementById("input").value;
	var name_trimmed = name.trim().toTitleCase().replace(/\s+/g, ".");

	var movie_types = ["BDRemux",
					   "Bluray",
					   "HDTV",
					   "WEB-DL",
					   "DVD-R",
					   "HDRip",
					   "WEBRip",
					   "BDRip",
					   "TVRip"];

	var audio_types = [	"FLAC",
					   	"320 kbps",
						"256 kbps",
						"128 kbps",
						"APE",
						"PERFECT"];

	var software_types = ["CRACKED",
						  "WAREZ"];

	var artists_old	   = ["Madonna",
						  "Phil Collins",
						  "Mick Jagger",
						  "Bruce Springsteen",
						  "James Taylor",
						  "Prince",
						  "Don Henley",
						  "KISS",
						  "Rick Astley",
						  "Billy Joel"];

	var artists_new	   = ["One Direction",
						  "Justin Bieber",
						  "Fun",
						  "Imagine Dragons",
						  "Taylor Swift",
						  "Katy Perry",
						  "Lady Gaga",
						  "Nicki Manaj",
						  "Eminem",
						  "MAGIC!"];

	var d = new Date();

	var random_movie   	  = movie_types[Math.floor((Math.random() * (movie_types.length - 1)))];
	var random_audio   	  = audio_types[Math.floor((Math.random() * (audio_types.length - 1)))];
	var random_software   = software_types[Math.floor((Math.random() * (software_types.length - 1)))];

	var random_artist1    = artists_old[Math.floor((Math.random() * (artists_old.length - 1)))];
	var random_artist2    = artists_new[Math.floor((Math.random() * (artists_new.length - 1)))];

	var random_artist1_trimmed = random_artist1.trim().toTitleCase().replace(/\s+/g, ".");
	var random_artist2_trimmed = random_artist2.trim().toTitleCase().replace(/\s+/g, ".");

	var random_year1      = Math.floor((Math.random() * (d.getFullYear() - 2000)) + 2000);
	var random_year2      = Math.floor((Math.random() * (d.getFullYear() - 2000)) + 2000);

	if(random_year1 > random_year2) {
		var temp     = random_year2;
		random_year2 = random_year1;
		random_year1 = temp;
	}

	var curyear			  = d.getFullYear();

	var movie_string_1 	  = name_trimmed + ".(" + random_year1 + ").[" + random_movie + "]";
	var movie_string_2	  = random_year1 + "." + name_trimmed + "." + random_movie;
	var movie_string_3    = name_trimmed + "." + random_year1 + "." + random_movie;

	var audio_string_1 	  = random_artist2_trimmed + "." + name_trimmed + ".(" + random_year1 + " - " + random_year2 + ").Discography.[" + random_audio + "]";
	var audio_string_2	  = random_artist2_trimmed + ".(" + name + " FULL ALBUM)." + random_year1 + "." + "[" + random_audio + "]";
	var audio_string_3    = name_trimmed + "." + random_artist1_trimmed + "(feat. + " + random_artist2 + ")" + "." + random_audio;

	var software_string1  = name_trimmed + "." + curyear + ".(" + random_software + ")";
	var software_string2  = name_trimmed + "." + "( " + curyear + " " + random_software + ")";
	var software_string3  = curyear + "." + name_trimmed + "." + random_software;


	var rand_num = Math.floor((Math.random() * (3 - 1)) + 1);
	var title    = "";

	switch(rand_num) {
		case 1:
			var rand = Math.floor((Math.random() * (3 - 1)) + 1);
			switch(rand) {
				case 1:
					title = movie_string_1;
					break;

				case 2:
					title = movie_string_2;
					break;

				case 3:
					title = movie_string_3;
					break;
			}
			break;

		case 2:
			var rand = Math.floor((Math.random() * (3 - 1)) + 1);
			switch(rand) {
				case 1:
					title = audio_string_1;
					break;

				case 2:
					title = audio_string_2;
					break;

				case 3:
					title = audio_string_3;
					break;
			}
			break;

		case 3:
			var rand = Math.floor((Math.random() * (3 - 1)) + 1);
			switch(rand) {
				case 1:
					title = software_string_1;
					break;

				case 2:
					title = software_string_2;
					break;

				case 3:
					title = software_string_3;
					break;
			}
			break;
	}

	document.getElementById("result").innerHTML = title + ".torrent";

}
