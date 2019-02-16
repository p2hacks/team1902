//これは実際に動かしてエラーが起きない関数群です
var xhr = new XMLHttpRequest();
var HOST = 'http://35.212.131.182:3000/post';

function sendjson(requestData, callback) {
    requestData = JSON.stringify(requestData)
    xhr.open('POST', HOST+'/json', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(requestData);
    xhr.onreadystatechange = function() {
        if(xhr.readyState==4 && (xhr.status==200||xhr.status==304)){
            callback.apply(xhr);
        }
    };
}

function login(name, hpass) {
    //うごかない
    //usercase
    if(!name)name='tom';
    if(!hpass)hpass='tom';
    //jsondata
    var data = {
        'method':'get',
        'want':'login',
        'send':{'name':name, 'pass':hpass}
    }
    //sendjson(送るデータ, 帰ってくる値を適応させたい関数)
    sendjson(data, function(){
        console.log(this.response);
    })
}

function newAcount(name, hpass) {
    //うごく
    //新規登録する関数
    if(!name)name='tom';
    if(!hpass)hpass='tom';
    var data = {
        'method':'create',
        'want':'user',
        'send':{'name':name, 'pass':hpass}
    }
    sendjson(data, function(){
        console.log('sessID = '+this.response);
        //今回テストなのでアカウントを作って消した
        userdelete(this.response);
    })
}

function userdelete(sessID) {
    //ユーザデータ消す関数
    var data = {
        'method':'delete',
        'want':'user',
        'send':{'sessID':sessID}
    }
    sendjson(data, function(){
        console.log(this.response);
    })
}

function getUserdata(user_id) {
    //ユーザデータを取得する関数
    var data = {
        'method':'get',
        'want':'user',
        'send':{'userID':user_id}
    }
    sendjson(data, function(){
        console.log(this.response);
    })
}

function getImg(userID, calltag){
    // 画像を取得し、calltagに対しタグ付けをします
    xhr.open('POST', HOST+'/Gimage', true);
    xhr.onload = function() {
        var oURL = URL.createObjectURL(this.response);
        var image = new Image();
        image.onload = function() {
            URL.revokeObjectURL(oURL);
        };
        image.src = oURL;
        image.height = 60;
        calltag.appendChild(image)
        //var tagg = document.getElementById("images");
        //tagg.appendChild(image)
    };

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    //返答の仕方を設定
    xhr.responseType = 'blob';
    // 今回はnull送ってます
    xhr.send('userID='+userID)
    console.log(xhr.response);
}

function viewImg() {
    //ここで画像をつけるタグを取得する
    var pair = document.getElementById("images");
    getImg(2, pair)
}