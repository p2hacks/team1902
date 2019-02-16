
// ログインボタンを押したら実行
window.addEventListener("load", function(event) {
	document.getElementById("decided").onclick = function() {
		// inputから情報を取得
		var mail = document.getElementById("mail").value;
		var pass1 = document.getElementById("pass1").value;
		var pass2 = document.getElementById("pass2").value;
		
		// 文字の表示
		document.getElementById("errorMsg").innerHTML = "";
		if(mail == "") {
			document.getElementById("errorMsg").innerHTML = "※メールアドレスが入力されていません。";
			return;
		};
		if(pass1 != pass2 || pass1 == "") {
			document.getElementById("errorMsg").innerHTML = "※確認用パスワードが間違っています。";
			return;
		};
		
	};
});

