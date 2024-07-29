from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt, jwt_required
from flask import Blueprint, request, jsonify
from models import db, Admin, User, Feedback
from flask_bcrypt import Bcrypt


admin_endpoint = Blueprint('admin_endpoint', __name__)
bcrypt = Bcrypt()


def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        claims = get_jwt()
        if claims['role'] != 'admin':
            return jsonify({'message': 'Admins only!'}), 403
        return fn(*args, **kwargs)
    return wrapper


@admin_endpoint.route('/admin-data', methods=['GET'])
@admin_required
def admin_data():

    return jsonify({'data': 'Secret admin data'})


@admin_endpoint.route('/register-admin', methods=['POST'])
def register_admin():

    email = request.json.get('email')
    username = request.json.get('username')
    password = request.json.get('password')

    if Admin.query.filter_by(email=email).first():
        return jsonify({'message': 'Admin with this email already exists'}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_admin = Admin(
        username=username,
        password=hashed_password,
        email=email,
        role='admin'
    )

    db.session.add(new_admin)
    db.session.commit()

    return jsonify({'message': 'Admin registered successfully', 'admin_id': new_admin.customer_id}), 201


@admin_endpoint.route('/customers', methods=['GET'])
def get_all_customers():

    users = User.query.all()

    user_list = []
    for user in users:
        user_data = {
            'customer_id': user.customer_id,
            'username': user.username,
            'email': user.email,
            'email_confirmed': user.email_confirmed
        }
        user_list.append(user_data)

    return jsonify({'users': user_list}), 200


@admin_endpoint.route('/delete-customer', methods=['DELETE'])
def delete_customer():
    customer_id = request.json.get('customer_id')

    if not customer_id:
        return jsonify({'message': 'Customer ID is required'}), 400

    user = User.query.filter_by(customer_id=customer_id).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully.'}), 200


@admin_endpoint.route('/login-admin', methods=['POST'])
def login_admin():
    customer_id = request.json.get('customer_id')
    password = request.json.get('password')

    admin = Admin.query.filter_by(customer_id=customer_id).first()

    if admin:
        if bcrypt.check_password_hash(admin.password, password):
            response = {
                'message': 'Admin logged in successfully', 
                'admin_id': admin.customer_id, 
                'role': admin.get_role()
            }
            return jsonify(response), 200
        else:
            return jsonify({'error': 'Invalid password'}), 401
    else:
        return jsonify({'error': 'Admin with this email does not exist'}), 404



# Feedback endpoint

@admin_endpoint.route('/feedback', methods=['POST'])
def add_feedback():
    data = request.get_json()

    name = data.get('name')
    phone = data.get('phone')
    email = data.get('email')
    message = data.get('message')

    feedback = Feedback(name=name, phone=phone, email=email, message=message)
    db.session.add(feedback)
    db.session.commit()

    return jsonify({'message': 'Feedback added successfully'}), 201


@admin_endpoint.route('/get-feedback', methods=["GET"])
def get_feedback(): 

    feedback_list = Feedback.query.all()
    feedbacks = []
    for feedback in feedback_list:
        feedback_data = {
            'id': feedback.id,
            'name': feedback.name,
            'phone': feedback.phone,
            'email': feedback.email,
            'message': feedback.message
        }
        feedbacks.append(feedback_data)

    return jsonify({'feedbacks': feedbacks}), 200
    
    