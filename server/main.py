import json

from bson import json_util
from flask import Flask
from flask import request, render_template, json

import db_tool

db_tool.connect_db()
app = Flask(__name__)

app.config['JSON_AS_ASCII'] = False


@app.route('/')
def hello():
    return render_template('index.html')


@app.route('/users/save', methods=['POST'])
def save():
    data = request.form.to_dict()
    data['previous'] = json_util.loads(data.get('previous'))
    if (isExistedUser(data['phone'])):
        return json_util.dumps({'success': False, 'msg': 'user existed'})
    if (data['previous'].get('name') and not data['previous'].get('phone')):
        duplicated, result = getDuplicatedNameUser(data['previous']['name'])
        if (duplicated):
            return json_util.dumps({'success': False, 'msg': 'duplicate previous', 'data': result})
        else:
            result = convert_to_list(result)[0]
            data['previous'] = {'name': result['name'], 'phone': result['phone']}
    db_tool.create(data)
    name = data.get('name')
    phone = data.get('phone')
    next_user_list = {'name': name, 'phone': phone}
    previous_info = data.get('previous')
    previous_phone = previous_info.get('phone')
    previous_name = previous_info.get('name')
    if (previous_phone and previous_name):
        previous_user = db_tool.search(name=previous_name, phone=previous_phone)
        user_info = convert_to_list(previous_user)[0]
        if (not user_info.get('next')):
            user_info['next'] = []
        user_info.get('next').append(next_user_list)
        previous_user_score = int(user_info.get('score') or 0)
        previous_user_score += int(data.get('score') or 0)
        user_info['score'] = previous_user_score
        db_tool.update({"name": previous_name, "phone": previous_phone}, user_info)
    return json_util.dumps({'success': True})


@app.route('/users', methods=['POST'])
def search():
    data = request.form.to_dict()
    name = data.get('name')
    phone = data.get('phone')
    results = db_tool.search(name, phone)
    convert_results = []
    for result in results:
        if not is_empty(result.get('previous')):
            previous_result = db_tool.search(result.get('previous').get('name'), result.get('previous').get('phone'))
            previous_result = convert_to_list(previous_result)[0]
            result['previous']['score'] = previous_result.get('score')
        convert_results.append(result)
    return json_util.dumps(convert_results)


def is_empty(o):
    for item in o:
        if(o[item]):
            return False
    return True

@app.route('/score/increase', methods=['PUT'])
def increase():
    result = get_user_info()
    user_info = convert_to_list(result)
    if (user_info):
        user_info = user_info[0]
        score = request.form.get('score')
        user_info['score'] = int(user_info['score'] or 0) + int(score)
        db_tool.update({"name": user_info['name'], "phone": user_info['phone']}, user_info)
        previous_user = user_info.get("previous")
        if (previous_user):
            previous_phone = previous_user.get('phone')
            previous_name = previous_user.get('name')
            previous_user = db_tool.search(name=previous_name, phone=previous_phone)
            previous_user_info = convert_to_list(previous_user)[0]
            previous_user_score = int(previous_user_info.get('score') or 0)
            previous_user_score += int(score)
            previous_user_info['score'] = previous_user_score
            db_tool.update({"name": previous_name, "phone": previous_phone}, previous_user_info)
        return "Success"
    return "Fail"


@app.route('/score/decrease', methods=['PUT'])
def decrease():
    result = get_user_info()
    user_info = convert_to_list(result)
    if (user_info):
        user_info = user_info[0]
        score = int(request.form.get('score'))
        if int(user_info['score'] or 0) >= score:
            user_info['score'] = int(user_info['score']) - score
            db_tool.update({"name": user_info['name'], "phone": user_info['phone']}, user_info)
            return "success"
    return "Fail"


def isExistedUser(phone):
    result = db_tool.search(phone=phone)
    return result.count() > 0


def getDuplicatedNameUser(name):
    result = db_tool.search(name=name)
    return result.count() > 1, result


def get_user_info():
    phone = request.form.get('phone')
    name = request.form.get('name')
    result = db_tool.search(phone=phone, name=name)
    return result


def convert_to_list(result):
    list = []
    for item in result:
        list.append(item)
    return list


if __name__ == '__main__':
    app.run(host='192.168.31.207', port=5000, debug=True)
