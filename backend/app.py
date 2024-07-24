from flask import Flask, request, jsonify
from dotenv import load_dotenv
from config import ApplicationConfig
from models import db, User, Question, Answer, Admin
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, verify_jwt_in_request, get_jwt
from itsdangerous import URLSafeTimedSerializer
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from flask_migrate import Migrate

import os

from controllers.questions_api import questions_api
from controllers.admin_endpoint import admin_endpoint
from controllers.Blog import blog_endpoint


load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.secret_key = os.getenv('SECRET_KEY', 'super-secret-key')
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
db.init_app(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)

serializer = URLSafeTimedSerializer(app.secret_key)

with app.app_context():
    db.create_all()


# Routes

app.register_blueprint(questions_api, url_prefix='/questions')
app.register_blueprint(admin_endpoint, url_prefix='/admin')
app.register_blueprint(blog_endpoint, url_prefix='/blog')


def send_email(recipient_email, token, customer_id):

    sender_email = os.getenv('Email')
    sender_password = os.getenv('Password')
    smtp_port = 587
    smtp_server = 'smtp.gmail.com'  # Default SMTP server for Gmail

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg['Subject'] = "Email Confirmation Token"

    # Email body with URLs
    body = f"""
    <html>
    <body>
        <p>Confirmation token is  :  {token}</a></p>
        <p>User ID is  :  <b>{customer_id}</b></a></p>
    </body>
    </html>
    """
    msg.attach(MIMEText(body, 'html'))

    try:
        # Change to your SMTP server
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, recipient_email, msg.as_string())
        server.quit()
        print("Email sent successfully!")
    except Exception as e:
        print("Error sending email:", str(e))


@app.route('/', methods=['GET'])
def me():
    return jsonify({'message': 'Server is up and running!'})


#  Auth Routes

@app.route('/register', methods=['POST'])
def register():
    email = request.json.get('email')
    username = request.json.get('username')
    password = request.json.get('password')
    role = request.json.get('role', 'user')

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User already exists'}), 400

    token = serializer.dumps(email, salt='email-confirm')
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(email=email, username=username,
                    password=hashed_password, email_confirmed=False)
    db.session.add(new_user)
    db.session.commit()

    user_id = new_user.customer_id
    print(f"Registered user with customer_id: {user_id}")  # Debug statement
    send_email(email, token, user_id)

    return jsonify({'message': 'Registration successful. Please check your email to confirm.', 'user_id': user_id, 'token': token}), 201


@app.route('/confirm-token', methods=['POST'])
def confirm_email():
    token = request.json.get('token')
    try:
        email = serializer.loads(token, salt='email-confirm', max_age=3600)
    except:
        return jsonify({'message': 'The confirmation link is invalid or has expired.'}), 400

    user = User.query.filter_by(email=email).first()
    if user.email_confirmed:
        return jsonify({'message': 'Account already confirmed.'}), 200

    user.email_confirmed = True
    db.session.commit()
    return jsonify({'message': 'You have confirmed your account. Thanks!'}), 200


@app.route('/login', methods=['POST'])
def login():
    customer_id = request.json.get('customer_id')
    password = request.json.get('password')
    user = User.query.filter_by(customer_id=customer_id).first()

    if user is None:
        return jsonify({'message': 'User not found'}), 404

    if not user.email_confirmed:
        return jsonify({'message': 'Please confirm your email first.'}), 403

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid credentials'}), 401

    access_token = create_access_token(identity=user.customer_id)
    return jsonify({'message': 'Login successful', 'access_token': access_token, 'customer_id': user.customer_id}), 200


@app.route('/customer_id', methods=['GET'])
@jwt_required()
def user():
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(customer_id=current_user_id).first()
    if user is None:
        return jsonify({'message': 'User not found'}), 404

    return jsonify({'customer_id': user.customer_id, 'username': user.username, 'email': user.email, 'email_confirmed': user.email_confirmed}), 200

# Add this route to handle password change requests


@app.route('/update-user', methods=['PUT'])
@jwt_required()
def update_user():
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(customer_id=current_user_id).first()

    if user is None:
        return jsonify({'message': 'User not found'}), 404

    # new_customer_id = request.json.get('new_customer_id')
    new_password = request.json.get('new_password')

    # if new_customer_id:
    #     existing_user = User.query.filter_by(
    #         customer_id=new_customer_id).first()
    #     if existing_user:
    #         return jsonify({'message': 'Customer ID already exists'}), 400
    #     user.customer_id = new_customer_id

    if new_password:
        hashed_password = bcrypt.generate_password_hash(
            new_password).decode('utf-8')
        user.password = hashed_password

    db.session.commit()
    return jsonify({'message': 'Change password'}), 200

# The rest of the app remains the same


# Forget & Reset Password endpoint

@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    email = request.json.get('email')
    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({'message': 'User not found'}), 404

    token = serializer.dumps(email, salt='password-reset')
    send_password_reset_email(email, token)

    return jsonify({'message': 'Password reset email sent'}), 200


def send_password_reset_email(recipient_email, token):
    sender_email = os.getenv('Email')
    sender_password = os.getenv('Password')
    smtp_port = 587
    smtp_server = 'smtp.gmail.com'

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg['Subject'] = "Password Reset Token"

    body = f"""
    <html>
    <body>
        <p>Click the link to reset your password: <a href="http://localhost:3000/reset-password/{token}">Reset Password</a></p>
    </body>
    </html>
    """
    msg.attach(MIMEText(body, 'html'))

    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, recipient_email, msg.as_string())
        server.quit()
        print("Password reset email sent successfully!")
    except Exception as e:
        print("Error sending password reset email:", str(e))


@app.route('/reset-password/<token>', methods=['POST'])
def reset_password(token):
    try:
        email = serializer.loads(token, salt='password-reset', max_age=122)
    except Exception as e:
        return jsonify({'message': 'The reset link is invalid or has expired.'}), 400

    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({'message': 'User not found'}), 404

    new_password = request.json.get('new_password')
    hashed_password = bcrypt.generate_password_hash(
        new_password).decode('utf-8')
    user.password = hashed_password
    db.session.commit()

    return jsonify({'message': 'Password reset successful'}), 200


@app.route('/user-details', methods=['GET'])
@jwt_required()
def user_details():
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(customer_id=current_user_id).first()

    if user is None:
        return jsonify({'message': 'User not found'}), 404

    user_details = {
        'customer_id': user.customer_id,
        'username': user.username,
        'email': user.email,
        # Add any other fields you want to include
    }

    return jsonify({'user_details': user_details}), 200


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
