from http.server import HTTPServer, SimpleHTTPRequestHandler
import socketserver
from datetime import datetime

PORT = 8000
HOST = 'localhost'
Handler = SimpleHTTPRequestHandler
httpd = HTTPServer((HOST, PORT), SimpleHTTPRequestHandler)

import cgitb, cgi, os, json, sys, io, urllib.parse

def main():
    #文字コード変更
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    #エラーをブラウザに送信
    cgitb.enable()
    #値取得
    data = sys.stdin.read()
    params = json.loads(data)

    task_id = params["task_id"]
    session_id = params["sess_id"]
    user_id = params["user_id"]
    url = params["url_ss"] #url encoded

    #url decode
    url = urllib.parse.unquote(url)

    #処理
    response = {"hoge": "huga"}

    #response
    print('Content-type: text/html\nAccess-Control-Allow-Origin: *\n')
    print("\n\n")
    print(json.JSONEncoder().encode(response))
    print('\n')

if __name__=='__main__':
    #サーバ起動時のログを出力
    print(' === Server Start!! === ', datetime.now().strftime("%Y/%m/%d %H:%M:%S") )
    print('serving at port', PORT)

    try:
        httpd.serve_forever()
    except:
        print(' === Server Stopped === ', datetime.now().strftime("%Y/%m/%d %H:%M:%S") )
    while(True):
        main()