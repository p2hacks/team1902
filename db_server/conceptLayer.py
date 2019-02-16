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
            temp = c.execute('select * from selfData where mail=?', (mail,)).fetchone()
            if temp!=None:
                return 'Error_CreateAccount_Mail'

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
                return 'Error_Login_Mail'
            if temp!=hpass:
                return 'Error_Login_pass'
            
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
            fdi = ','.join(friendid)
            order = 'update myfriend set listname=?, friendid=? where myid=? and listid=?'
            c.execute(order, (listname, fdi, id, listid))
            conn.commit()
        return None
    except:
        return 'Error_ListEdit'

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