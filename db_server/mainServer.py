#--*--utf-8--*--
# このファイルを起動すればサーバーが立ち上がります
from flask import Flask, request, send_from_directory
from conceptLayer import *
from outlayer import *
import sys, os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = './prof_imgs'

@app.route("/post", methods=['POST'])
def getData():
    data = request.form['user']
    return getUser(int(data))

@app.route("/post/json", methods=['POST'])
def getjson():
    data = request.json
    
    if data['method']=='get':
        user_id = sessToUser(data['send']['sessID'])
        if data['want']=='login':
            return login(data['send']['name'], data['send']['pass'])
        elif data['want']=='user':
            if user_id == 'error':
                user_id = data['send']['user_id']
            return getUser(user_id)
        elif data['want']=='list':
            return getListOfList(user_id)
        elif data['want']=='post':
            postID = []
            return postID

    elif data['method']=='create':
        if data['want']=='user':
            return userRegister(data['send']['name'], data['send']['pass'])
        elif data['want']=='list':
            makeList(sessToUser(data['send']['sessID']), data['send']['listname'], data['send']['ids'])

    elif data['method']=='delete':
        if data['want']=='user':
            return userDestroy(data['send']['sessID'])
        elif data['want']=='list':
            delList(sessToUser(data['send']['sessID']), data['send']['listID'])

    elif data['method']=='update':
        if data['want']=='user':
            return data['send']['hoge']

    elif data['method']=='send':
        if data['want']=='post':
            pass
        elif data['want']=='logout':
            logout(data['send']['sessID'])

@app.route("/post/image", methods=['POST'])
def getimg():
    if request.form['method']=='update':
        user_id = request.form['sessID'] #sessToUser(request.form['sessID'])
        if user_id=='error':
            return 'sessID error'
        img_file = request.files['prof_img']
        img_file.save(os.path.join(app.config['UPLOAD_FOLDER'], str(user_id)+".jpg"))
        return 'done'

    elif request.form['method']=='get':
        user_id = sessToUser(request.form['sessID'])
        if user_id=='error':
            return 'sessID error'
        return send_from_directory(app.config['UPLOAD_FOLDER'], str(user_id)+".jpg")

if __name__=='__main__':
    #外部 app.run(host='0.0.0.0', port=3000, threaded=True)
    app.run(host='localhost', port=3000)