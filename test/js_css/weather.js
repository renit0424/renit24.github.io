timerID = setInterval('weather()', 600000);
weather();

function weather() {
	//var url = 'https://api.renitapps.com/weather.php';
	var url = 'https://weather.tsukumijima.net/api/forecast?city=270000';
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
		document.getElementById("wename").innerHTML = json['title'];
		document.getElementById("todaydata").innerHTML = json['forecasts'][0]['date'];
		var img = document.getElementById("todayimg");
		img.src = json['forecasts'][0]['image']['url'];
		img.alt = '天気';
		document.getElementById("todayweather").innerHTML = "天気　" + json['forecasts'][0]['telop'];
		document.getElementById("todayhightemp").innerHTML = "最高 " + json['forecasts'][0]['temperature']['max']['celsius']?.toString() ?? "" + "℃";
		document.getElementById("todaylowtemp").innerHTML = "最低 " + json['forecasts'][0]['temperature']['min']['celsius']?.toString() ?? "" + "℃";

		document.getElementById("yesterdaydata").innerHTML = json['forecasts'][1]['date'];
		var img = document.getElementById("yesterdayimg");
		img.src = json['forecasts'][1]['image']['url'];
		img.alt = '天気';
		document.getElementById("yesterdayweather").innerHTML = "天気　" + json['forecasts'][1]['telop'];
		document.getElementById("yesterdayhightemp").innerHTML = "最高 " + json['forecasts'][1]['temperature']['max']['celsius'] + "℃";
		document.getElementById("yesterdaylowtemp").innerHTML = "最低 " + json['forecasts'][1]['temperature']['min']['celsius'] + "℃";

		// var Ww = json['warning'];
		// if ("warning" in json) {
		// 	document.getElementById("warning").innerHTML = Ww;
		// } else {
		// 	console.log("false");
		// 	document.getElementById("warning").innerHTML = "現在発表なし";
		// }
	})
}
