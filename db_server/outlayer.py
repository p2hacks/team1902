from conceptLayer import *
import json

#--------チェック系---------
def checksessID(userID, sessID):
    data, err = pullData(userID)
    if err!=None:
        return err
    if data[0]==userID and data[6]==sessID:
        return None
    return 'Error_UserID_SessID'

#--------形式変更系---------
def returnError(errMean):
    return json.dumps({'error': errMean})

def returnSessUser(userID, sessID):
    return json.dumps({'sessID': str(sessID), 'userID': str(userID)})

def getListOfList(userID, sessID):
    err = checksessID(userID, sessID)
    if err!=None:
        return returnError(err)

    data, err = getListID(userID)
    if err!=None:
        return returnError(err)
    
    reData = []
    for i in data:
        data, err = getListData(userID, i)
        if err!=None:
            return returnError(err)
        else:
            reData.append(data)
    return json.dumps(data)

#--------ユーザーデータ系---------
def login(mail, hpass):
    data, err = loginData(mail, hpass)
    if err!=None:
        return returnError(err)
    else:
        return returnSessUser(data[0], data[6])

def logout(userID, sessID):
    err = checksessID(userID, sessID)
    if err!=None:
        return returnError(err)
    
    data, err = pullData(userID)
    if err!=None:
        return returnError(err)
    
    err = updateData(data[0], data[1], data[2], data[3], data[4], data[5], '')
    if err!=None:
        return returnError(err)
    else:
        return 'done'

def userRegister(mail, hpass):
    data, err = makeData(mail, hpass)
    if err!=None:
        return returnError(err)
    err = makeList(data[0], 'default', '')
    if err!=None:
        return returnError(err)
    return returnSessUser(data[0], data[6])

def userDestroy(userID, sessID):
    err = checksessID(userID, sessID)
    if err!=None:
        return returnError(err)
    
    listID, err = getListID(userID)
    if err!=None:
        return returnError(err)
    
    for i in listID:
        err = delList(userID, i)
        if err!=None:
            return returnError(err)
    
    err = deleteData(userID)
    if err!=None:
        return returnError(err)
    else:
        return 'done'

def listDestroy(userID, sessID, listID):
    err = checksessID(userID, sessID)
    if err!=None:
        return returnError(err)
    err = delList(userID, listID)
    if err!=None:
        return returnError(err)

#temp = userRegister('tom@gmail.com', 'aaaa')
#print(getUser('1'))
#userDestroy(int(temp['sessID']))