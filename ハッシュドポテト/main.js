// 
window.addEventListener("load", function(event) {
	var a = "ポテト";
	console.log(a+"をハッシュ化します。");
	
	var b = (new jsSHA(a,'ASCII')).getHash('SHA-384','HEX');
	console.log("お待たせいたしました。ハッシュド"+a+"です。"+b);
});