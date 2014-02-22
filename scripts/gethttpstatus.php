<?php
    $url = $_GET['url'];
    
    $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
//        curl_setopt($ch, CURLOPT_HEADER, 1);
        curl_setopt($ch, CURLOPT_NOBODY, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);

    $header = curl_exec($ch);
    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    echo $httpcode;
//    $httpheader = http_response_code($url);
//    echo($httpheader);
//    var_dump($httpheader);

?>
