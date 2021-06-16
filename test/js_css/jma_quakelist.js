timerID = setInterval('quake()', 60000);
var uset = "";
quake();

function quake() {
	var url = 'https://www.jma.go.jp/bosai/quake/data/list.json';
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
        for(var i = 0; i <= 1; i++){
            var url = "https://www.jma.go.jp/bosai/quake/data/"+json[i].json;
		fetch(url).then(function(response) {
			return response.json();
		}).then(function(json2) {
            var type = [];
            type = json2.Head.Title;
            var str = new Date(json2.Head.ReportDateTime);
            var time = [];
			time[i] = ('00' + (str.getMonth() + 1)).slice(-2) + "月" + ("0" + str.getDay())
			.slice(-2) + "日 " + ("0" + str.getHours()).slice(-2) + "時" + ("0" + str.getMinutes())
            .slice(-2) + "分";
            name = [];
			mag = [];
			depth = [];
			maxint = [];
			pref =[];
			maxint = [];
			info = [];
			cnt = [];
			if(type == "震度速報"){
				name[i] = "---";
				mag[i] = "---";
				depth[i] = "---";
				maxint[i] = json2.Body.Intensity.	Observation.MaxInt;
				pref[i] ="";
				maxint[i] = json2.Body.Intensity.Observation.MaxInt;
				info[i] = json2.Body.Comments.ForecastComment.Text;
				cnt = json2.Head.Headline.Information.Item.length-1;
			}
			else if(type == "震源に関する情報"){
				name[i] = json2.Body.Earthquake.Hypocenter.Area.Name;
				mag[i] = json2.Body.Earthquake.Magnitude;
				depth[i] = json2.Body.Earthquake.Hypocenter.Area.Coordinate.substr(12,6).split("/").join("")/1000;
				maxint[i] = "---";
				info[i] = json2.Body.Comments.ForecastComment.Text;
			}
			else{
			name[i] = json2.Body.Earthquake.Hypocenter.Area.Name;
			mag[i] = json2.Body.Earthquake.Magnitude;
			depth[i] = json2.Body.Earthquake.Hypocenter.Area.Coordinate.substr(12,6).split("/").join("")/1000;
			maxint[i] = json2.Body.Intensity.Observation.MaxInt;
			pref[i] ="";
			info[i] = json2.Body.Comments.ForecastComment.Text;
			cnt[i] = json2.Body.Intensity.Observation.Pref.length -1;
		
            // ul要素を取得
            var ul = document.getElementById('country_list');

            // ul要素にli要素を追加
            for (var count = 1; count < i; count++) {
                // li要素を作成
                var li = document.createElement('li');
                var p = document.createElement('p');
                var p2 = document.createElement('p');
                // テキスト情報を作成
                var text = [];
                text[count] = document.createTextNode(type);
                var text2= document.createTextNode(" "+time);
                var text3 = document.createTextNode(name[count]);
                var text4 = document.createTextNode(" 深さ"+depth[count]+"km");
                var text5 = document.createTextNode(" 規模(M)"+mag[count]);
                var text6 = document.createTextNode(" 最大震度"+maxint[count]);

                if (maxint[count] == "1") { //震度1
                    li.style.backgroundColor = '#ececec';
       
                } 
                else if (maxint[count] == "2") { //震度2
                   
                   li.style.backgroundColor = '#0097ff';
                } else if (maxint[count] == "3") { //震度3
                    
                    li.style.backgroundColor = '#0058e4';
       
                } else if (maxint[count] == "4") { //震度4
                    
                    li.style.backgroundColor = '#f7ea41';
       
                } else if (maxint[count] == "5-") { //震度5-
                    
                    li.style.backgroundColor = '#ffc32e';
       
                } else if (maxint[count] == "5+") { //震度5+
                    
                    li.style.backgroundColor = '#ff962a';
       
                } else if (maxint[count] == "6-") { //震度6-
                    
                    li.style.backgroundColor = '#f91f1c';
       
                } else if (maxint[count] == "6+") { //震度6+
                    li.style.backgroundColor = '#c60036';
       
                } else if (maxint[count] == "7") { //震度7
                    
                    li.style.backgroundColor = '#c20086';
                }
                else {
                    li.style.backgroundColor = '#ececec';
       
                }
                li.appendChild(p);
                li.appendChild(p2);
                p.appendChild(text[count]);
                p.appendChild(text2);
                p2.appendChild(text3);
                p2.appendChild(text4);
                p2.appendChild(text5);
                p2.appendChild(text6);
                ul.appendChild(li);
                        }
                    }
                    })
                    }
    })
}