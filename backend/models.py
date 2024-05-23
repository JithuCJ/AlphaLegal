from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import random
import string

db = SQLAlchemy()

def generate_customer_id():
    length = random.randint(6, 10)
    alphanumeric = ''.join(random.choices(string.ascii_letters + string.digits, k=length))
    return alphanumeric

class User(db.Model):
    __tablename__ = 'users'
    customer_id = db.Column(db.String, primary_key=True, unique=True, nullable=False, default=generate_customer_id)
    username = db.Column(db.String, unique=False, nullable=False)
    password = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    email_confirmed = db.Column(db.Boolean, default=False)
    answers = db.relationship('Answer', back_populates='user', cascade="all, delete-orphan")

class Question(db.Model):
    __tablename__ = 'questions'
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, nullable=False)
    options = db.Column(db.Text, nullable=False) 
    answers = db.relationship('Answer', back_populates='question', cascade="all, delete-orphan")

class Answer(db.Model):
    __tablename__ = 'answers'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String, db.ForeignKey('users.customer_id'), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    answer = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='answers')
    question = db.relationship('Question', back_populates='answers')
