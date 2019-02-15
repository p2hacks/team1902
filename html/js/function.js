// データをサーバーから取ってくる
function getJson(apiParameter, callback) {
	var xmlHttpRequest = new XMLHttpRequest();
	xmlHttpRequest.onreadystatechange = function(){
		if( this.readyState == 4 && this.status == 200 ){
			if( this.response ){
				callback(this.response);
			}
		}
	}
	// 読み込むものを取りに行く（URL直書き？）
	xmlHttpRequest.open( 'GET', 'http://localhost:3000/'+apiParameter, true );
	xmlHttpRequest.responseType = 'json';
	xmlHttpRequest.send(null);
}

// パラメータ取得用の関数
function getParam(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}