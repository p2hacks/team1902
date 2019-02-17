
// ローカルストレージの初期化
function fn_resetLocalStorage(){
    localStorage.clear();
    console.log("ローカルストレージを初期化しました。");
}

// jsonか判定
var isJSON = function(arg) {
    arg = (typeof arg === "function") ? arg() : arg;
    if (typeof arg  !== "string") {
        return false;
    }
    try {
    arg = (!JSON) ? eval("(" + arg + ")") : JSON.parse(arg);
        return true;
    } catch (e) {
        return false;
    }
};