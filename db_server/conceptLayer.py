#--*--utf-8--*--
import sqlite3
from contextlib import closing
import json

dbname = 'sprout.db'

#--------ユーザーデータ系---------
def addUser(name, icon, intro, urls):
    '''
    idをどう指定したら良いかわからん
    1, 2作成後1削除すると次作られるのは3
    '''
    with sqlite3.connect(dbname) as conn:
        c = conn.cursor()
        urlLine = ','.join(urls)
        order = 'insert into selfData (name, icon, intro, urls) values (?,?,?,?)'
        c.execute(order, (name, icon, intro, urlLine))
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
    #delList(1, 2)'''