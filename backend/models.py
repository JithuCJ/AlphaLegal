from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()


def get_uuid():
    return uuid4().hex


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.String, primary_key=True, unique=True, default=get_uuid)
    username = db.Column(db.String, unique=False, nullable=False)
    password = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    email_confirmed = db.Column(db.Boolean, default=False)

