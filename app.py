from __init__ import app
from flask import Flask, render_template, request, jsonify, redirect
from flask_pymongo import PyMongo
import datetime as dt
from config import user, psw
from pprint import pprint as pp

# app.config["MONGO_URI"] = f"mongodb+srv://{user}:{psw}@valutask.wqycs.azure.mongodb.net/Site" ## production connection
# mongo = PyMongo(app)

test_data = {"_id":{"$oid":"5f0a6b880c689113c019b670"},
"user":"test_user",
"values_data":[{"category":"Maslow","values":["Physiological Needs","Safety","Belongingness and Love","Esteem","Self Actualization"]},{"category":"Urgency","values":["Urgent","Neutral","Not Urgent"]},{"category":"Interest","values":["Technology","Wealth","Friendship","Health"]}],"org_data":["Life","Work","Project"],"task_data":{"columns":["Maslow","Urgency","Interest","Due Date","Task","Status (Optional)","Assigned To (Optional)"],"values":[["Esteem","Netral","Health","2099-7-8","Creat a workout schedule","not started","Beau"],["Physiological Needs","Urgent","Health","2020-8-1","Groceries","not started","Beau"],["Belongingness and Love","Neutral","Friendship","2020-12-4","420Bot","not started","Beau"],["Saftey","Neutral","Health","2020-8-1","Pay Rent","not started","Beau"]]}}

@app.route('/')
def index():

    return render_template('index.html')

@app.route('/organizations')
def organizations():
    # user_data = mongo.db.User.find_one({'user': 'test_user'}) ##production data
    user_data = test_data ##for test data
    org_data = user_data['org_data']
    

    return render_template('organization.html', data=org_data)

@app.route('/values')
def values():
    # user_data = mongo.db.User.find_one({'user': 'test_user'}) ##production data
    user_data = test_data ##for test data  
    values_data = user_data['values_data']

    return render_template('values.html', data=values_data)

@app.route('/tasks')
def tasks():
    # user_data = mongo.db.User.find_one({'user': 'test_user'}) ##production data
    user_data = test_data ##for test data
    task_data = user_data['task_data']

    return render_template('tasks.html', data=task_data)

@app.route('/update-values', methods=['POST'])
def update():
    result = request.get_json() ##JS request of table information 
    user_data = mongo.db.User.find_one({'user': 'test_user'}) ##production data
    user_data['values_data'] = result

    mongo.db.User.replace_one({'user': 'test_user'}, user_data)

    return redirect('/values')



if __name__ == '__main__':
    app.run(debug=True)