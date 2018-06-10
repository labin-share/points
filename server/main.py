import json

from bson import json_util
from flask import Flask
from flask import request, render_template, json

import db_tool

db_tool.connect_db()
app = Flask(__name__)


@app.route('/')
def hello():
    return render_template('index.html')


@app.route('/save', methods=['POST'])
def save():
    data = json.loads(request.data)
    db_tool.create(data)
    name = json.loads(request.data).get('name')
    phone = json.loads(request.data).get('phone')
    next_user_list = [{'name':name, 'phone':phone}]
    previous_info = json.loads(request.data).get('previous')
    previous_phone = previous_info.get('phone')
    previous_name = previous_info.get('name')
    if (previous_info):
        previous_user = db_tool.search(name=previous_name, phone=previous_phone)
        user_info = convert_to_list(previous_user)[0]
        if (not user_info['next']):
            user_info['next'] = []
        user_info['next'].append(next_user_list)
        db_tool.update({"name": previous_name}, user_info)
    return "success"


@app.route('/users')
def search():
    name = request.args.get('name')
    phone = request.args.get('phone')
    result = db_tool.search(name, phone)
    return json_util.dumps(result)


@app.route('/score/increase', methods=['PUT'])
def increase():
    result = get_user_info()
    user_info = convert_to_list(result)
    if (user_info):
        user_info = user_info[0]
        score = json.loads(request.data).get('score')
        user_info['score'] += int(score)
        db_tool.update({"name": user_info['name'], "phone": user_info['phone']}, user_info)
        return "Success"
    return "Fail"


@app.route('/score/decrease', methods=['PUT'])
def decrease():
    result = get_user_info()
    user_info = convert_to_list(result)
    if (user_info):
        user_info = user_info[0]
        score = json.loads(request.data).get('score')
        user_info['score'] -= int(score)
        db_tool.update({"name": user_info['name'], "phone": user_info['phone']}, user_info)
        return "success"
    return "Fail"


def get_user_info():
    phone = json.loads(request.data).get('phone')
    name = json.loads(request.data).get('name')
    result = db_tool.search(phone=phone, name=name)
    return result


def convert_to_list(result):
    list = []
    for item in result:
        list.append(item)
    return list


if __name__ == '__main__':
    app.run(host='192.168.31.207', port=5000, debug=True)
