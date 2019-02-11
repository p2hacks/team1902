from conceptLayer import *
import json

def getListOfList(user_id):
    data = [getListData(user_id, i) for i in getListID(user_id)]
    return json.dumps(data)

def login(name, hpass):
    id = checkAC(name, hpass)
    if id!=0:
        return makeSessID(id)
    else:
        return 0

def logout(sess_id):
    delSessID(sess_id)

def userRegister(name, hpass):
    makeAC(name, hpass)
    user_id = checkAC(name, hpass)
    addUser(user_id, name, "","","")
    makeList(user_id, "default", "")
    return makeSessID(user_id)

def userDestroy(sess_id):
    user_id = sessToUser(sess_id)
    delSessID(sess_id)
    list_id = getListID(user_id)
    for i in list_id:
        delList(user_id, i)
    delUser(user_id)
    delAC(user_id)