#--*--utf-8--*--
import sqlite3
import json

dbname = 'sprout.db'

#--------セッション系---------
sessID = {0:"error"}
def makeSessID(id):
    if min(sessID) not in {0,1}:
        sessID[min(sessID)-1] = id
        return min(sessID)
    else:
        sessID[max(sessID)+1] = id
        return max(sessID)

def delSessID(id):
    try:
        del sessID[id]
    except:
        pass

def sessToUser(id):
    try:
        return sessID[id]
    except:
        return sessID[0]

#--------アカウントデータ系---------
def makeAC(mail, hpass):
    '''
    idをどう指定したら良いかわからん
    1, 2作成後1削除すると次作られるのは3
    '''
    with sqlite3.connect(dbname) as conn:
        c = conn.cursor()
        name = mail.split('@')[0]
        order = 'insert into log (name, pass, mail) values (?,?,?)'
        c.execute(order, (name, hpass, mail))
        conn.commit()

def checkAC(mail, hpass):
    with sqlite3.connect(dbname) as conn:
        c = conn.cursor()
        order = 'select id from log where mail=? and pass=?'
        try:
            return c.execute(order, (mail, hpass)).fetchone()[0]
        except:
            return 'error'

def searchAC(id):
    with sqlite3.connect(dbname) as conn:
        c = conn.cursor()
        order = 'select * from log where id =?'
        try:
            return c.execute(order, id).fetchone()[0]
        except:
            return 'error'

def delAC(id):
    with sqlite3.connect(dbname) as conn:
        c = conn.cursor()
        order = 'delete from log where id=?'
        c.execute(order, (id,))
        conn.commit()

#--------ユーザーデータ系---------
def addUser(id, name, icon, intro, urls):
    with sqlite3.connect(dbname) as conn:
        c = conn.cursor()
        urlLine = ','.join(urls)
        order = 'insert into selfData (id, name, icon, intro, urls) values (?,?,?,?,?)'
        c.execute(order, (id,name, icon, intro, urlLine))
        conn.commit()

def delUser(id):
    with sqlite3.connect(dbname) as conn:
        c = conn.cursor()
        order = 'delete from selfData where id=?'
        c.execute(order, (id,))
        conn.commit()

def getUser(id):
    with sqlite3.connect(dbname) as conn:
        c = conn.cursor()
        order = 'select * from selfData where id=?'
        print('do')
        try:
            
            datas = c.execute(order, (id,)).fetchone()
            dictdata = {
            "user":{
                "ID": datas[0],
                "Name": datas[1],
                "icon": datas[2],
                "url": datas[4].split(','),
                "profile": datas[3]
                }
            }
            return json.dumps(dictdata)
        except:
            return 'error'

def editUser(id, name, icon, profile, url):
    with sqlite3.connect(dbname) as conn:
        c = conn.cursor()
        urls = ','.join(url)
        order = 'update selfData set name=?, icon=?, intro=?, urls=? where id = ?'
        c.execute(order, (name, icon, profile, urls, id))
        conn.commit()

#--------フレンドリスト系---------
def makeList(id, name, ids):
    with sqlite3.connect(dbname) as conn:
        c = conn.cursor()
        order = 'insert into myfriend (myid, listid, listname, friendid) values(?,?,?,?)'
        ids = [str(i) for i in ids]
        idS = ','.join(ids)
        listid = c.execute('select max(listid) from myfriend where myid=?', (id,)).fetchone()[0]
        if listid==None: listid = 0
        c.execute(order, (id, listid+1, name, idS))
        conn.commit()

def delList(id, listid):
    with sqlite3.connect(dbname) as conn:
        c = conn.cursor()
        c.execute('delete from myfriend where myid=? and listid=?', (id, listid))
        conn.commit()

def getListID(id):
    with sqlite3.connect(dbname) as conn:
        c = conn.cursor()
        datas = c.execute('select listid from myfriend where myid=?', (id,))
        return [i[0] for i in datas]

def getListData(id, listid):
    with sqlite3.connect(dbname) as conn:
        c = conn.cursor()
        datas = c.execute('select * from myfriend where myid=? and listid=?', (id, listid)).fetchone()
        return {"list": {
            "listName": datas[2],
            "listID":datas[1],
            "userID": datas[3].split(',')
        }}

def editList(id, listid, listname, friendid):
    with sqlite3.connect(dbname) as conn:
        c = conn.cursor()
        fdi = ','.join(friendid)
        order = 'update myfriend set listname=?, friendid=? where myid=? and listid=?'
        c.execute(order, (listname, fdi, id, listid))
        conn.commit()

#--------追加日時リスト系---------
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