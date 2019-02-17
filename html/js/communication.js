var xhr = new XMLHttpRequest();
var HOST = 'https://sproutdb.herokuapp.com/post';

// jsonを送ってサーバーからデータを返してもらう
function sendjson(requestData, callback){
    requestData = JSON.stringify(requestData)
    xhr.open('POST', HOST+'/json', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(requestData);
    xhr.onreadystatechange = function() {
        if(xhr.readyState==4 && (xhr.status==200 || xhr.status==304)) callback.apply(xhr);
    };
}

// 新規アカウントを作成する関数（メアド、ハッシュ化されたパスワード）
function new_Account(mail, hpass, callback) {
    if(!mail) mail='null';
    if(!hpass) hpass='null';
    var data = {
        'method':'create',
        'want':'user',
        'send':{'mail': mail, 'pass': hpass}
    }
    sendjson(data, function(){
        console.log(this.response);
        // ここでローカルストレージにuserIDとsessIDを登録
        var tmp = JSON.parse(this.response);
        if(!("userID" in tmp)) tmp["userID"] = null;
        if(!("sessID" in tmp)) tmp["sessID"] = null;
        localStorage.clear();
        localStorage.setItem("guestKey", JSON.stringify(tmp));
        callback(this.response);
    });
}

// リストを取りに行く
function get_list(userID, sessID, callback) {
    if(!userID) userID='null';
    if(!sessID) sessID='null';
    var data = {
        'method':'get',
        'want':'list',
        'send':{'userID': userID, 'sessID': sessID}
    }
    sendjson(data, function(){
        localStorage.removeItem("userList");
        obj_userData = JSON.parse(this.response)["list"];
        localStorage.setItem("userList", JSON.stringify([obj_userData]));
        callback(this.response);
    });
}

// ユーザーデータを取ってくる関数（ユーザーID）
function get_userData(user_id, callback) {
    // ローカルストレージにデータがあるならサーバーに要求を送らない！
    if(!("userData" in localStorage)) {
		var obj_userData = []
		localStorage.setItem("userData", JSON.stringify(obj_userData));
    }
    var obj_userData = JSON.parse(localStorage.getItem("userData"));
    var index = obj_userData.findIndex(({userID}) => userID === user_id);
    if(index != -1) {
        callback();
        return;
    }

    // 要求処理
    var data = {
        'method':'get',
        'want':'user',
        'send':{'userID': user_id}
    }
    sendjson(data, function(){
        console.log("re = " + this.response);
        // ローカルストレージに登録する（同じユーザーIDは存在しないので単純に加えるだけ）
        var obj_userData = JSON.parse(localStorage.getItem("userData"));
        obj_userData.push(JSON.parse(this.response)["user"]);
        localStorage.setItem("userData", JSON.stringify(obj_userData));
        // 元の処理を続ける
        callback();
    });
}

// ログインを行う（メアド、ハッシュ化されたパスワード）
function login(mail, hpass, callback) {
    if(!mail) mail='null';
    if(!hpass) hpass='null';
    var data = {
        'method':'get',
        'want':'login',
        'send':{'mail': mail, 'pass': hpass}
    }
    sendjson(data, function(){
        console.log(this.response);
        // sessIDとuserIDをローカルストレージに登録
        var tmp = JSON.parse(this.response);
        if(!("userID" in tmp)) tmp["userID"] = null;
        if(!("sessID" in tmp)) tmp["sessID"] = null;
        localStorage.clear();
        localStorage.setItem("guestKey", JSON.stringify(tmp));
        callback(this.response);
    });
}

// ログアウト
function logout(userID, sessID, callback) {
    var guestData = JSON.parse(localStorage.getItem("guestKey"));
    if(!userID) userID=guestData["userID"];
    if(!sessID) sessID=guestData["sessID"];
    var data = {
        'method':'send',
        'want':'logout',
        'send':{'userID': userID, 'sessID': sessID}
    }
    sendjson(data, function(){
        console.log(this.response);
        callback(this.response);
    });
}

// 位置情報をサーバーに送信する
function send_pos(userID, sessID, posx, posy, callback) {
    if(!posx) posx='null';
    if(!posy) posy='null';
    var data = {
        'method':'send',
        'want':'pos',
        'send':{'posx': posx, 'posy': posy, 'userID': userID, 'sessID': sessID}
    }
    sendjson(data, function(){
        console.log("send");
        console.log(this.response);
        callback(this.response);
    });
}

// 認証済みかチェックする
function get_chk(userID, sessID, callback) {
    if(!userID) userID='null';
    if(!sessID) sessID='null';
    var data = {
        'method':'get',
        'want':'sessID',
        'send':{'userID': userID, 'sessID': sessID}
    }
    sendjson(data, function(){
        callback(this.response);
    });
}

// 画像データをサーバから受け取る
function getImg(userID, calltag, callback){
    // 画像を取得し、表示させる関数になってます
    xhr.open('POST', HOST+'/Timage', true);
    xhr.onload = function() {
        console.log(this.response);
        var oURL = URL.createObjectURL(this.response);
        var image = new Image();
        image.onload = function() {
            URL.revokeObjectURL(oURL);
        };
        image.src = oURL;
        image.className = "userPage_userIcon";
        calltag.appendChild(image);
        callback();
    };
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    //返答の仕方を設定
    xhr.responseType = 'blob';
    //var formdata = new FormData();
    xhr.send('userID='+userID);
    //xhr.send(formdata);
    console.log(xhr.response);
}

// 画像データをサーバから受け取る（リスト用）
function getImg_forLS(userID, calltag, callback){
    // 画像を取得し、表示させる関数になってます
    xhr.open('POST', HOST+'/Timage', true);
    xhr.onload = function() {
        console.log(this.response);
        var oURL = URL.createObjectURL(this.response);
        var image = new Image();
        image.onload = function() {
            URL.revokeObjectURL(oURL);
        };
        image.src = oURL;
        image.className = "list_boldIcon";
        calltag.appendChild(image);
        callback();
    };
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    //返答の仕方を設定
    xhr.responseType = 'blob';
    //var formdata = new FormData();
    xhr.send('userID='+userID);
    //xhr.send(formdata);
    console.log(xhr.response);
}