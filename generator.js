//Implement a function for converting a string to title case
String.prototype.toTitleCase = function(){
	return this.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
};

//Implement a string trimming method
String.prototype.trim = String.prototype.trim || function () {
	return this.replace(/^\s+|\s+$/g, "");
};

var ready = false; //Has the ajax call finished?
var html  = "";	   //HTML returned by the ajax call

//Generates the torrent name
function generate() {

		//If the ajax call hasn't finished yet...
		if(!ready) {
			$(".output").html("We're still gathering information. Please wait a few seconds, then try again.");
			return;
		}

		//Get the user input from the textbox
		var input    = $("input").eq(0).val();

		//Make sure the user entered something to generate
		if(input.length == 0) {
			$(".output").html("Please enter a term first.");
			return;
		}

		//Get all of the links on the Kickass Torrents homepage
		var links    = $(html).find('.cellMainLink');

		//Stores the names of every torrent on the hompage
		var torrents = [];

		//Scrape the HTML and add them to the new array
		$.each(links, function(i, el) {
			torrents.push($(el).html());
		});

		//Merges groups of array elements based on if they are contained in parentheses ()
		var merge_by_char = function(start_char, end_char, array) {

			var new_array = Array();		//Stores the new array
			var index_blacklist = Array();	//A list of indexes not to add in the new array

			//Iterate through each element
			for(var x = 0; x < array.length; x++) {

				var index = (x + 1); //The next index in the array
				var term = array[x]; //The current element in the array

				//If the string contains the start character but not the end one
				if((term.indexOf(start_char) != -1) && (term.indexOf(end_char) == -1)) {

					//Loop through the elements until we find the end character
					while(index < array.length) {

						//Add the current index to our blacklist
						index_blacklist.push(index);

						//Append the current element to our original element
						term += ' ' + array[index];

						//If we found the last element...
						if(array[index].indexOf(end_char) != -1) {
							//Escape!
							break;
						//If not...
						} else {
							//Continue searching
							index++;
						}
					}

					//Add the full element to our new array
					new_array.push(term);

				} else {

					//Make sure the current term isn't on the blacklist
					var on_blacklist = false;
					for(var a = 0; a < index_blacklist.length; a++) {
						if(index_blacklist[a] == x) {
							on_blacklist = true;
						}
					}

					//If it isn't...
					if(!on_blacklist) {
						//Add it to the new array
						new_array.push(words[x]);
					}
				}
			}

			//Return the new array
			return new_array;
		};

		//Add the user word to the torrent string
		var mix_text = function(text1, text2) {

			//"Torrent-specific" terms
			var index_of_array = Array( text2.indexOf('.'),
									    text2.indexOf('-'),
										text2.indexOf('('),
										text2.indexOf('['),
										text2.indexOf('hdtv'),
										text2.indexOf('x264'),
										text2.indexOf('xvid'),
										text2.indexOf('yify')
									  );

			//Find the earliest occurrence of a torrent-specific term
			var lowest_index = index_of_array[0];
			for(var i = 0; i < index_of_array.length; i++) {

				if((lowest_index == -1) && (index_of_array != -1)) {
					lowest_index = index_of_array[i];
				}
				else if((index_of_array[i] < lowest_index) && (index_of_array[i] != -1)) {
					lowest_index = index_of_array[i];
				}
			}

			var new_text = ""; //Our new string

			//If there is a torrent-specific term in the input string...
			if(lowest_index > -1) {

				//If we are at the start of the string or the previous character is a space...
				if((lowest_index == 0) || (text2.charAt(lowest_index-1) == ' ')) {

					//Append a space to the end of our term
					new_text = text1 + ' ';

				//If not...
				} else {

					//Append the text as-is
					new_text = text1;

				}

			//If there is no torrent-specific term...
			} else {

				//we just use a dash instead
				new_text = text1 + " - ";

			}

			new_text += text2.substr(lowest_index, text2.length - lowest_index);

			return new_text.trim();
		};

		var end_words = {};	//The last word in each title
		var beg_words = []; //The first word in each title
		var word_stat = {}; //Words and words that can come after those words

		//Iterate through each torrent file name
		for(var i = 0; i < torrents.length; i++) {

			//Split the torrent file name by spaces
			var words = torrents[i].split(' ');
			words = merge_by_char('(', ')', words);
			words = merge_by_char('[', ']', words);
			console.log(words);

			//Add the first word to its respective array
			beg_words.push(words[0]);

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

		//Get the generated torrent (without user input)
		var generated_torrent = make_torrent();

		//Mix in the user input and print the torrent name
		$(".output").html("Your torrent file name is<br/><br/>" + mix_text(input, generated_torrent) + ".torrent");

}
