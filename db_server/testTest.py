from flask import Flask, request
app = Flask(__name__)

@app.route("/post", methods=['POST'])
def post():
    hoge = request.form['hoge']
    return hoge

if __name__=='__main__':
    app.run(host='sproutdb', port=5000)