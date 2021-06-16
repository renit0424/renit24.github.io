timerID = setInterval('quake()', 60000);
quake();

function quake() {
	var url = 'https://api.renitapps.com/quake.php';
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
		var issue = json[0].issue.type;
		var type = "";
		if (issue == "ScalePrompt") {
			type = "震度速報"
		} else if (issue == "Destination") {
			type = "震源情報"
		} else if (issue == "ScaleAndDestination") {
			type = "震度・震源情報"
		} else if (issue == "DetailScale") {
			type = "各地の震度情報"
		} else if (issue == "Foreign") {
			type = "遠方地震情報"
			var elem = document.getElementById("data");
			elem.style.borderLeft = 'thick solid #696969';
			elem.style.paddingLeft = '10px';
		} else {}

		var maxScale = json[0].earthquake.maxScale;
		var maxint = "";
		if (maxScale == "10") { //震度1
			maxint = "1"
			var elem = document.getElementById("data");
			elem.style.borderLeft = 'thick solid #ececec';
			elem.style.paddingLeft = '10px';
		} else if (maxScale == "20") { //震度2
			maxint = "2"
			var elem = document.getElementById("data");
			elem.style.borderLeft = 'thick solid #0097ff';
			elem.style.paddingLeft = '10px';
		} else if (maxScale == "30") { //震度3
			maxint = "3"
			var elem = document.getElementById("data");
			elem.style.borderLeft = 'thick solid #0058e4';
			elem.style.paddingLeft = '10px';
		} else if (maxScale == "40") { //震度4
			maxint = "4"
			var elem = document.getElementById("data");
			elem.style.borderLeft = 'thick solid #f7ea41';
			elem.style.paddingLeft = '10px';
		} else if (maxScale == "45") { //震度5-
			maxint = "5弱"
			var elem = document.getElementById("data");
			elem.style.borderLeft = 'thick solid #ffc32e';
			elem.style.paddingLeft = '10px';
		} else if (maxScale == "50") { //震度5+
			maxint = "5強"
			var elem = document.getElementById("data");
			elem.style.borderLeft = 'thick solid #ff962a';
			elem.style.paddingLeft = '10px';
		} else if (maxScale == "55") { //震度6-
			maxint = "6弱"
			var elem = document.getElementById("data");
			elem.style.borderLeft = 'thick solid #f91f1c';
			elem.style.paddingLeft = '10px';
		} else if (maxScale == "60") { //震度6+
			maxint = "6強"
			var elem = document.getElementById("data");
			elem.style.borderLeft = 'thick solid #c60036';
			elem.style.paddingLeft = '10px';
		} else if (maxScale == "70") { //震度7
			maxint = "7"
			var elem = document.getElementById("data");
			elem.style.borderLeft = 'thick solid #c20086';
			elem.style.paddingLeft = '10px';
		} else {}
		var tsunami = "";
		var info = "";
		var domesticTsunami = json[0].earthquake.domesticTsunami;
		if (domesticTsunami == "None") {
			tsunami = "なし";
		} else if (domesticTsunami == "Unknown") {
			tsunami = "不明";
		} else if (domesticTsunami == "Checking") {
			tsunami = "調査中";
		} else if (domesticTsunami == "NonEffective") {
			tsunami = "若干の海面変動";
		} else if (domesticTsunami == "Watch") {
			tsunami = "津波注意報";
		} else if (domesticTsunami == "Warning") {
			tsunami = "津波予報(種類不明)";
		} else {}
		info += "情報 " + tsunami + "<br>";
		var area = "";
		var cnt = json[0].points.length - 1;
		for (var i = 0; i <= cnt; i++) {
			var maxScale2 = json[0].points[i].scale;
			var maxint2 = "";
			if (maxScale2 == "10") { //震度1
				maxint2 = "1"
			} else if (maxScale2 == "20") { //震度2
				maxint2 = "2"
			} else if (maxScale2 == "30") { //震度3
				maxint2 = "3"
			} else if (maxScale2 == "40") { //震度4
				maxint2 = "4"
			} else if (maxScale2 == "45") { //震度5-
				maxint2 = "5弱"
			} else if (maxScale2 == "50") { //震度5+
				maxint2 = "5強"
			} else if (maxScale2 == "55") { //震度6-
				maxint2 = "6弱"

			} else if (maxScale2 == "60") { //震度6+
				maxint2 = "6強"

			} else if (maxScale2 == "70") { //震度7
				maxint2 = "7"
			} else {}
			area += " ■震度" + maxint2 + " [" + json[0].points[i].pref + "] " + json[0].points[
				i].addr + "<br>";
		}
		var str = new Date(json[0].earthquake.time);
		var time = ('00' + (str.getMonth() + 1)).slice(-2) + "月" + ("0" + str.getDay())
			.slice(-2) + "日 " + ("0" + str.getHours()).slice(-2) + "時" + ("0" + str.getMinutes())
			.slice(-2) + "分";
		document.getElementById("data").innerHTML = "地震情報 [" + type + "]";
		document.getElementById("time").innerHTML = "発生時刻 " + time;
		document.getElementById("name").innerHTML = json[0].earthquake.hypocenter.name;
		document.getElementById("depth").innerHTML = json[0].earthquake.hypocenter.depth + "km";
		document.getElementById("magnitude").innerHTML = json[0].earthquake.hypocenter.magnitude;
		document.getElementById("max_shindo").innerHTML = maxint;
		document.getElementById("tsunami").innerHTML = info;
		document.form.area.value = area.split("<br>").join("\n");

	})
}