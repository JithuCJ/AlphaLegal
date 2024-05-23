# tests/conftest.py
import pytest
import os
import sys

# Adjust the sys.path to include the project root
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import app as flask_app
from models import db, User, Question
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt(flask_app)

@pytest.fixture(scope='module')
def test_client():
    flask_app.config['TESTING'] = True
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
    testing_client = flask_app.test_client()

    ctx = flask_app.app_context()
    ctx.push()

    yield testing_client

    ctx.pop()

@pytest.fixture(scope='module')
def init_database():
    db.create_all()

    hashed_password = bcrypt.generate_password_hash('password').decode('utf-8')
    user1 = User(customer_id='somecustomerid', email='test1@example.com', username='testuser1', password=hashed_password, email_confirmed=True)
    user2 = User(customer_id='anothercustomerid', email='test2@example.com', username='testuser2', password=hashed_password, email_confirmed=True)
    db.session.add(user1)
    db.session.add(user2)
    
    # Adding some questions to test with
    question1 = Question(question='Is the sky blue?', options='Yes\nNo')
    question2 = Question(question='Is water wet?', options='Yes\nNo')
    db.session.add(question1)
    db.session.add(question2)
    
    db.session.commit()

    yield db

    db.drop_all()
