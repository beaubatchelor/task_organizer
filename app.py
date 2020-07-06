from __init__ import app
from flask import Flask, render_template, jsonify, request
# from tables import Customer_site_dump, db

values_data = [
    {'catagory' : 'Maslow', 'values' : ['Physiological Needs', 'Safety', 'Belongingness and Love', 'Esteem', 'Self Actualization']},
    {'catagory' : 'Urgency', 'values' : ['Today', 'This Week', 'This Month']},
    {'catagory' : 'Interest', 'values': ['Technology', 'Wealth', 'Health']}
]
org_data = ['Life', 'Work', 'Project']
task_data = [
    {'catagories' : {'Maslow' : 'Physiological Needs', 'Urgency' : 'Urgent', 'Interest' : 'Health'}}
]

@app.route('/')
def index():
    
    return render_template('index.html')

@app.route('/organizations', methods=('POST', 'GET'))
def organizations():

    return render_template('organization.html', org_data=org_data)

@app.route('/values', methods=('POST', 'GET'))
def values():

    return render_template('values.html', data=values_data)

@app.route('/tasks', methods=('POST', 'GET'))
def tasks():

    return render_template('tasks.html', data=values_data)


if __name__ == '__main__':
    app.run(debug=True)