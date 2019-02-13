// 認証関連のこと（毎更新時にやっていいものなのか？）
window.addEventListener("load", function(event) {
	console.log("ログイン情報が有効化チェックする関数を実行");
	
	// 認証済みか（SessionIDがあるかチェック）
	if(!("guestID" in localStorage)) {
		var obj_guestID = {
			"userID":null,
			"SessionID":null
		}
		localStorage.setItem("guestID", JSON.stringify(obj_guestID));
	}
	
	// SessionIDを変数に入れる
	var SessionID = JSON.parse(localStorage.getItem("guestID"))["SessionID"];
	
	// 認証が有効か？（無効だったらnullに変更し、次回ページロード時に未ログイン状態を表示：nullだったら実行しない）
	if(SessionID != null){
		getJson("mukou", function(resultText){
			console.log("返ってきた");
		});
	}
});

