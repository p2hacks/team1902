
window.addEventListener("load", function(event) {
    // id=logoutクリックでログアウトする関数を実行, index.html
    document.getElementById("logout").onclick = function() {
        var guestData = JSON.parse(localStorage.getItem("guestKey"));
		logout(guestData["userID"], guestData["sessID"]);
	};
});