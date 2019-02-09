#--*--utf-8--*--
from flask import Flask, render_template, request
from conceptLayer import *
import sys
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/post", methods=['POST'])
def post():
    data = request.form['user']
    return getUser(int(data))

if __name__=='__main__':
    #外部 app.run(host='0.0.0.0', port=3000, threaded=True)
    app.run(host='localhost', port=3000)