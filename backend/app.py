from flask import Flask, request, jsonify, abort
from dotenv import load_dotenv
from config import ApplicationConfig
from models import db, User
from flask_bcrypt import Bcrypt
from flask_cors import CORS
load_dotenv()


app = Flask(__name__)
CORS(app, supports_credentials=True)


app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
db.init_app(app)


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

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201


@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({'message': 'User not found'}), 404

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid credentials'}), 401

    return jsonify({'message': 'Login successful'}), 200


if __name__ == '__main__':
    app.run(debug=True)
