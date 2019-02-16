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