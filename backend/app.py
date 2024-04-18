from flask import Flask, request, jsonify
from dotenv import load_dotenv
from config import ApplicationConfig
from models import db, User
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
from flask_mail import Mail, Message
from itsdangerous import URLSafeTimedSerializer
import os


load_dotenv()


app = Flask(__name__)
CORS(app, supports_credentials=True)


app.secret_key = 'super-secret-key'

app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
db.init_app(app)
jwt = JWTManager(app)


mail = Mail(app)

serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])

with app.app_context():

    db.create_all()


@app.route('/', methods=['GET'])
def me():
    return jsonify({'message': 'Hello, World!'})


@app.route('/register', methods=['POST'])
def register():

    email = request.json.get('email')
    username = request.json.get('username')
    password = request.json.get('password')
    user_exists = User.query.filter_by(email=email).first() is not None
    if user_exists:
        return jsonify({'message': 'User already exists'}), 400

    token = serializer.dumps(email, salt='email-confirm')

    # Send email with token
    msg = Message('Confirm Your Email',
                  sender='noreplay@gmail.com', recipients=[email])
    msg.body = f"Hi {username},\n\nconfirm your email: http://localhost:3000/confirm/{token}"
    mail.send(msg)

    # Hash password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    # Generate JWT token upon successful registration
    access_token = create_access_token(identity=new_user.id)
    return jsonify({'message': 'User created successfully', 'access_token': access_token}), 201


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
