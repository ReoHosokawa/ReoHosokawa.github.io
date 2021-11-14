var count = 0;
var timer1;

window.onload = function() {
	start();
}

function start() {
	var col16, obj;

	if (document.getElementById) {
		// document.getElementById()の省略
		obj = document.getElementById("top");

		// 最初の1.6秒で文字を黒→白に変更する
		if (count < 16) {
			col16 = count.toString(16);
			obj.style.color = "#" + col16 + col16 + col16;
		}

		// 3.2秒後に文字を白→黒に変更する
		if (count > 48) {
			col16 = (64 - count).toString(16);
			obj.style.color = "#" + col16 + col16 + col16;
		}

		count++;

		if (count <= 64) {
			// 関数start()を0.1秒間隔で呼び出す
			timer1 = setTimeout("start()", 100);
		} else {
			// 6.4秒後にタイマーを停止する
			clearTimeout(timer1);
			count = 0;
			start();
		}
	}
}