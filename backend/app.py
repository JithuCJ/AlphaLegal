from flask import Flask, request, jsonify
from dotenv import load_dotenv
from config import ApplicationConfig
from models import db, User, Question, Answer
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
from itsdangerous import URLSafeTimedSerializer
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
import os


from controllers.questions_api import questions_api


load_dotenv()


app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])


app.secret_key = 'super-secret-key'

app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
db.init_app(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)

serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])

with app.app_context():

    db.create_all()


def send_email(recipient_email, token, customer_id):

    sender_email = "shubhamkharche01@gmail.com"
    sender_password = "lzkt yfio ftds aklq"
    smtp_port = 587
    smtp_server = 'smtp.gmail.com'  # Default SMTP server for Gmail

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg['Subject'] = "Email Confirmation Token"

    # Email body
    body = f"Your confirmation token is: {token}. Your customer ID is: {customer_id} "
    msg.attach(MIMEText(body, 'plain'))

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


# Routes

app.register_blueprint(questions_api, url_prefix='/questions')


@app.route('/', methods=['GET'])
def me():
    return jsonify({'message': 'Hello, World!'})


#  Auth Routes

@app.route('/register', methods=['POST'])
def register():
    email = request.json.get('email')
    username = request.json.get('username')
    password = request.json.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User already exists'}), 400

    token = serializer.dumps(email, salt='email-confirm')

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(email=email, username=username,
                    password=hashed_password, email_confirmed=False)
    db.session.add(new_user)
    db.session.commit()

    user_id = new_user.customer_id
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

#
    if not user.answers:
        questions = Question.query.all()
        questions_data = [{'id': q.id, 'question': q.question,
                           'options': q.options.split('\n')} for q in questions]
        return jsonify({'message': 'Login successful', 'access_token': access_token, 'questions': questions_data}), 200

    user_answers = Answer.query.filter_by(user_id=user.customer_id).all()
    answers_data = [{'question_id': ans.question_id,
                     'answer': ans.answer} for ans in user_answers]
    return jsonify({'message': 'Login successful', 'access_token': access_token,}), 200


@app.route('/save-answers', methods=['POST'])
def save_answers():
    customer_id = request.json.get('customer_id')
    answers = request.json.get('answers')

    user = User.query.filter_by(customer_id=customer_id).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404

    for ans in answers:
        question_id = ans['question_id']
        answer_text = ans['answer']
        answer = Answer(user_id=user.customer_id,
                        question_id=question_id, answer=answer_text)
        db.session.add(answer)

    db.session.commit()
    return jsonify({'message': 'Answers saved successfully'}), 201


@app.route('/customer_id', methods=['GET'])
def user():
    customer_id = request.json.get('customer_id')
    user = User.query.filter_by(customer_id=customer_id).first()

    if user is None:
        return jsonify({'message': 'User not found'}), 404

    return jsonify({'customer_id': user.customer_id, 'username': user.username, 'email': user.email, 'email_confirmed': user.email_confirmed}), 200


if __name__ == '__main__':

    app.run(debug=True, host='0.0.0.0', port=5000)
