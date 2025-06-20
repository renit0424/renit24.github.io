<?php
  header('Access-Control-Allow-Origin: *');
  require_once('./phpQuery-onefile.php');
  #$html = file_get_contents('https://tenki.jp/forecast/7/35/6810/32203/'); //島根県出雲市
  $html = file_get_contents('https://tenki.jp/forecast/6/30/6200/27100/'); //大阪府大阪市
  if(!isset($html)){
  }
  else{
      $doc = phpQuery::newDocument($html);
      $name = substr($doc->find('section.section-wrap')->find('h2')->text(),0,-17);
      $today = substr($doc->find('div.forecast-days-wrap')->find('section:eq(0)')->find('h3')->text(),0,-8);
      $weathertelop = $doc->find('section.today-weather')->find('div:eq(0)')->find('div:eq(0)')->find('p')->text();
      $weather_img = $doc->find('section.today-weather')->find('div:eq(0)')->find('div:eq(0)')->find('img')->attr('src');
      $hightemp = $doc->find('section.today-weather')->find('div:eq(0)')->find('div:eq(1)')->find('dl')->find('dd:eq(0)')->find('span:eq(0)')->text();
      $hightemp_diff = str_replace('[', '',str_replace(']', '', $doc->find('section.today-weather')->find('div:eq(0)')->find('div:eq(1)')->find('dl')->find('dd:eq(1)')->text()));
      $lowtemp = $doc->find('section.today-weather')->find('div:eq(0)')->find('div:eq(1)')->find('dl')->find('dd:eq(2)')->find('span:eq(0)')->text();
      $lowtemp_diff = str_replace('[', '',str_replace(']', '', $doc->find('section.today-weather')->find('div:eq(0)')->find('div:eq(1)')->find('dl')->find('dd:eq(3)')->text()));

      $yesday = substr($doc->find('section.tomorrow-weather')->find('h3')->text(),0,-8);
      $weathertelop2 = $doc->find('section.tomorrow-weather')->find('div:eq(0)')->find('div:eq(0)')->find('p')->text();
      $weather_img2 = $doc->find('section.tomorrow-weather')->find('div:eq(0)')->find('div:eq(0)')->find('img')->attr('src');
      $hightemp2 = $doc->find('section.tomorrow-weather')->find('div:eq(0)')->find('div:eq(1)')->find('dl')->find('dd:eq(0)')->find('span:eq(0)')->text();
      $hightemp_diff2 = str_replace('[', '',str_replace(']', '', $doc->find('section.tomorrow-weather')->find('div:eq(0)')->find('div:eq(1)')->find('dl')->find('dd:eq(1)')->text()));
      $lowtemp2 = $doc->find('section.tomorrow-weather')->find('div:eq(0)')->find('div:eq(1)')->find('dl')->find('dd:eq(2)')->find('span:eq(0)')->text();
      $lowtemp_diff2 = str_replace('[', '',str_replace(']', '', $doc->find('section.tomorrow-weather')->find('div:eq(0)')->find('div:eq(1)')->find('dl')->find('dd:eq(3)')->text()));
      $warning = $doc->find('body')->find('div')->find('section')->find('div:eq(1)')->find('div')->find('a')->find('dl')->find('dd')->text();
      if(isset($warning)==true){
      $ary = array(
        'name'=> $name, 
        'warning' => $warning,
        'today_weather'=> array(
          'data' => $today,
          'weather' => $weathertelop,
          'img' => $weather_img,
          'hightemp' => $hightemp.'℃',
          'hightemp_diff' => $hightemp_diff,
          'lowtemp' => $lowtemp.'℃',
          'lowtemp_diff' => $lowtemp_diff
        ),
        'yesterday_weather'=> array(
          'data'=> $yesday,
          'weather' => $weathertelop2,
          'img' => $weather_img2,
          'hightemp' => $hightemp2.'℃',
          'hightemp_diff' => $hightemp_diff2,
          'lowtemp' => $lowtemp2.'℃',
          'lowtemp_diff' => $lowtemp_diff2
        )
      );
      }
      else{
        $ary = array(
          'name'=> $name, 
          'today_weather'=> array(
            'data' => $today,
            'weather' => $weathertelop,
            'img' => $weather_img,
            'hightemp' => $hightemp.'℃',
            'hightemp_diff' => $hightemp_diff,
            'lowtemp' => $lowtemp.'℃',
            'lowtemp_diff' => $lowtemp_diff
          ),
          'yesterday_weather'=> array(
            'data'=> $yesday,
            'weather' => $weathertelop2,
            'img' => $weather_img2,
            'hightemp' => $hightemp2.'℃',
            'hightemp_diff' => $hightemp_diff2,
            'lowtemp' => $lowtemp2.'℃',
            'lowtemp_diff' => $lowtemp_diff2
          )
        );
      }
      
      $json = json_encode($ary);
      $json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
      $arr = json_decode($json,true);
      echo json_encode($arr,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
  }
?>
