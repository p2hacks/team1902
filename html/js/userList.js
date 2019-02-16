// 画面ロード後に実行
window.addEventListener("load", function(event) {
	// パラメータの取得
	var listID = getParam("listID");
	var guestID = localStorage.setItem("guestID", JSON.stringify(obj_guestID));
	
	// 描画に必要なデータが有るかチェック
	
		// ないなら取りにに行く
		
		// あるなら描画
});

// 描画する関数（データが全てlocal Storage内にあることが前提）
function display_userList(listID){
	
}

// データが無いなら取りに行く
function get_userList(listID){
	// ユーザーIDを取りに行く（これはlocal Storage内にあるはず）
	
	// ユーザーデータを取りに行く
}



