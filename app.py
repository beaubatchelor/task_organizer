from __init__ import app
from flask import Flask, render_template
from datatime import datetime as dt
# from tables import Customer_site_dump, db

values_data = [
    {'catagory' : 'Maslow', 'values' : ['Physiological Needs', 'Safety', 'Belongingness and Love', 'Esteem', 'Self Actualization']},
    {'catagory' : 'Urgency', 'values' : ['Urgent', 'Neutral', 'Not Urgent']},
    {'catagory' : 'Interest', 'values': ['Technology', 'Wealth', 'Friendship', 'Health']}
]
org_data = ['Life', 'Work', 'Project']

task_data = {
    'columns' : ['Maslow', 'Urgency', 'Interest', 'Due Date', 'Task', 'Status (Optional)', 'Assigned To (Optional)'],
    'values' : [['Esteem', 'Netral', 'Health', dt.date(2099, 7, 8), 'Creat a workout schedule', 'not started', 'Beau'],
                ['Physiological Needs', 'Urgent', 'Health', dt.date(2020, 8, 1), 'Groceries', 'not started', 'Beau'],
                ['Belongingness and Love', 'Neutral', 'Friendship', dt.date(2020, 12, 4), '420Bot', 'not started', 'Beau'],
                ['Saftey', 'Neutral', 'Health', dt.date(2020, 8, 1), 'Pay Rent', 'not started', 'Beau']]
            }

@app.route('/')
def index():
    
    return render_template('index.html')

@app.route('/organizations', methods=('POST', 'GET'))
def organizations():

    return render_template('organization.html', data=org_data)

@app.route('/values', methods=('POST', 'GET'))
def values():

    return render_template('values.html', data=values_data)

@app.route('/tasks', methods=('POST', 'GET'))
def tasks():

    return render_template('tasks.html', data=task_data)


if __name__ == '__main__':
    app.run(debug=True)