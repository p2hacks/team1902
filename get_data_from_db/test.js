function sendData(datas, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/post', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhr.send(datas);

    //ハンドラ登録
    xhr.onreadystatechange = function() {
        if(xhr.readyState==4 && (xhr.status==200||xhr.status==304)){
            callback.apply(xhr);
        }
        /*
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
        }
        */
    };
}

function loadTest(){
    //呼び出す時データをどうするか設定する
    sendData("user=2", function() {
        var data = this.response;
        data = JSON.parse(data)
        console.log(data);
        document.getElementById("user").innerHTML = data["user"]["Name"];//catchData["user"]["Name"];    
    });
}