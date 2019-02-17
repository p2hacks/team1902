window.addEventListener("load", function(event) {
	// 認証チェック
	// - 認証済みならユーザページ
	// - 未認証、認証切れならログインページ
    if(!("guestKey" in localStorage)) {
		var obj_guestKey = {
			'userID': null,
			'sessID': null
		}
		localStorage.setItem("guestKey", JSON.stringify(obj_guestKey));
    }
    var obj_guestKey = JSON.parse(localStorage.getItem("guestKey"));
	
	get_chk(obj_guestKey["userID"], obj_guestKey["sessID"], function(res){
		if(res == "true") location.href = "./userPage.html";
		location.href = "./loginSelect.html";
	});s
});