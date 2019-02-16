#--*--utf-8--*--
# このファイルを起動すればサーバーが立ち上がります
# https://sproutdb.herokuapp.com
from flask import Flask, request, send_from_directory
from conceptLayer import *
from outlayer import *
import sys, os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = './prof_imgs'

@app.route("/post/json", methods=['POST'])
def getjson():
    data = request.json
    print(data)
    
    if data['method']=='get':
        if data['want']=='login':#remake
            return login(data['send']['mail'], data['send']['pass'])
        elif data['want']=='user':#remake
            return getUserJson(data['send']['userID'])
        elif data['want']=='list':#remake
            return getListOfList(data['send']['userID'], data['send']['sessID'])
        elif data['want']=='post':#No
            return 'no make'

    elif data['method']=='create':
        if data['want']=='user':#remake
            return userRegister(data['send']['mail'], data['send']['pass'])
        elif data['want']=='list':#check
            makeList(data['send']['userID'], data['send']['listname'], data['send']['ids'])

    elif data['method']=='delete':
        if data['want']=='user':#remake
            return userDestroy(data['send']['userID'], data['send']['sessID'])
        elif data['want']=='list':#remake
            return listDestroy(data['send']['userID'], data['send']['sessID'], data['send']['listID'])

    elif data['method']=='update':
        if data['want']=='user':
            return data['send']['hoge']
        elif data['want']=='list':
            return ''

    elif data['method']=='send':
        if data['want']=='post':
            pass
        elif data['want']=='logout':#remake
            return logout(data['send']['userID'], data['send']['sessID'])

@app.route("/post/Fimage", methods=['POST'])
def sendFromClient():
    #remake
    userID = request.form['userID']
    sessID = request.form['sessID']
    err = checksessID(userID, sessID)
    if err!=None:
        return returnError(err)
    
    img_file = request.files['prof_img']
    img_file.save(os.path.join(app.config['UPLOAD_FOLDER'], str(userID)+".jpg"))
    return 'done'

@app.route("/post/Timage", methods=['POST'])
def sendToCliant():
    #remake
    userID = request.form['userID']
    sessID = request.form['sessID']
    err = checksessID(userID, sessID)
    if err!=None:
        return returnError(err)
    try:
        return send_from_directory(app.config['UPLOAD_FOLDER'], str(userID)+".jpg")
    except:
        return send_from_directory(app.config['UPLOAD_FOLDER'], "default.jpg")

if __name__=='__main__':
    #外部 app.run(host='0.0.0.0', port=3000, threaded=True)
    app.run(host='localhost', port=3000)