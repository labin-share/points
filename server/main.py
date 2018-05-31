from flask import Flask
from flask import request, jsonify, Response
import json
app = Flask(__name__)


users = []

def create_user(name, phone,score):
	return {"name":name, "phone":phone, "score":score}


@app.route('/save')
def save():
	name = request.args.get('name')
	phone = request.args.get('phone')
	score = request.args.get('score',0)
	print(score)
	global users
	users.append(create_user(name,phone,score))
	return jsonify(users)
	
@app.route('/users')
def search():
	global users
	name = request.args.get('name')
	if(name is None):
		return jsonify(users)
	result = findUser(name)	
	return jsonify(result)
	
	
@app.route('/increase')
def increase():
	name = request.args.get('name')
	increaseValue=request.args.get('score')
	result = findUser(name)	
	defaultScore=int(result['score'])
	defaultScore+= int(increaseValue)
	result['score']=defaultScore
	return str(result)

@app.route('/decrease')
def decrease():
	name = request.args.get('name')
	increaseValue=request.args.get('score')
	result = findUser(name)	
	defaultScore=int(result['score'])
	defaultScore-= int(increaseValue)
	result['score']=defaultScore
	return str(result)

	
def findUser(name):
	result = []
	for user in users:
		if user['name'] == name:
			result = user 
			break
	return result
	
if __name__ == '__main__':
	app.run()
	
	