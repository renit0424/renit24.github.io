timerID = setInterval('service()',10000);
service();
function service() {
    var url = 'https://api.renitapps.com/service.php';
    fetch(url).then(function (response) {
      return response.json();
    }).then(function (json) {
        var cnt = Object.keys(json['list']).length;
        var list = "";
        for (var i = 0; i < cnt; i++) {
            if (json['list'][i].status == "OK"){
            list += '<font color="#008000">'+json['list'][i].status+"</font> "+json['list'][i].name+"<br>";
            }
            else{
                list += '<font color="#ff4500">'+json['list'][i].status+"</font> "+json['list'][i].name+"<br>";
            }
        }    
        document.getElementById("info").innerHTML = list;
    })
}
