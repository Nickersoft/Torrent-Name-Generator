String.prototype.toTitleCase = function(){
	return this.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
};

var ready = false;
var html  = "";

function generate() {

		if(!ready) {
			$(".output").html("We're still gathering information. Please wait a few seconds, then try again.");
			return;
		}

		var input    = $("input").eq(0).val();

		var links    = $(html).find('.cellMainLink');
		var torrents = [];

		$.each(links, function(i, el) {
			torrents.push($(el).html());
		});

		//Add the user word to the torrent string
		var mix_text = function(text1, text2) {
			var index_of_dot = text2.indexOf('.');
			var index_of_dot = text2.indexOf('-');
			var index_of_dot = text2.indexOf('(');
			var index_of_dot = text2.indexOf('[');
			var index_of_dot = text2.indexOf('hdtv');
			var index_of_dot = text2.indexOf('x264');
			var index_of_dot = text2.indexOf('xvid');
			var index_of_dot = text2.indexOf('yify');
			var index_of_dot = text2.indexOf('.');
			var index_of_dot = text2.indexOf('.');
			var index_of_dot = text2.indexOf('.');
			var index_of_dot = text2.indexOf('.');
			var index_of_dot = text2.indexOf('.');
			var index_of_dot = text2.indexOf('.');
			var index_of_dot = text2.indexOf('.');
			var index_of_dot = text2.indexOf('.');

		};

		var end_words = {};	//The last word in each title
		var beg_words = []; //The first word in each title
		var word_stat = {}; //Words and words that can come after those words

		//Iterate through each torrent file name
		for(var i = 0; i < torrents.length; i++) {

			//Split the torrent file name by spaces
			var words = torrents[i].split(' ');

			//Add the first word to its respective array
			beg_words.push(words[0]);
		//	beg_words.push(input);

			//Add the last word to its respective array
			end_words[words[words.length - 1]] = true;

			//Iterate through each word (excluding the last one)
			for(var j = 0; j < words.length - 1; j++) {

				var curr_word = words[j];
				var next_word = words[j + 1];

				//If we've already put this word in our list...
				if(word_stat.hasOwnProperty(words[j])) {
					//...add the following word to its key...
					word_stat[curr_word].push(next_word);
					//...throw in the inputted word as well...
				//	word_stat[curr_word].push(input);
				} else {
					//...if not, add the next word to a new key array
					word_stat[curr_word] = [next_word];
				}
			}
		}

		//Randomly selects a value out of a given array
		var choice = function(arr) {
			var i = Math.floor(arr.length * Math.random());
			return arr[i];
		};

		//Create a random torrent name using a Markov chain
		var make_torrent = function(min_length) {

			//Randomly select a beginning word
			var word = choice(beg_words);

			//Use the first word to initialize a title array
			var title = [word];

			//Progressively add new words
			while(word_stat.hasOwnProperty(word)) {

				//Get a list of available next words
				var next_words = word_stat[word];

				//Randomly select the next word
				word = choice(next_words);

				//Append the word to the title
				title.push(word);

				//If we can safely end the title
				if(title.length > min_length && end_word.hasOwnProperty(word)) {
					//...break
					break;
				}

			}

			//If our title isn't long enough...
			if(title.length < min_length) {
				//make another torrent
				return make_torrent(min_length);
			}

			//Concatenate the title with spaces
			return title.join(' ');

		}

		//Print the torrent name
		$(".output").html(make_torrent() + ".torrent");

}
