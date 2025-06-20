timerID = setInterval('quake()', 60000);
var uset = "";
quake();

function quake() {
	var url = 'https://www.jma.go.jp/bosai/tsunami/data/list.json';
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
            //var url = "https://www.jma.go.jp/bosai/tsunami/data/"+json[i].json;
                //var url = "https://www.jma.go.jp/bosai/tsunami/data/20250602035816_20250602035202_VTSE41_0.json";
		var url = "https://renitapps.com/test/js_css/tsunami_sample.json";
		//var url = "https://www.jma.go.jp/bosai/quake/data/20210316045849_20210316045628_VXSE52_0.json"
		fetch(url).then(function(response) {
			return response.json();
		}).then(function(json2) {
            var type = json2.Head.Title;
            var text = json2.Head.Headline.Text;
            console.log(text);
			if(type == "津波注意報・津波予報"){
                var area = [];
                var kind = [];
                var firstHeight = [];
                var maxHeight  =[];
                var cnt = json2.Body.Tsunami.Forecast.Item.length-1;
                for (var i = 0; i <= cnt; i++) {
                    area[i] = json2.Body.Tsunami.Forecast.Item[i].Area.Name;
                    kind[i] = json2.Body.Tsunami.Forecast.Item[i].Category.Kind.Name;
                    if(json2.Body.Tsunami.Forecast.Item[i].FirstHeight)
                    {
                        firstHeight[i] = json2.Body.Tsunami.Forecast.Item[i].FirstHeight.Condition;
                    }
                    else{
                        firstHeight[i] = "";
                    }
                    
                    maxHeight[i] = json2.Body.Tsunami.Forecast.Item[i].MaxHeight.TsunamiHeight+"m";
                    console.log(area[i]+"  "+kind[i]+"  "+firstHeight[i] +"  "+ maxHeight[i]);
                }
                var pref ="";
                var tableEle = document.getElementById('sample-table');
                for (var i = 0; i < 5; i++) {
                  // テーブルの行を 5行追加する
                  var tr = document.createElement('tr');
                  tableEle.innerHTML = area[i];
                  
                  for (var j = 0; j < 1; j++) {
                    // テーブルの列を 3行追加する
                    var td = document.createElement('td');
                    tr.innerHTML = area[i];
                    
                    tr.innerHTML = kind[i];
                    tr.appendChild(td);
                  }
                  tableEle.appendChild(tr);
                }
			}

			var str = new Date(json2.Head.ReportDateTime);
			var time = ('00' + (str.getMonth() + 1)).slice(-2) + "月" + ("0" + str.getDay())
			.slice(-2) + "日 " + ("0" + str.getHours()).slice(-2) + "時" + ("0" + str.getMinutes())
			.slice(-2) + "分";
            console.log(time);

            // ul要素を取得
            var ul = document.getElementById('country_list');

            // ul要素にli要素を追加
            for (var count = 0; count < i; count++) {
                // li要素を作成
                var li = document.createElement('li');
                var p = document.createElement('p');
                var p2 = document.createElement('p');
                // テキスト情報を作成
                // var text = document.createTextNode(type);
                // var text2= document.createTextNode(" "+time);
                // var text3 = document.createTextNode(name);

                var maxint = "0";
                if (maxint == "1") { //震度1
                    li.style.backgroundColor = '#ececec';
       
                } 
                else if (maxint == "2") { //震度2
                   
                   li.style.backgroundColor = '#0097ff';
                } else if (maxint == "3") { //震度3
                    
                    li.style.backgroundColor = '#0058e4';
       
                } else if (maxint == "4") { //震度4
                    
                    li.style.backgroundColor = '#f7ea41';
       
                } else if (maxint == "5-") { //震度5-
                    
                    li.style.backgroundColor = '#ffc32e';
       
                } else if (maxint == "5+") { //震度5+
                    
                    li.style.backgroundColor = '#ff962a';
       
                } else if (maxint == "6-") { //震度6-
                    
                    li.style.backgroundColor = '#f91f1c';
       
                } else if (maxint == "6+") { //震度6+
                    li.style.backgroundColor = '#c60036';
       
                } else if (maxint == "7") { //震度7
                    
                    li.style.backgroundColor = '#c20086';
                }
                else {
                    li.style.backgroundColor = '#ececec';
       
                }
                // li.appendChild(p);
                // li.appendChild(p2);
                // p.appendChild(text);
                // p.appendChild(text2);
                // p2.appendChild(text3);
               
                // ul.appendChild(li);
            }
        })
    })
}
