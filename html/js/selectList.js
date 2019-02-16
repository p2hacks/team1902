// ボタンを押したときの動作
window.addEventListener("load", function(event) {
	// 新規を押したら画面を出す
	document.getElementById("newList_create").onclick = function() {
		document.getElementById("OverlapWinsow").style.display = "block";
	};
	
	// キャンセルを押したら消す
	document.getElementById("newList_cancel").onclick = function() {
		document.getElementById("OverlapWinsow").style.display = "none";
	};
	
	// 暗くなっている部分を押しても消す
	document.getElementById("OverlapWinsow").onclick = function() {
		document.getElementById("OverlapWinsow").style.display = "none";
	};
	
	// 確定を押したら画面を消してサーバーに新規リストのリクエストを行い、リストを更新する
	document.getElementById("newList_decided").onclick = function() {
		document.getElementById("OverlapWinsow").style.display = "none";
		
		// サーバーにリクエスト
		
		// データの更新
		
		// 描画の更新
		
	};
	
});

