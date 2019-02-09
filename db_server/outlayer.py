from conceptLayer import *
import json

def returnListOfList(user_id):
    data = [getListData(user_id, i) for i in getListID(user_id)]
    return json.dumps(data)
