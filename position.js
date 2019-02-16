async function index(){//　状態・経度・緯度
    console.log('hoge')
    var a = await getposition()
    console.log(a)
  }
  
  function getposition(){
    return new Promise((resolve, reject) => {
        test = []
        if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position) => {
              if(position.coords.altitude >1000 && position.coords.speed > 10){
                test.push(5);//5:高度速度エラー
              }else{
                test.push(0);//エラーなし
              }
                test.push(position.coords.longitude)
                test.push(position.coords.latitude)
                resolve(test);
            },
            // 取得失敗した場合
            (error) => {
              // エラーコード(error.code)の番号
              // 1:UNKNOWN_ERROR        原因不明のエラー
              // 2:PERMISSION_DENIED      利用者が位置情報の取得を許可しなかった
              // 3:POSITION_UNAVAILABLE    電波状況などで位置情報が取得できなかった
              // 4:TIMEOUT          位置情報の取得に時間がかかり過ぎた…
              // 5:VHICLE_USING         乗り物使用または全力疾走
              // 6:INCOMPATIBLE         非対応の端末・形式
            test.push(1 + error.code);
            test.push(0);
            test.push(0);
            reject(test);
            }
      );
    }else{
      test.push(6);//端末非対応
      test.push(0);
      test.push(0);
      return test;
    }
    });
  }