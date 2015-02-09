<?php

$html = file_get_contents('http://kickass.to/');
echo gzdecode($html);

?>
