// ユーザーページの表示
window.addEventListener("load", function(event) {
	// ページ情報
	var display_userID = getParam("userID");
	
	// 情報の取得（表示するユーザーのID、自分のユーザーIDかチェック、ログインしているか）
	var guestData = JSON.parse(localStorage.getItem("guestKey"));
	var userID = null;
	if(guestData != null) if("userID" in guestData) userID = Number(guestData["userID"]);
	if(display_userID == null) display_userID = userID;
	if(display_userID == null) location.href = "./index.html";	// 表示するものがない（ログインしていなくて指定もしていない）
	
	// 表示するデータの取得（コールバック）
	get_userData(display_userID, function(){
		// どのページでも同じ情報
		document.getElementById("userPage_userID").innerText = "ID："+display_userID;

		// 情報の表示
		if(userID == null) {					// ログインしていない状態
			
		} else if(userID == display_userID) {	// 自分のページ
			
		} else if(display_userID != null){		// 他の人のページ
			
		}
	});
});