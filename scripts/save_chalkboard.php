<?php 
$content = $_POST['content']; 
$fp = fopen("../write/chalkboard.txt","w"); 
fwrite($fp , $content); 
fclose($fp); 
?>
