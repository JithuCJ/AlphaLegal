from flask import Blueprint, request, jsonify
from models import db, User, Question


auth = Blueprint('questions_api', __name__)