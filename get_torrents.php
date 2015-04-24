<?php

//Get the homepage HTML for Kickass Torrents
$html = file_get_contents('http://kickasstorrents.im/');
echo gzdecode($html);

?>
