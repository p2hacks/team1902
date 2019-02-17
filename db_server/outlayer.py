from conceptLayer import *
import json

#--------チェック系---------
def checksessID(userID, sessID):
    data, err = pullData(userID)
    if err!=None:
        return err

    if data==None:
        return 'Error_Attestation'
    elif int(data[0])==int(userID) and str(data[6])==str(sessID):
        print("checkok!")
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
    err = makeList(data[0], '#全てのユーザー', '')
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

def updateUserData(userID, sessID, userName, userURL, userProfile, mail, hpass):
    err = checksessID(userID, sessID)
    if err!=None:
        return returnError(err)
    err = updateData(userID, userName, userProfile, userURL, mail, hpass, sessID)
    return getUserJson(userID)

def updateListData(userID, sessID, listName, listID, friendID):
    err = checksessID(userID, sessID)
    if err!=None:
        return returnError(err)
    err = editList(userID, listID, listName, friendID)
    if err!=None:
        return returnError(err)
    return 'done'

def listDestroy(userID, sessID, listID):
    err = checksessID(userID, sessID)
    if err!=None:
        return returnError(err)
    
    err = delList(userID, listID)
    if err!=None:
        return returnError(err)
    return 'done'

def getUserJson(userID):
    data, err = pullData(userID)
    if err!=None:
        return returnError(err)
    
    URLS = [] if data[3]==None else data[3].split(',')
    
    return json.dumps({
        "user":{
		"userID": data[0],
		"userName": data[1],
		"userURL": URLS,
		"userProfile":data[2]
	}
    })

def postSave(userID, posX, posY, sessID):
    err = checksessID(userID, sessID)
    if err!=None:
        return returnError(err)
    
    backData = []

    posALLdata = [i for i in pullPlaceAllData()]
    for i in posALLdata:
        posts = i[2].split(',')
        if calcDistanse(posX, posY, float(posts[0]), float(posts[1]), float(posts[2])):
            placeID = i[0]
            err = editAccessLog(userID, placeID)
            friendsID, err = pullPostCards(placeID)
            friendsID = friendsID.split(',')
            if friendsID=='':
                editPostCards(userID, placeID)
            else:
                userID_temp = [userID]
                editPostCards(userID_temp.append(friendsID), placeID)

            data, err = getListData(userID, 1)
            if err!=None:
                return returnError(err)

            err = editList(userID, 1, data['list']['listName'], friendsID.append(data['list']['userID']))
            #diff = friendsID - data['list']['userID']
            #diff = list(diff)
            if friendsID[0]!='':
                for j in friendsID:
                    makeAddData(userID, j, placeID)
            print(i[1])
            backData.append(i[1])
    return json.dumps({'posName': backData})

def calcDistanse(userX, userY, postX, postY, postR):
    deffX = pow(userX-postX, 2)
    deffY = pow(userY-postY, 2)
    sqrR = pow(postR, 2)
    return True if deffX+deffY <= sqrR else False

def createNewList(userID, sessID, listName, ids):
    err = makeList(userID, listName, ids)
    return getListOfList(userID, sessID)

#temp = userRegister('tom@gmail.com', 'aaaa')
#print(getUser('1'))
#userDestroy(int(temp['sessID']))