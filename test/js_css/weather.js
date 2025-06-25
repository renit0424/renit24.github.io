timerID = setInterval('weather()', 10000);
weather();

function weather() {
	var url = 'https://api.renitapps.com/weather.php';
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
		document.getElementById("wename").innerHTML = json['title'];
		document.getElementById("todaydata").innerHTML = json['forecasts'][0]['data'];
		var img = document.getElementById("todayimg");
		img.src = json['today_weather']['img'];
		img.alt = '天気';
		document.getElementById("todayweather").innerHTML = "天気　" + json['forecasts'][0]['telop'];
		document.getElementById("todayhightemp").innerHTML = "最高 " + json[
			'today_weather']['hightemp'] + "[" + json['today_weather'][
			'hightemp_diff'
		] + "]";
		document.getElementById("todaylowtemp").innerHTML = "最低 " + json[
				'today_weather']['lowtemp'] + "[" + json['today_weather']['lowtemp_diff'] +
			"]";

		document.getElementById("yesterdaydata").innerHTML = json[
			'yesterday_weather']['data'];
		var img = document.getElementById("yesterdayimg");
		img.src = json['yesterday_weather']['img'];
		img.alt = '天気';
		document.getElementById("yesterdayweather").innerHTML = "天気　" + json[
			'yesterday_weather']['weather'];
		document.getElementById("yesterdayhightemp").innerHTML = "最高 " + json[
			'yesterday_weather']['hightemp'] + "[" + json['yesterday_weather'][
			'hightemp_diff'
		] + "]";
		document.getElementById("yesterdaylowtemp").innerHTML = "最低 " + json[
			'yesterday_weather']['lowtemp'] + "[" + json['yesterday_weather'][
			'lowtemp_diff'
		] + "]";

		var Ww = json['warning'];
		if ("warning" in json) {
			document.getElementById("warning").innerHTML = Ww;
		} else {
			console.log("false");
			document.getElementById("warning").innerHTML = "現在発表なし";
		}
	})
}
