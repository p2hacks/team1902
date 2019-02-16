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
function new_Account(mail, hpass) {
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
        if(!("userID" in tmp)) tmp["userID"] = null;
        localStorage.setItem("guestKey", JSON.stringify(tmp));
        // 自分のユーザーデータを取ってくる（なくてもいい？）
        if(JSON.parse(this.response)['userID'] != null) get_userData(JSON.parse(this.response)['userID']);
    });
}

// ユーザーデータを取ってくる関数（ユーザーID）
function get_userData(user_id, callback) {
    // ローカルストレージにデータがあるならサーバーに要求を送らない！
    if(!("userData" in localStorage)) {
		var obj_userData = {
		}
		localStorage.setItem("userData", JSON.stringify(obj_userData));
    }
    var obj_userData = JSON.parse(localStorage.getItem("userData"));

    // 要求処理
    var data = {
        'method':'get',
        'want':'user',
        'send':{'userID': user_id}
    }
    sendjson(data, function(){
        console.log("re = " + this.response);
        // ローカルストレージに登録する
        var obj_userData = JSON.parse(localStorage.getItem("userData"));
        // 元の処理を続ける
        callback();
    });
}

// ログインを行う（メアド、ハッシュ化されたパスワード）
function login(mail, hpass) {
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
        if(!("userID" in tmp)) tmp["userID"] = null;
        localStorage.setItem("guestKey", JSON.stringify(tmp));
    });
}