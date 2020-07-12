from __init__ import app
from flask import Flask, render_template
from flask_pymongo import PyMongo
import datetime as dt
from config import user, psw
# from tables import Customer_site_dump, db

app.config["MONGO_URI"] = f"mongodb+srv://{user}:{psw}@valutask.wqycs.azure.mongodb.net/Site"
mongo = PyMongo(app)


@app.route('/')
def index():

    return render_template('index.html')

@app.route('/organizations', methods=('POST', 'GET'))
def organizations():
    user_data = mongo.db.User.find_one({'user': 'test_user'})
    org_data = user_data['org_data']

    return render_template('organization.html', data=org_data)

@app.route('/values', methods=('POST', 'GET'))
def values():
    user_data = mongo.db.User.find_one({'user': 'test_user'})
    values_data = user_data['values_data']

    return render_template('values.html', data=values_data)

@app.route('/tasks', methods=('POST', 'GET'))
def tasks():
    user_data = mongo.db.User.find_one({'user': 'test_user'})
    task_data = user_data['task_data']

    return render_template('tasks.html', data=task_data)


if __name__ == '__main__':
    app.run(debug=True)