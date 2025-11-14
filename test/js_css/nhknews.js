timerID = setInterval('getNHK()', 600000);
getNHK();

function getNHK() {
	//var url = 'https://www3.nhk.or.jp/news/json16/syuyo.json'; 旧URL
	var url = 'https://news.web.nhk/news/json16/syuyo.json'; //新URL
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
		var cnt = json.channel.item.length;
		var title = [''];
		var link = [''];
		var text = "";
		for (var i = 0; i < cnt; i++) {
			title.push(json.channel.item[i].title);
			link.push("https://www3.nhk.or.jp/news/" + json.channel.item[i].link);
			text += title[i] + "　　　　　　　　　　　　　　　　　　　　　";
		}
		const a1 = document.getElementById("n_list").innerText = text;
		document.getElementById("n_title").innerText = "NHKニュース主要";
	})
}

