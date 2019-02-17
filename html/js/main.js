/*
// ログインしていなかったらindex.htmlに返す
var fname = window.location.href.split('/').pop();
var flist = [	"index.html",
				"login.html",
				"loginSelect.html",
				"userPage.html",
				"createAccount.html"];	// この中にあるファイル名のときは実行されない（index.htmlを消すと無限ループになるので注意）
if(flist.indexOf(fname) == -1){
	// キーがなかったらエラーを吐くのでなかったらnullを入れておく
	if(!("guestKey" in localStorage)) {
		var obj_guestKey = {
			"userID": null,
			"sessID": null
		}
		// ローカルストレージにnullのデータを追加
		localStorage.setItem("guestKey", JSON.stringify(obj_guestKey));
	}

	// local Storageからデータを取りに行く
	var SessionID = JSON.parse(localStorage.getItem("guestKey"))["sessID"];
	
	// ログインしていないなら
	if(SessionID == null) {
		console.log("ログインしていないのでindex.htmlに返します");
		location.href="./index.html";
	}
}
/**/

// 認証関連のこと（毎更新時にやっていいものなのか？）
window.addEventListener("load", function(event) {
	// 認証済みか（SessionIDがあるかチェック）
	if(!("guestKey" in localStorage)) {
		var obj_guestKey = {
			"userID": null,
			"sessID": null
		}
		localStorage.setItem("guestKey", JSON.stringify(obj_guestKey));
	}
	
	// SessionIDを変数に入れる
	var SessionID = JSON.parse(localStorage.getItem("guestKey"))["SessionID"];
	
	// 認証が有効か？（無効だったらnullに変更し、次回ページロード時に未ログイン状態を表示：nullだったら実行しない）
	if(SessionID != null){
		getJson("mukou", function(resultText){
			console.log("返ってきた");
		});
	}
});
