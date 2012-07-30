<?php 
$content = $_POST['content']; 
$fp = fopen("chalkboard.txt","w"); 
fwrite($fp , $content); 
fclose($fp); 
?>