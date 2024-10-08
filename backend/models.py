from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import random
import string
import json

db = SQLAlchemy()


def generate_customer_id():
    length = random.randint(6, 10)
    alphanumeric = ''.join(random.choices(
        string.ascii_letters + string.digits, k=length))
    print(f"Generated customer_id: {alphanumeric}")  # Debug statement
    return alphanumeric


class User(db.Model):
    __tablename__ = 'users'
    customer_id = db.Column(db.String, primary_key=True,
                            unique=True, nullable=False, default=generate_customer_id)
    username = db.Column(db.String, unique=False, nullable=False)
    password = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    email_confirmed = db.Column(db.Boolean, default=False)
    # role = db.Column(db.String, default='user')
    score = db.Column(db.Integer, default=0)
    answers = db.relationship(
        'Answer', back_populates='user', cascade="all, delete-orphan")
    company_info = db.relationship(
        'CompanyInfo', back_populates='user', cascade="all, delete-orphan", uselist=False)


class Admin(db.Model):
    __tablename__ = 'admin'
    customer_id = db.Column(db.String, primary_key=True,
                            unique=True, nullable=False, default=generate_customer_id)
    username = db.Column(db.String, unique=False, nullable=False)
    password = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    role = db.Column(db.String, default='admin')

    def get_role(self):
        return self.role


class Question(db.Model):
    __tablename__ = 'questions'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    question = db.Column(db.Text, nullable=False)
    options = db.Column(db.Text, nullable=False)
    weights = db.Column(db.JSON, nullable=True)
    answers = db.relationship(
        'Answer', back_populates='question', cascade="all, delete-orphan")


class Answer(db.Model):
    __tablename__ = 'answers'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String, db.ForeignKey(
        'users.customer_id'), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey(
        'questions.id'), nullable=False)
    answer = db.Column(db.String(500), nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='answers')
    question = db.relationship('Question', back_populates='answers')


class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    date_posted = db.Column(db.DateTime, default=datetime.utcnow)
    author = db.Column(db.String(50), nullable=False)
    image_file = db.Column(db.String(20), nullable=True)


class CompanyInfo(db.Model):
    __tablename__ = 'company_info'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String, db.ForeignKey(
        'users.customer_id'), nullable=False)
    company_name = db.Column(db.String(255), nullable=False)
    industry = db.Column(db.String(255), nullable=False)
    company_size = db.Column(db.String(50), nullable=False)
    annual_revenue = db.Column(db.String(50), nullable=False)
    locations = db.Column(db.String(255), nullable=False)
    contact_name = db.Column(db.String(255), nullable=False)
    contact_position = db.Column(db.String(255), nullable=False)
    contact_email = db.Column(db.String(255), nullable=False)
    contact_phone = db.Column(db.String(50), nullable=False)
    ai_applications = db.Column(db.JSON, nullable=True)
    compliance_requirements = db.Column(db.JSON, nullable=True)
    ai_governance = db.Column(db.Boolean, default=False)
    ai_vendors = db.Column(db.String(255), nullable=True)

    user = db.relationship('User', back_populates='company_info')


# Adding relationship in the User model
User.company_info = db.relationship(
    'CompanyInfo', back_populates='user', cascade="all, delete-orphan", uselist=False)

class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    position = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    responsibility = db.Column(db.Text, nullable=False)
    qualification = db.Column(db.Text, nullable=False)
    benefits = db.Column(db.Text, nullable=False)
    job_type = db.Column(db.String(50), nullable=False)
    job_category = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    
    

class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)
