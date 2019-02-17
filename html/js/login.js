
// ログインボタンを押したら実行
window.addEventListener("load", function(event) {
	document.getElementById("login").onclick = function() {
		// inputから情報を取得
		var userKey = document.getElementById("userKey").value;
		var userPass = document.getElementById("userPass").value;
		
		// 文字の表示
		document.getElementById("errorMsg").innerHTML = "";
		if(userKey == "" || userPass == ""){
			document.getElementById("errorMsg").innerHTML = "※ユーザー情報が入力されていません。";
			return;
		}

		// サーバーにコマンドを送る
		login(userKey, userPass, function(res){
			res = JSON.parse(res);
			if(res["error"]) {
				document.getElementById("errorMsg").innerHTML = "※ログイン情報が間違っています。";
				return;
			}
			// 問題なく動作した
			location.href = "./userPage.html";
		});
	};
});

