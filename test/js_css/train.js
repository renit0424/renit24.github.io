timerID = setInterval('train()', 10000);
train();

function train() {
	var url = 'https://renitapps.com/test/train.php';
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
		var type ="";
		var cnt = 5;
		for (var i = 0; i <= cnt; i++) {
			if(json['trains'][i]['displayType'] == "普通")
			{
				type += json['trains'][i]['displayType']+json['trains'][i]['dest']+"行き<br>";
			}
			else
			{
				type += json['trains'][i]['displayType']+json['trains'][i]['nickname']+json['trains'][i]['dest']+"行き<br>";
			}
		}
		document.getElementById("type").innerHTML = type;
	})
}
