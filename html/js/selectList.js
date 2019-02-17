// ボタンを押したときの動作
window.addEventListener("load", function(event) {
	// サーバーにリストの要求
	var obj_userData = JSON.parse(localStorage.getItem("guestKey"));
	get_list(obj_userData["userID"], obj_userData["sessID"], function(res){
		var obj_userList = [JSON.parse(localStorage.getItem("userList"))];
		// リストの追加
		obj_userList.forEach(function(key){
			var ele = document.createElement("a");
			var str = document.createTextNode(key["listName"]);
			var ele2 = document.createElement("div");
			ele2.className = "list_thinTitle";
			ele2.appendChild(str);
			ele.href = "./userList.html?listID="+key["listID"];
			ele.className = "list_thinBase";
			ele.appendChild(ele2);
			document.getElementById("list_outer").appendChild(ele);
		});
	});

	// 新規を押したら画面を出す
	document.getElementById("newList_create").onclick = function() {
		document.getElementById("OverlapWinsow").style.display = "block";
	};
	
	// キャンセルを押したら消す
	document.getElementById("newList_cancel").onclick = function() {
		document.getElementById("OverlapWinsow").style.display = "none";
	};
	
	// 確定を押したら画面を消してサーバーに新規リストのリクエストを行い　リロード
	document.getElementById("newList_decided").onclick = function() {
		document.getElementById("OverlapWinsow").style.display = "none";
		
		// サーバーにリクエスト
		
		// データの更新
		
		// 描画の更新
		
	};
	
});

