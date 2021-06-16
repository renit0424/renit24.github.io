<?php
header('Access-Control-Allow-Origin: *');
require_once('./phpQuery-onefile.php');
$html = file_get_contents('http://www.kmoni.bosai.go.jp/');
if(!isset($html)){
}
else{//html/body/div[3]/div[3]/img[3]
    $doc = phpQuery::newDocument($html);
    $name = $doc->find('body')->find('div:eq(2)')->find('div:eq(0)')->find('img:eq(0)')->attr('src');
    $ary = array('aaa' => $name);
    $json = json_encode($ary);
    $json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
    $arr = json_decode($json,true);
    echo json_encode($arr,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
}
?>