from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
import random
import string


db = SQLAlchemy()


def customer_id():

    length = random.randint(6, 10)
    alphanumeric = ''.join(random.choices(
        string.ascii_letters + string.digits, k=length))
    return alphanumeric





class User(db.Model):
    __tablename__ = 'users'
    customer_id = db.Column(db.String, primary_key=True,
                            unique=True, default=customer_id)
    username = db.Column(db.String, unique=False, nullable=False)
    password = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    email_confirmed = db.Column(db.Boolean, default=False)



class Question(db.Model):
    __tablename__ = 'questions'
    question_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    customer_id = db.Column(db.String, db.ForeignKey('users.customer_id'), nullable=False)
    question_text = db.Column(db.String, nullable=False)
   


