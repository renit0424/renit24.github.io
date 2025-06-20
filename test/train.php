<?php
header('Access-Control-Allow-Origin: *');
#$url = "https://www.train-guide.westjr.co.jp/api/v3/sanin4.json"; //山陰本線
$url = "https://www.train-guide.westjr.co.jp/api/v3/tozai.json"; //JR東西線
$json = file_get_contents($url);
$json = mb_convert_encoding($json, 'utf-8');
$arr = json_decode($json,true);
$arr = json_encode($arr,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
echo $arr;
?>
