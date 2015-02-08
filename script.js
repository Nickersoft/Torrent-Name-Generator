var i = 0;

$('form').submit(function() {

	$(".output").html('');

	var torrent = generate();

	$(".output").typed({
		strings: ["Your torrent file name is<br/><br/>" + torrent],
		typeSpeed: 0,
		showCursor: false
	});


	return false;
});
