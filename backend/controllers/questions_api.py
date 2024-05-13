from flask import Blueprint, request, jsonify
from models import db, User, Question


questions_api = Blueprint('questions_api', __name__)


@questions_api.route('/questions-post', methods=['POST'])
def post_question():
    data = request.get_json()
    if 'question_text' not in data or 'customer_id' not in data:
        return jsonify({'error': 'Missing parameters'}), 400

    question_text = data.get('question_text')
    customer_id = data.get('customer_id')

    if not question_text or not customer_id:
        return jsonify({'error': 'Empty question text or customer ID'}), 400

    user = User.query.filter_by(customer_id=customer_id).first()
    if not user:
        return jsonify({'error': 'Invalid customer_id'}), 404

    question = Question(customer_id=customer_id, question_text=question_text)
    db.session.add(question)
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Database error', 'message': str(e)}), 500

    return jsonify({'message': 'Question added successfully', 'question_id': question.question_id}), 201


@questions_api.route('/questions-get', methods=['GET'])
def get_questions():
    questions = Question.query.all()
    questions_data = [{'question_id': q.question_id, 'customer_id': q.customer_id,
                       'question_text': q.question_text} for q in questions]
    return jsonify({'questions': questions_data}), 200
