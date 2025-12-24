timerID = setInterval('quake()', 60000);
var uset = "";
quake();

function quake() {
	var url = 'https://www.jma.go.jp/bosai/quake/data/list.json';
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
		//var url = "https://www.jma.go.jp/bosai/quake/data/"+json[0].json;
		var url = "https://www.jma.go.jp/bosai/quake/data/20251208232004_20251208231519_VXSE51_0.json";
		//var url = "https://www.jma.go.jp/bosai/quake/data/20210316045901_20210316045628_VXSE51_0.json";
		//var url = "https://www.jma.go.jp/bosai/quake/data/20210316045849_20210316045628_VXSE52_0.json"
		fetch(url).then(function(response) {
			return response.json();
		}).then(function(json2) {
			var type = json2.Head.Title;
			if(type == "震度速報"){
				var name = "---";
				var mag = "---";
				var depth = "---";
				var maxint = json2.Body.Intensity.	Observation.MaxInt;
				var pref ="";
				var maxint = json2.Body.Intensity.Observation.MaxInt;
				var info = json2.Body.Comments.ForecastComment.Text;
				var cnt = json2.Head.Headline.Information.Item.length-1;
				var pref = "";
				for (var i = 1; i <= cnt; i++) {
					var cnt2 = json2.Head.Headline.Information.Item[i].Areas.Area.length-1;
					pref += "■"+json2.Head.Headline.Information.Item[0].Kind.Name+" "+
						json2.Head.Headline.Information.Item[0].Areas.Area.Name+"\n"
					for (var i2 = 0; i2 <= cnt2; i2++) {
						pref +="■"+json2.Head.Headline.Information.Item[i].Kind.Name+" "+
						json2.Head.Headline.Information.Item[i].Areas.Area[i2].Name+"\n";
						document.form.area.value = pref;
					}
				}
			}
			else if(type == "震源に関する情報"){
				var name = json2.Body.Earthquake.Hypocenter.Area.Name;
				var mag = json2.Body.Earthquake.Magnitude;
				var depth = json2.Body.Earthquake.Hypocenter.Area.Coordinate.substr(12,6).split("/").join("")/1000;
				var maxint = "---";
				var info = json2.Body.Comments.ForecastComment.Text;
			}
			else{
			var name = json2.Body.Earthquake.Hypocenter.Area.Name;
			var mag = json2.Body.Earthquake.Magnitude;
			var depth = json2.Body.Earthquake.Hypocenter.Area.Coordinate.substr(12,6).split("/").join("")/1000;
			var maxint = json2.Body.Intensity.Observation.MaxInt;
			var pref ="";
			var info = json2.Body.Comments.ForecastComment.Text;
			var cnt = json2.Body.Intensity.Observation.Pref.length -1;
			for (var i = 0; i <= cnt; i++) {
				var cnt2 = json2.Body.Intensity.Observation.Pref[i].Area.length -1;
				for (var i2 = 0; i2 <= cnt2; i2++) {
					var cnt3 = json2.Body.Intensity.Observation.Pref[i].Area[i2].City.length -1;
					for (var i3 = 0; i3 <= cnt3; i3++) {
					pref += "■震度"+json2.Body.Intensity.Observation.Pref[i].Area[i2].City[i3].MaxInt+"［"+json2.Body.Intensity.Observation.Pref[i].Name+"］"+json2.Body.Intensity.Observation.Pref[i].Area[i2].City[i3].Name+"\n";

					document.form.area.value = pref;
					}
				}
			}
		}
		if (maxint == "1") { //震度1
			var elem = document.getElementById("data");
			elem.style.borderLeft = 'thick solid #ececec';
			elem.style.paddingLeft = '10px';
		} else if (maxint == "2") { //震度2
			var elem = document.getElementById("data");
			elem.style.borderLeft = 'thick solid #0097ff';
			elem.style.paddingLeft = '10px';
		} else if (maxint == "3") { //震度3
			var elem = document.getElementById("data");
			elem.style.borderLeft = 'thick solid #0058e4';
			elem.style.paddingLeft = '10px';
		} else if (maxint == "4") { //震度4
			var elem = document.getElementById("data");
			elem.style.borderLeft = 'thick solid #f7ea41';
			elem.style.paddingLeft = '10px';
		} else if (maxint == "5-") { //震度5-
			var elem = document.getElementById("data");
			elem.style.borderLeft = 'thick solid #ffc32e';
			elem.style.paddingLeft = '10px';
		} else if (maxint == "5+") { //震度5+
			var elem = document.getElementById("data");
			elem.style.borderLeft = 'thick solid #ff962a';
			elem.style.paddingLeft = '10px';
		} else if (maxint == "6-") { //震度6-
			var elem = document.getElementById("data");
			elem.style.borderLeft = 'thick solid #f91f1c';
			elem.style.paddingLeft = '10px';
		} else if (maxint == "6+") { //震度6+
			var elem = document.getElementById("data");
			elem.style.borderLeft = 'thick solid #c60036';
			elem.style.paddingLeft = '10px';
		} else if (maxint == "7") { //震度7
			var elem = document.getElementById("data");
			elem.style.borderLeft = 'thick solid #c20086';
			elem.style.paddingLeft = '10px';
		}
		else {
			var elem = document.getElementById("data");
			elem.style.borderLeft = 'thick solid #ececec';
			elem.style.paddingLeft = '10px';
		}
			var str = new Date(json2.Head.ReportDateTime);
			var time = ('00' + (str.getMonth() + 1)).slice(-2) + "月" + ("0" + str.getDay())
			.slice(-2) + "日 " + ("0" + str.getHours()).slice(-2) + "時" + ("0" + str.getMinutes())
			.slice(-2) + "分";
			document.getElementById("data").innerHTML = "地震情報 [" + type + "]";
			document.getElementById("time").innerHTML = "発生時刻 " + time;
			document.getElementById("name").innerHTML = "震源地 " + name;
			document.getElementById("depth").innerHTML = "深さ " + depth + "km";
			document.getElementById("magnitude").innerHTML = "規模(M)" + mag;
			document.getElementById("max_shindo").innerHTML = "最大震度" + maxint;
			document.getElementById("tsunami").innerHTML = "情報 "+ info;
			function push(){
				Push.create("地震情報 [" + type + "]",
				{
					body: time+"頃発生\n"+ name+"\n最大震度"+maxint,
					icon: '',
					timeout: 8000,
					onClick: function () {
						window.focus();
						this.close();
					}
				})
			}
			if(url == uset){
				return;
			}
			uset = url;
			//push();
	})
})

}
