<!DOCTYPE html>
<html>
	<head>
		<title>The Torrent File Generator</title>

		<script src="generator.js"></script>

		<link rel='stylesheet' type='text/css' href='http://fonts.googleapis.com/css?family=VT323' />

		<link rel="stylesheet" type="text/stylesheet" href="bower_components/uikit/css/uikit.min.css" />
		<link rel="stylesheet" type="text/stylesheet" href="style.css" />
		<link rel="stylesheet" type="text/stylesheet" href="override.css" />

	</head>
	<body>

		<h1 class="uk-text-center uk-text-light">The Torrent File Generator</h1>
		<h2 class="uk-text-center">What should the name of <i>your</i> next torrent be?</h2>

		<div class="uk-text-center">
			<form class="uk-form">
				<input type="text" id="input" />
				<button autocomplete="off">Generate!</button>
			</form>

			<div class="output"></div>
		</div>

		<footer class="uk-text-center">
			Think this is cool? <a href="https://github.com/Nickersoft/Torrent-Name-Generator">Contribute on Github</a>.
		</footer>

		<script src="bower_components/jquery/dist/jquery.min.js"></script>
		<script src="bower_components/uikit/js/uikit.min.js"></script>
		<script src="bower_components/typed.js/dist/typed.min.js"></script>
		<script src="bower_components/jquery.typer/src/jquery.typer.js"></script>
		<script src="script.js"></script>

		<script>
			$(document).ready(function () {

				$.post("get_torrents.php", { }, function(data) {
					html = data;
					ready = true;
				});

			});
		</script>
	</body>
</html>
