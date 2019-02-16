from conceptLayer import *
import json

def getListOfList(user_id):
    data = [getListData(user_id, i) for i in getListID(user_id)]
    return json.dumps(data)

def login(name, hpass):
    id = checkAC(name, hpass)
    if id!=0:
        return str(makeSessID(id))
    else:
        return 0

def logout(sess_id):
    delSessID(sess_id)

def userRegister(mail, hpass):
    makeAC(mail, hpass)
    user_id = checkAC(mail, hpass)
    addUser(user_id, mail.split('@')[0], "hoge","hoge","hoge")
    makeList(user_id, "default", "")
    return json.dumps({'sessID': str(makeSessID(user_id)), 'userID': str(user_id)})

def userDestroy(sess_id):
    try:
        user_id = sessToUser(int(sess_id))
        delSessID(sess_id)
        list_id = getListID(user_id)
        for i in list_id:
            delList(user_id, i)
        delUser(user_id)
        delAC(user_id)
        return 'done'
    except:
        return 'error'

#temp = userRegister('tom@gmail.com', 'aaaa')
#print(getUser('1'))
#userDestroy(int(temp['sessID']))