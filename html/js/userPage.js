// ユーザーページの表示
window.addEventListener("load", function(event) {
	// ページ情報
	var display_userID = Number(getParam("userID"));
	if(display_userID == 0) display_userID = null;
	
	// 情報の取得（表示するユーザーのID、自分のユーザーIDかチェック、ログインしているか）
	var guestData = JSON.parse(localStorage.getItem("guestKey"));
	var userID = null;
	if(guestData != null) if("userID" in guestData) userID = Number(guestData["userID"]);
	if(display_userID == null) display_userID = userID;
	if(display_userID == null) location.href = "./index.html";	// 表示するものがない（ログインしていなくて指定もしていない）

	// 表示するデータの取得（コールバック）
	get_userData(display_userID, function(){
		// ローカルストレージからデータを引っ張ってくる
		var obj_userData = JSON.parse(localStorage.getItem("userData"));
		var userData = obj_userData[obj_userData.findIndex(({userID}) => userID === display_userID)];

		// どのページでも同じ情報
		document.getElementById("userPage_userName").innerText = userData["userName"];
		document.getElementById("userPage_userID").innerText = "ID："+display_userID;
		document.getElementById("userPage_profile").innerText = userData["userProfile"];
		userData["userURL"].forEach(function(val){
			var ele = document.createElement("a");
			var str = document.createTextNode(val);
			ele.href = val;
			ele.className = "userPage_listURL_text";
			ele.appendChild(str);
			document.getElementById("userPage_listURL").appendChild(ele);
		});

		// アイコン
		getImg(display_userID, document.getElementById("userPage_userIcon"), function(){
			document.getElementById("img_dummy").style = "display: none;";
		});
		
		// 情報の表示
		if(userID == null) {					// ログインしていない状態
			
		} else if(userID == display_userID) {	// 自分のページ
			document.getElementById("userPage_myPage").style = "display: block;";
			document.getElementById("userPage_userList").style = "display: felx;";
			
		} else if(display_userID != null){		// 他の人のページ
			document.getElementById("userPage_backButton").style = "display: block;";

		}

		// 位置情報の取得と送信
		if(userID == display_userID != null) {
			getPosition(function(res){
				if(res["code"] == 0){
					var guestData = JSON.parse(localStorage.getItem("guestKey"));
					var userID = Number(guestData["userID"]);
					var sessID = Number(guestData["sessID"]);
					send_pos(userID, sessID, res["x"], res["y"], function(res){
						console.log("aa");
						console.log(res);
					});
				}
			});
		}
	});
});