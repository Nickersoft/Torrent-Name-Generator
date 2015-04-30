<!DOCTYPE html>
<html>
	<head>
		<title>The Torrent File Generator</title>

		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

		<link rel='stylesheet' type='text/css' media="screen" href='http://fonts.googleapis.com/css?family=VT323' />

		<link rel="stylesheet" type="text/css" media="screen" href="bower_components/uikit/css/uikit.min.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="style.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="override.css" />

		<link rel="icon" type="image/png" href="favicon.png">
        <meta name="viewport" content="width=device-width, initial-scale=1">
	</head>
	<body>

		<h1 id="title" class="uk-text-center uk-text-light">The Torrent File Name Generator</h1>
        <h1 id="mobile-title" class="uk-text-center uk-text-light">TFNG</h1>
		<h2 class="uk-text-center">What should the name of <i>your</i> next torrent be?</h2>

		<div class="uk-text-center">
			<form class="uk-form">
				<input type="text" id="input" />
				<button autocomplete="off">Generate!</button>
			</form>
			<div class="output"></div>
		</div>

		<footer class="uk-text-center">
            <div class="inner">
                Think this is cool? <a target="_blank" href="https://github.com/Nickersoft/Torrent-Name-Generator">Contribute on Github</a>.
            </div>
		</footer>

		<script src="bower_components/jquery/dist/jquery.min.js"></script>
		<script src="bower_components/uikit/js/uikit.min.js"></script>
		<script src="generator.js"></script>

		<script>
			$(document).ready(function () {
				$.post("get_torrents.php", { }, function(data) {
					html = data;
					ready = true;
				});
			});

            $('form').submit(function() {
                $(".output").html('');
                var torrent = generate();
                return false;
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
