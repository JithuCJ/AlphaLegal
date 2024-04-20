from flask import Flask, request, jsonify
from dotenv import load_dotenv
from config import ApplicationConfig
from models import db, User
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
from itsdangerous import URLSafeTimedSerializer
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from flask_migrate import Migrate

import os


load_dotenv()


app = Flask(__name__)
CORS(app, supports_credentials=True)


app.secret_key = 'super-secret-key'

app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
db.init_app(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)

serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])

with app.app_context():

    db.create_all()

# Add this function to your Flask application


def send_email(recipient_email, token):
    #  Sender Email address
    sender_email = "shubhamkharche01@gmail.com"  # Change this to your email address
    sender_password = "lzkt yfio ftds aklq"   # Change this to your email password

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg['Subject'] = "Email Confirmation Token"

    # Email body
    body = f"Your confirmation token is: {token}"
    msg.attach(MIMEText(body, 'plain'))

    # Determine SMTP settings based on the recipient's email domain
    domain = recipient_email.split('@')[-1]
    if domain.lower() == 'gmail.com':
        smtp_server = 'smtp.gmail.com'
        smtp_port = 587

    elif domain.lower() == 'yahoo.com':
        smtp_server = 'smtp.mail.yahoo.com'
        smtp_port = 587

    elif domain.lower().endswith('outlook.com') or domain.lower().endswith('hotmail.com'):
        smtp_server = 'smtp.office365.com'
        smtp_port = 587

    # Sent all email domain
    elif domain.lower().endswith(''):
        smtp_server = 'smtp.'
        smtp_port = 587

    else:
        print("Unsupported email domain")
        return

    #

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
    return jsonify({'message': 'Hello, World!'})


@app.route('/register', methods=['POST'])
def register():

    email = request.json.get('email')
    username = request.json.get('username')
    password = request.json.get('password')
    email_confirmed = request.json.get('email_confirmed')

    user_exists = User.query.filter_by(email=email).first() is not None
    if user_exists:
        return jsonify({'message': 'User already exists'}), 400

    token = serializer.dumps(email, salt='email-confirm')

    # Send email with token
    send_email(email, token)

    # Hash password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(email=email, username=username,
                    password=hashed_password, email_confirmed=email_confirmed)
    db.session.add(new_user)
    db.session.commit()

    # Generate JWT token upon successful registration
    # access_token = create_access_token(identity=new_user.id)
    return jsonify({'message': 'User created successfully'}), 201


@app.route('/confirm-token', methods=['POST'])
def confirm_email(token):
    try:
        # 1 hour to confirm the email
        email = serializer.loads(
            token, salt='email-confirm', max_age=3600)
    except:
        return jsonify({'message': 'The confirmation link is invalid or has expired.'}), 400

    user = User.query.filter_by(email=email).first()
    if user.email_confirmed:
        return jsonify({'message': 'Account already confirmed.'}), 200
    else:
        user.email_confirmed = True
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'You have confirmed your account. Thanks!'}), 200


@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({'message': 'User not found'}), 404

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid credentials'}), 401

  # Generate JWT token upon successful login
    access_token = create_access_token(identity=user.id)
    return jsonify({'message': 'Login successful', 'access_token': access_token}), 200


if __name__ == '__main__':
    app.run(debug=True)
