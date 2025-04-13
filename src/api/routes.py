"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Project
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from base64 import b64encode
import os
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
import cloudinary.uploader as uploader
import json

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/sign-up', methods=['POST'])
def add_new_user():
    try:
        body = request.json
        name = body.get("name", None)
        email = body.get("email",  None)
        password = body.get("password", None)

        if name is None or email is None or password is None:
            return jsonify('Name, email and password keys are required'), 400

        if name.strip() == "" or email.strip() == "" or password.strip() == "":
            return jsonify('All credentials are required'), 400
        else:
            user = User()
            user_exist = user.query.filter_by(email = email).one_or_none()

            if user_exist is not None:
                return jsonify('User with that email already exists'), 409
            else:
                salt = b64encode(os.urandom(32)).decode('utf-8')
                hashed_password = generate_password_hash(f'{password}{salt}')

                user.name = name
                user.email = email
                user.password = hashed_password
                user.salt = salt

                db.session.add(user)
                try:
                    db.session.commit()
                    return jsonify('User created'), 201
                except Exception as error:

                    print(error.args)
                    return jsonify('Error'), 500
    except Exception as error:
        print(error.args)
        return jsonify('Error'), 500


@api.route('/log-in', methods=['POST'])
def login():
    body = request.json
    email = body.get('email', None)
    password = body.get('password', None)

    if email is None or password is None:
        return jsonify('Email and password keys are required'), 400
    if email.strip() == "" or password.strip() == "":
        return jsonify('All credentials are required'), 400

    user = User.query.filter_by(email = email).first()
    if user is None:
        return jsonify('User does not exist'), 404
    else:
        try:
            if check_password_hash(user.password, f'{password}{user.salt}'):
                token = create_access_token(identity = str(user.id))
                return jsonify({"token": token, "current_user": user.serialize()}), 200
            else:
                return jsonify("Incorrect credentials"), 404
        except Exception as error:
            print(error.args)
            return jsonify('Error'), 500


@api.route('/add-project', methods=['POST'])
@jwt_required()
def add_project():
    body = request.json
    project = Project()

    title = body.get('title', None)
    description = body.get('description', None)

    project.in_progress = False

    if title is None or description is None:
        return jsonify('Title and description are required')

    if len(title) > 200 :
        return jsonify("Title's max of characters is 200")

    project.title = title
    project.description = description

    project.user_id = int(get_jwt_identity())

    # currentUser.project_id = project.id
    # print(project.id)


    db.session.add(project)
    try:
        db.session.commit() 
        return jsonify('Created succesfully'), 201
    except Exception as error:
        print(error.args)
        return jsonify('An error has ocurred'), 500

@api.route('/get-user', methods=['GET'])
def get_user():
    user = User.query.filter_by(email = "email2@gmail.com").one_or_none()
    print(user.serialize())
    return jsonify("done"), 200

@api.route('/get-projects', methods=['GET'])
@jwt_required()
def get_project():
    projects = Project.query.filter_by(user_id = int(get_jwt_identity()))
    return jsonify(list(map(lambda project: project.serialize(), projects))), 200