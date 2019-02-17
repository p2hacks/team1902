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

	// データを取りに行く
	new Promise((resolve,reject) => {
		for( var i=0; i<ls.length; i++) {
			get_userData(Number(ls[i]),function(){});
		}
		resolve();
	})
	.then(() => {
		// 描画
		for( var i=0; i<ls.length; i++) {
			user_id = Number(ls[i]);
			var obj_userData = JSON.parse(localStorage.getItem("userData"));
			var index = obj_userData.findIndex(({userID}) => userID === user_id);
			if(index == -1) return;
			userID = obj_userData[index]["userID"];
			userName = obj_userData[index]["userName"];
			// 追加
			var ele = document.createElement("a");
			var str = document.createTextNode(userName);
			var str_id = document.createTextNode("ID: "+userID);
			var ele2 = document.createElement("div");
			var ele_id = document.createElement("div");
			var ele_img = document.createElement("div");
			var ele_dummy = document.createElement("div");
			ele2.className = "list_boldTitle";
			ele_id.className = "list_boldID";
			ele_dummy.className = "list_boldIcon";
			ele2.appendChild(str);
			ele_id.appendChild(str_id);
			ele_dummy.id = "dummy_"+userID;
			ele_img.id = "list_boldIcon_"+userID;
			ele.href = "./userPage.html?userID="+userID;
			ele.className = "list_boldBase";
			ele.appendChild(ele2);
			ele.appendChild(ele_id);
			ele.appendChild(ele_img);
			ele.appendChild(ele_dummy);
			document.getElementById("list_outer").appendChild(ele);
			getImg_forLS(userID,document.getElementById("list_boldIcon_"+userID),function(){
				document.getElementById("dummy_"+userID).style="display: none;";
			});
		}
	})
	
});

// 描画する関数（データが全てlocal Storage内にあることが前提）
function display_userList(listID){
	
}

// データが無いなら取りに行く
function get_userList(listID){
	// ユーザーIDを取りに行く（これはlocal Storage内にあるはず）
	
	// ユーザーデータを取りに行く
}



