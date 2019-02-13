async function getLocation() {
  var state = 0;//0:通常 other:エラーコード
  var latLocation =0;
  var lngLocation =0;
  var result = new Object();

  //const request = require('request');

  //const requestPromise = (resCB) => new Promise((resolve))
  // 対応している
  //function gl() {
    if ( navigator.geolocation )
    {
      // 現在地を取得
      navigator.geolocation.getCurrentPosition(

        // [第1引数] 取得に成功した場合の関数
        function( position )
      {
        // 取得したデータの整理
        var data = position.coords ;

        // データの整理
        var lat = data.latitude ;
        var lng = data.longitude ;
        var alt = data.altitude ;
        var speed = data.speed ;
        alert('success');
        if (alt > 1000 || speed > 10) {//通常ではない高度または速度
          var errorNo = 5;
          state = errorNo;
        } else {

          latLocation = lat;
          lngLocation = lng;
        }
      }
      , 

        // [第2引数] 取得に失敗した場合の関数
        function( error )
      {
        // エラーコード(error.code)の番号
        // 1:UNKNOWN_ERROR        原因不明のエラー
        // 2:PERMISSION_DENIED      利用者が位置情報の取得を許可しなかった
        // 3:POSITION_UNAVAILABLE    電波状況などで位置情報が取得できなかった
        // 4:TIMEOUT          位置情報の取得に時間がかかり過ぎた…

        // 5:VHICLE_USING         乗り物使用または全力疾走
        // 6:INCOMPATIBLE         非対応の端末・形式
        alert('error');
        // エラー番号
        var errorNo = 1 + error.code ;
        state = errorNo;
      } 
      , 

        // [第3引数] オプション
      {
      "enableHighAccuracy": 
        false, 
        "timeout": 
        8000, 
        "maximumAge": //保存期間millis
        2000,
      }

      ) ;

      // 対応していない場合
    } else {
      var errorNo = 6;
      state = errorNo;
    }
  //}

  var resCB = function() {
    
    result.state = state;
    result.lat = latLocation;
    result.lng = lngLocation;

    alert(latLocation);
  }

  //gl(resCB);
  //resCB(gl);
  return result;
}

var a;
alo();


async function alo() {
  a = getLocation();
  await alert(a);
  var text = "";
  text += a.lat;
  text += a.lng;
  alert(text);
  
}

//getloc(alo);
