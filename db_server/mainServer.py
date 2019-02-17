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
    
    if data['method']=='get':
        if data['want']=='login':#remake
            return login(data['send']['mail'], data['send']['pass'])
        elif data['want']=='user':#remake
            return getUserJson(int(data['send']['userID']))
        elif data['want']=='list':#remake
            return getListOfList(int(data['send']['userID']), data['send']['sessID'])
        elif data['want']=='post':#No
            return 'no make'
        elif data['want']=='sessID':
            err = checksessID(data['send']['userID'], data['send']['sessID'])
            return 'True' if err!=None else returnError(err)

    elif data['method']=='create':
        if data['want']=='user':#remake
            return userRegister(data['send']['mail'], data['send']['pass'])
        elif data['want']=='list':#check
            return createNewList(int(data['send']['userID']), data['send']['sessID'], data['send']['listname'], data['send']['ids'])

    elif data['method']=='delete':
        if data['want']=='user':#remake
            return userDestroy(int(data['send']['userID']), data['send']['sessID'])
        elif data['want']=='list':#remake
            return listDestroy(int(data['send']['userID']), data['send']['sessID'], int(data['send']['listID']))

    elif data['method']=='update':
        if data['want']=='user':
            return updateUserData(data['send']['userID'], data['send']['sessID'], data['send']['userName'], data['send']['userURL'], data['send']['userProfile'], data['send']['mail'], data['send']['pass'])
        elif data['want']=='list':
            return updateListData(data['send']['userID'], data['send']['sessID'], data['send']['listName'], data['send']['listID'], data['send']['friendID'])

    elif data['method']=='send':
        if data['want']=='post':
            return postSave(int(data['send']['userID']), float(data['send']['posx']), float(data['send']['posy']), data['send']['sessID'])
        elif data['want']=='logout':#remake
            return logout(int(data['send']['userID']), data['send']['sessID'])

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
    try:
        return send_from_directory(app.config['UPLOAD_FOLDER'], str(userID)+".jpg")
    except:
        return send_from_directory(app.config['UPLOAD_FOLDER'], "default.png")

if __name__=='__main__':
    #外部 app.run(host='0.0.0.0', port=3000, threaded=True)
    app.run(host='localhost', port=3000)