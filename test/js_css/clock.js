timerID = setInterval('clock()', 1000);

function clock() {
	document.getElementById("view_clock").innerHTML = getClock();
}

function getClock() {
	var now = new Date();
	var year = now.getFullYear();
	var mon = ("00" + (now.getMonth() + 1)).slice(-2);
	var day = ("00" + (now.getDate())).slice(-2);
	var you = now.getDay();
	var hour = ("00" + (now.getHours())).slice(-2);
	var min = ("00" + (now.getMinutes())).slice(-2);
	var sec = ("00" + (now.getSeconds())).slice(-2);
	var youbi = new Array("日", "月", "火", "水", "木", "金", "土");
	var s = year + "年" + mon + "月" + day + "日 (" + youbi[you] + ")<br>" + hour +
		"時" + min + "分" + sec + "秒";
	return s;
}
