var xhr = new XMLHttpRequest();
//var HOST = 'http://113.213.215.192:3000/post';
var HOST = 'http://localhost:3000/post';

function sendData(datas, callback) {
    // json形式のdatasを受け取り、callback関数に対して返します
    //ホストマシンのjson通信に対して通信
    xhr.open('POST', HOST+'/json', true);
    //通信可能形式にエンコード
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    //データを送る
    xhr.send(datas);

    //ハンドラ登録
    xhr.onreadystatechange = function() {
        // 通信成功
        if(xhr.readyState==4 && (xhr.status==200||xhr.status==304)){
            //callbackのthisに対応させる
            callback.apply(xhr);
        }
    };
}

function sendNormal(){
    // 一般的なdataを送る利用例(今回使う予定無し?)
    var requestData = "user=2";
    //呼び出す時データをどうするか設定する
    sendData(requestData, function() {
        var data = this.response;
        console.log(data);
        //document.getElementById("user").innerHTML = data["user"]["Name"];//catchData["user"]["Name"];    
    });
}

function sendjson(requestData, callback){
    //json送り、レスポンスをcallbackに返します
    //なんかこれやらんと送れない
    requestData = JSON.stringify(requestData)
    
    xhr.open('POST', HOST+'/json', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(requestData);

    xhr.onreadystatechange = function() {
        //console.log(xhr)
        if(xhr.readyState==4 && (xhr.status==200||xhr.status==304)){
            callback.apply(xhr);
        }
    };
}

function controle_image(method, sessID, imagefile) {
    //試してないです
    //画像をget, updateさせる関数です
    xhr.open('POST', HOST+'/image', true);
    var formdata = new FormData();
    if(method=='get'){
        xhr.onload = function() {
            var oURL = URL.createObjectURL(this.response);
            var image = new Image();
            image.onload = function() {
                URL.revokeObjectURL(oURL);
            };
            image.src = oURL;
            image.height = 60;
            //idに対してimageを付ける
            var tagg = document.getElementById("images");
            tagg.appendChild(image)
        };
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        //返答の仕方を設定
        xhr.responseType = 'blob';
        formdata.append('method', 'update')
        formdata.append('sessID', sessID)
        xhr.send(formdata)

    }else if(method=='update'){
        formdata.append(imagefile);
        formdata.append('method', 'update');
        //formdataに対して"sessID=?"を追加
        formdata.append("sessID", sessID);
        xhr.send(formdata);

        xhr.onreadystatechange = function() {
            if(xhr.readyState==4 && (xhr.status==200||xhr.status==304)){
                //今回成功時nullを返す
                console.log(this.response);
            }
        };
    }
}

function getImg(){
    // 画像を取得し、表示させる関数になってます
    xhr.open('POST', HOST+'/Gimage', true);
    xhr.onload = function() {
        var oURL = URL.createObjectURL(this.response);
        var image = new Image();
        image.onload = function() {
            URL.revokeObjectURL(oURL);
        };
        image.src = oURL;
        image.height = 60;
        var tagg = document.getElementById("images");
        tagg.appendChild(image)
    };
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    //返答の仕方を設定
    xhr.responseType = 'blob';
    // 今回はnull送ってます
    xhr.send(null)
    console.log(xhr.response);
}

function sendImg(){
    // htmlで取得した画像データをサーバに送ります
    //フォームデータを取得
    var formdata = new FormData(document.getElementById("img_form"));
    //formdataに対して"sessID=3"を追加
    formdata.append("method", 'update')
    formdata.append("sessID", 2)
    xhr.open('POST', HOST+'/image', true);
    xhr.send(formdata);

    xhr.onreadystatechange = function() {
        if(xhr.readyState==4 && (xhr.status==200||xhr.status==304)){
            //今回成功時nullを返す
            console.log(this.response);
        }
    };
}

function login(name, hpass) {
    if(!name)name='tom';
    if(!hpass)hpass='tom';
    var data = {
        'method':'get',
        'want':'login',
        'send':{'name':name, 'pass':hpass}
    }
    sendjson(data, function(){
        console.log(this.response);
    })
}

function newAcount(mail, hpass) {
    if(!mail)mail='tom@gmail.com';
    if(!hpass)hpass='tom';
    var data = {
        'method':'create',
        'want':'user',
        'send':{'mail':mail, 'pass':hpass}
    }
    sendjson(data, function(){
        console.log(this.response);
        //今回テストなのでアカウントを作って消した
        temp = JSON.parse(this.response);
        getUserdata(temp['userID']);
        //userdelete(temp['sessID']);
    })
}

function userdelete(sessID) {
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
    var data = {
        'method':'get',
        'want':'user',
        'send':{'userID':user_id}
    }
    sendjson(data, function(){
        console.log("re = " + this.response);
    })
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