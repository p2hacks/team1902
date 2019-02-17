// 画面ロード後に実行
window.addEventListener("load", function(event) {
	// パラメータの取得
	var listID = getParam("listID");
	var obj_listData = JSON.parse(localStorage.getItem("userList"));
	if(obj_listData == null) return;
	var userID_list = obj_listData[obj_listData.findIndex(({listID}) => listID === listID)];
	var ls = null;
	if("userID" in userID_list) ls = userID_list["userID"];
	console.log(ls);
	if(ls == null) return;

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



