<!DOCTYPE html>
<html>
	<head>
		<title>The Torrent File Generator</title>

		<script src="generator.js"></script>

		<link rel='stylesheet' type='text/css' href='http://fonts.googleapis.com/css?family=VT323' />

		<link rel="stylesheet" type="text/stylesheet" href="bower_components/uikit/css/uikit.min.css" />
		<link rel="stylesheet" type="text/stylesheet" href="style.css" />
		<link rel="stylesheet" type="text/stylesheet" href="override.css" />

		<link rel="icon" type="image/png" href="favicon.png">
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
			Think this is cool? <a target="_blank" href="https://github.com/Nickersoft/Torrent-Name-Generator">Contribute on Github</a>.
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

			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

			ga('create', 'UA-24989915-3', 'auto');
			ga('send', 'pageview');
		</script>
	</body>
</html>
