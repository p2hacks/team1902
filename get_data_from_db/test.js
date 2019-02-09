var xhr = new XMLHttpRequest();
var HOST = 'http://localhost:3000/post';

function sendData(datas, callback) {
    xhr.open('POST', HOST+'/json', true);
    //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(datas);

    //ハンドラ登録
    xhr.onreadystatechange = function() {
        if(xhr.readyState==4 && (xhr.status==200||xhr.status==304)){
            callback.apply(xhr);
        }
    };
}

function loadTest(){
    var requestData = {"location":{"ID": "hoge","DisabledDate": "2019/10/1"}};
    requestData = JSON.stringify(requestData)
    
    //呼び出す時データをどうするか設定する
    sendData(requestData, function() {
        var data = this.response;
        //data = JSON.parse(data)
        console.log(data);
        //document.getElementById("user").innerHTML = data["user"]["Name"];//catchData["user"]["Name"];    
    });
}

function img_upload(){
    //フォームデータを取得
    var formdata = new FormData(document.getElementById("img_form"));
    xhr.open('POST', HOST, true);
    xhr.send(formdata);    

    xhr.onreadystatechange = function() {
        if(xhr.readyState==4 && (xhr.status==200||xhr.status==304)){
            console.log("sending the img was succses!");
        }
    };
}

/*// これやると状態が分かる
switch (xhr.readyState) {
    case 0: //未設定
        console.log('uninitialized!');
        break;
    case 1: //データ送信中
        console.log('loading...');
        break;
    case 2: //応答待ち
        console.log('loaded.');
        break;
    case 3: //データ受信中
        console.log('interactive... '+xhr.response.length+' bytes.');
        break;
    case 4: //データ受信完了
        if(xhr.status == 200 || xhr.status == 304) {
            console.log('COMPLETE!');
            callback.apply(xhr);
        }else{
            console.log('Failed. HttpStatus: '+xhr.statusText);
        }
        xhr.abort();
        break;
}*/