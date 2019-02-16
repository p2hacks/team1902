
// ログインボタンを押したら実行
window.addEventListener("load", function(event) {
	document.getElementById("login").onclick = function() {
		// inputから情報を取得
		var userKey = document.getElementById("userKey").value;
		var userPass = document.getElementById("userPass").value;
		
		// 文字の表示
		document.getElementById("errorMsg").innerHTML = "";
		if(userKey == "" || userPass == "") document.getElementById("errorMsg").innerHTML = "※ユーザー情報が入力されていません。";
	};
});

