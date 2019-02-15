// ユーザーページの表示
window.addEventListener("load", function(event) {
	// ページ情報
	var display_userID = getParam("userID");
	
	// 情報の取得（表示するユーザーのID、自分のユーザーIDかチェック、ログインしているか）
	var guestData = JSON.parse(localStorage.getItem("guestID"));
	var userID = null;
	if(guestData != null) if("userID" in guestData) userID = guestData["userID"];
	if(display_userID == null) display_userID = userID;
	//if(display_userID == null) location.href = "./index.html";
	
	// 情報の表示
	if(userID == null) {					// ログインしていない状態
		
	} else if(userID == display_userID) {	// 自分のページ
		document.getElementById("link_login").style.display = "none";
	} else if(display_userID != null){		// 他の人のページ
		document.getElementById("link_login").style.display = "none";
	}
	
	// デバッグ用の表示
	console.log("userPage.js");
	console.log("- userID："+userID);
	console.log("- display_userID："+display_userID);
});