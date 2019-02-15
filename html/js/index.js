window.addEventListener("load", function(event) {
	// 認証チェック
	// - 認証済みならユーザページ
	// - 未認証、認証切れならログインページ
	
	//if(認証済み) location.href = "./userPage.html";
	
	location.href = "./loginSelect.html";
});