"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Project
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/add-project', methods=['POST'])
def add_project():
    body = request.json()
    project = Project()

    title = body.get('title', None)
    description = body.get('description', None)
    project.in_progress = False
    assigned_user = body.get('assigned_user', None)

    if title is None or description is None:
        return jsonify('Title and description are required')

    if len(title) > 200 :
        return jsonify("Title's max of characters is 200")

    db.session.add()
    try:
        db.session.commit()
        return jsonify('Created succesfully'), 201
    except Exception as error:
        return jsonify('An error has ocurred'), 500
