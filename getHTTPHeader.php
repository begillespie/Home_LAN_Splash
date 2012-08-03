<?php
$url = $_GET['url'];
$timeout = $_GET['timeout'];
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, 1);
    curl_setopt($ch, CURLOPT_NOBODY, 1);
    curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);

    $header = curl_exec($ch);
	$httpstatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
	echo $httpstatus;
?>