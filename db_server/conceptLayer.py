#--*--utf-8--*--
import sqlite3, datetime, pytz, json

dbname = 'sprout.db'

def returnTime():
    return str(datetime.datetime.utcnow() + datetime.timedelta(hours=9))

#--------ユーザデータ系---------
def pullData(userID):
    try:
        with sqlite3.connect(dbname) as conn:
            c = conn.cursor()
            order = 'select * from selfData where id=?'
            return c.execute(order, (userID,)).fetchone(), None
    except:
        return None, 'Error_Get'

def updateData(userID, name, intro, urls, mail, hpass, sessID):
    try:
        with sqlite3.connect(dbname) as conn:
            c = conn.cursor()
            #search mail
            temp = c.execute('select * from selfData where mail=?', (mail,))
            for i in temp:
                if i[0]!=userID:
                    return 'Error_CreateAccount_Mail'

            urls = ','.join(urls)
            order = 'update selfData set name=?,intro=?,urls=?,mail=?,pass=?,sessID=? where id=?'
            c.execute(order, (name,intro,urls,mail,hpass,sessID,userID))
            conn.commit()
            return None
    except:
        return 'Error_Edit'

def deleteData(userID):
    try:
        with sqlite3.connect(dbname) as conn:
            c = conn.cursor()
            order = 'delete from selfData where id=?'
            c.execute(order, (userID,))
            conn.commit()
            return None
    except:
        return 'Error_Del'

def makeData(mail, hpass):
    try:
        with sqlite3.connect(dbname) as conn:
            c = conn.cursor()
            #search mail
            temp = c.execute('select * from selfData where mail=?', (mail,)).fetchone()
            if temp!=None:
                return None, 'Error_CreateAccount_Mail'

            name = mail.split('@')[0]
            order = 'insert into selfData (name, pass, mail, sessID) values (?,?,?,?)'
            c.execute(order, (name, hpass, mail, returnTime()))
            conn.commit()
            return c.execute('select * from selfData where mail=?',(mail,)).fetchone(), None
    except:
        return None, 'Error_CreateAccount'

def loginData(mail, hpass):
    try:
        with sqlite3.connect(dbname) as conn:
            c = conn.cursor()
            temp = c.execute('select pass from selfData where mail=?', (mail,)).fetchone()
            if temp==None:
                return None, 'Error_Login_Mail'
            if temp[0]!=hpass:
                return None, 'Error_Login_pass'
            
            c.execute('update selfData set sessID=? where mail=?', (returnTime(),mail))
            conn.commit()
            
            return c.execute('select * from selfData where mail=?',(mail,)).fetchone(), None
    except:
        return None, 'Error_Login'

#--------フレンドリスト系---------
def makeList(id, name, ids):
    try:
        with sqlite3.connect(dbname) as conn:
            c = conn.cursor()
            order = 'insert into myfriend (myid, listid, listname, friendid) values(?,?,?,?)'
            ids = [str(i) for i in ids]
            idS = ','.join(ids)
            listid = c.execute('select max(listid) from myfriend where myid=?', (id,)).fetchone()[0]
            if listid==None:
                listid = 0
            c.execute(order, (id, listid+1, name, idS))
            conn.commit()
            return None
    except:
        return 'Error_ListEdit'

def delList(id, listid):
    try:
        with sqlite3.connect(dbname) as conn:
            c = conn.cursor()
            c.execute('delete from myfriend where myid=? and listid=?', (id, listid))
            conn.commit()
        return None
    except:
        return 'Error_ListDel'

def getListID(id):
    try:
        with sqlite3.connect(dbname) as conn:
            c = conn.cursor()
            datas = c.execute('select listid from myfriend where myid=?', (id,))
            return [i[0] for i in datas], None
    except:
        return None, 'Error_ListGet'

def getListData(id, listid):
    try:
        with sqlite3.connect(dbname) as conn:
                c = conn.cursor()
                datas = c.execute('select * from myfriend where myid=? and listid=?', (id, listid)).fetchone()
                print("pass")
                return {"list": {
                "listName": datas[2],
                "listID":datas[1],
                "userID": datas[3].split(',')
                }}, None
    except:
        return None, 'Error_ListGet'

def editList(id, listid, listname, friendid):
    try:
        with sqlite3.connect(dbname) as conn:
            c = conn.cursor()
            fdi = dict.fromkeys(friendid)
            fdi = ','.join(fdi)
            order = 'update myfriend set listname=?, friendid=? where myid=? and listid=?'
            c.execute(order, (listname, fdi, id, listid))
            conn.commit()
        return None
    except:
        return 'Error_ListEdit'

#--------場所系---------
def addPlace(name, post):
    with sqlite3.connect(dbname) as conn:
            c = conn.cursor()
            order = 'insert into placeid (name, coord) values(?,?)'
            c.execute(order, (name, post))
            conn.commit()

def pullPlaceAllData():
    with sqlite3.connect(dbname) as conn:
        c = conn.cursor()
        order = 'select * from placeid'
        return c.execute(order)

def pullPlaceData(placeID):
    with sqlite3.connect(dbname) as conn:
        c = conn.cursor()
        order = 'select * from placeid where id=?'
        return c.execute(order, (placeID,)).fetchone()

#--------追加日時---------
def editAccessLog(userID, placeID):
    try:
        with sqlite3.connect(dbname) as conn:
            c = conn.cursor()
            order = 'select * from placelog where userid=? and placeid=?'
            data = c.execute(order, (userID,placeID)).fetchone()
            if data==None:
                makeAccessLog(userID, placeID)
                
            order = 'update placelog set date=? where userid=? and placeid=?'
            c.execute(order, (returnTime(), userID, placeID))
            conn.commit()
            return None
    except:
        return 'Error_Accesslog_Edit'

def makeAccessLog(userID, placeID):
    with sqlite3.connect(dbname) as conn:
        c = conn.cursor()
        order = 'insert into placelog (userid, placeid) values(?,?)'
        c.execute(order, (userID, placeID))
        conn.commit()

def pullAccessLog(userID, placeID):
    with sqlite3.connect(dbname) as conn:
        c = conn.cursor()
        order = 'select date from placelog where userid=? and placeid=?'
        return c.execute(order, (userID, placeID)).fetchone()[0]

#--------他のIDの追加時データ---------
def pullAddData(userID, friendID):
    try:
        with sqlite3.connect(dbname) as conn:
            c = conn.cursor()
            order = 'select * from adddata where myid=? friendid=?'
            return c.execute(order, (userID, friendID)).fetchone(), None
    except:
        return None, 'Error_AddData_Pull'

def makeAddData(userID, friendID,placeID):
    with sqlite3.connect(dbname) as conn:
        c = conn.cursor()
        order = 'insert into adddata (myid, friendid, addplaceid, adddate) values(?,?,?,?)'
        c.execute(order, (userID, friendID, placeID, returnTime()))
        conn.commit()

def editAddData(userID, friendID, placeID):
    with sqlite3.connect(dbname) as conn:
        c = conn.cursor()
        order = 'update adddata set addplaceid=?  adddate=? where myid=? and friendid=?'
        c.execute(order, (placeID, returnTime(), userID, friendID))
        conn.commit()
        return None

#--------postCardデータ系---------
def pullPostCards(placeID):
    try:
        with sqlite3.connect(dbname) as conn:
            c = conn.cursor()
            order = 'select postedUserID from postCards where placeID=?'
            return c.execute(order, (placeID,)).fetchone()[0], None
    except:
        return None, 'Error_POSTCARDS_Pull'

def makePostCards(userID, placeID):
    with sqlite3.connect(dbname) as conn:
        c = conn.cursor()
        #userID = ','.join(userID)
        order = 'insert into postCards (placeID, postedUserID) values(?,?)'
        c.execute(order, (placeID, userID))
        conn.commit()
        return None

def editPostCards(placeID, userID):
    with sqlite3.connect(dbname) as conn:
        c = conn.cursor()
        try:
            userID = ','.join(userID)
        except:
            userID = userID
        order = 'update postCards set postedUserID=? where placeID=?'
        c.execute(order, (userID, placeID))
        conn.commit()
        return None

'''
if __name__=='__main__':
    #addUser("hoge", "test.png", "test", "")
    #delUser(1)
    #print(getUser(2))
    #makeList(1, 'default', '')
    #editUser(1, "root", "test.png", "test", ["test.com", "hoge.com"])
    #print(getListID(1))
    #print(getListData(1, 1))
    #editList(1, 1, "hogehoge", ["12", "15"])
    #delList(1, 2)
    #delAC(1)
    '''
'''
if __name__=='__main__':
    data = [['未来大','41.841750,140.767009,0.000674'],
        ['未来大大学院','41.842000,140.765829,0.000315'],
        ['教育大','41.792875,140.740817,0.001348'],
        ['函館大学','41.788815,140.806380,0.000899'],
        ['北大','41.809959,140.718027,0.001348'],
        ['函館駅','41.773786,140.726478,0.000719'],
        ['五稜郭公園','41.796895,140.756136,0.002247'],
        ['五稜郭タワー','41.794785,140.754071,0.000449'],
        ['函館山'  ,'41.760182,140.705865,0.008988'],
        ['新函館北斗駅','41.904705,140.648377,0.001078'],
        ['新青森駅','40.827844,140.693404,0.001168'],
        ['札幌駅','43.068715,141.350766,0.000899'],
        ['秋田駅','39.716904,140.129854,0.000899'],
        ['盛岡駅','39.702018,141.136491,0.001798'],
        ['仙台駅','38.260153,140.882437,0.000674'],
        ['東京駅','35.681244,139.767123,0.001798'],
        ['東京タワー','35.658598,139.745434,0.000449'],
        ['サンリオピューロランド','35.624654,139.429155,0.000719'],
        ['東京ディズニーランド','35.632938,139.880382,0.003595'],
        ['幕張メッセ','35.648425,140.034623,0.003595'],
        ['京都タワー','34.987557,135.759219,0.000180'],
        ['通天閣','34.652519,135.506303,0.000225'],
        ['那覇国際通り','26.215225,127.684908,0.007190'],
        ['旧グリニッジ天文台','51.476890,-0.000492,0.000539'],
        ['モンサンミッシェル','48.636047,-1.511175,0.000898'],
        ['ウガンダ国立博物館','0.336435,32.582364,0.000449'],
        ['トランプタワー','40.762724,-73.973448,0.000360']]

    for i in pullPlaceAllData():
        print(i)'''