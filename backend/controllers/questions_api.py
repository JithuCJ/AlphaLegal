from flask import Blueprint, request, jsonify
from models import db, Question, Answer, User
import fitz
import logging
from flask_jwt_extended import jwt_required, get_jwt_identity

# Set up logging
logging.basicConfig(level=logging.DEBUG)

questions_api = Blueprint('questions_api', __name__)


@questions_api.route('/upload', methods=['POST'])
def upload_pdf():
    if 'pdf' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['pdf']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and file.filename.endswith('.pdf'):
        pdf_text = extract_text_from_pdf(file)
        questions_data = parse_questions(pdf_text)
        save_questions_to_db(questions_data)
        return jsonify({'message': 'PDF processed successfully'}), 200
    else:
        return jsonify({'error': 'Invalid file format. Only PDFs are allowed.'}), 400


def extract_text_from_pdf(file):
    pdf_document = fitz.open(stream=file.read(), filetype="pdf")
    text = ""
    for page_num in range(pdf_document.page_count):
        page = pdf_document.load_page(page_num)
        text += page.get_text()
    return text


def parse_questions(text):
    lines = text.splitlines()
    questions_data = []
    question, options, weights = "", [], {}
    option_prefixes = ('a)', 'b)', 'c)', 'd)')

    def add_question():
        if question:
            questions_data.append({
                'question': question.strip(),
                'options': [f"{prefix} {opt}" for prefix, opt in zip(option_prefixes, options)],
                'weights': weights if weights else {}
            })

    for line in lines:
        stripped_line = line.strip()
        if stripped_line.startswith(tuple(f"{i}." for i in range(1, 101))):
            add_question()
            question, options, weights = stripped_line, [], {}
        elif any(stripped_line.startswith(prefix) for prefix in option_prefixes):
            option_text = stripped_line.split(") ", 1)[1]
            options.append(option_text)
        elif stripped_line.startswith("Ans:"):
            weights_text = stripped_line.split(
                "[", 1)[1].strip("]").split(", ")
            weights = {weight.split("=")[0].strip(): int(
                weight.split("=")[1].strip()) for weight in weights_text}
        else:
            if options:
                options[-1] += ' ' + stripped_line
            else:
                question += ' ' + stripped_line

    add_question()
    return questions_data


def save_questions_to_db(questions_data):
    questions = []
    for item in questions_data:
        question_text = item['question']
        options_text = "\n".join(item['options']) if item['options'] else ""
        weights_data = item['weights']
        question = Question(question=question_text,
                            options=options_text, weights=weights_data)
        questions.append(question)
    db.session.bulk_save_objects(questions)
    db.session.commit()


@questions_api.route('/save', methods=['POST'])
@jwt_required()
def save_answers():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    logging.debug(f"Received data: {data}")

    answers = data.get('answers', [])
    total_score = 0
    total_possible_score = 0
    new_answers = []
    updated_answers = []

    for answer in answers:
        question_id = answer.get('question_id')
        answer_text = answer.get('answer')

        if not question_id or not answer_text:
            logging.error(f"Invalid answer format: {answer}")
            return jsonify({'error': 'Invalid answer format'}), 400

        normalized_answer = answer_text.split(') ')[0].strip()

        existing_answer = Answer.query.filter_by(
            user_id=current_user_id, question_id=question_id).first()

        question = Question.query.get(question_id)
        if question:
            weight = question.weights.get(normalized_answer, 0)
            total_score += weight
            max_weight = max(question.weights.values(), default=0)
            total_possible_score += max_weight

            if existing_answer:
                logging.debug(
                    f"Answer already exists for user {current_user_id} and question {question_id}, updating answer")
                existing_answer.answer = normalized_answer
                updated_answers.append(existing_answer)
            else:
                new_answer = Answer(user_id=current_user_id,
                                    question_id=question_id, answer=normalized_answer)
                new_answers.append(new_answer)

    if new_answers:
        db.session.bulk_save_objects(new_answers)

    if updated_answers:
        db.session.bulk_save_objects(updated_answers)

    user = User.query.get(current_user_id)
    user.score = total_score
    db.session.commit()

    percentage_score = (total_score / total_possible_score) * \
        100 if total_possible_score else 0

    return jsonify({'message': 'Answers submitted successfully!', 'total_score': percentage_score}), 201


@questions_api.route('/submit', methods=['POST'])
@jwt_required()
def submit_answers():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    logging.debug(f"Received data: {data}")

    answers = data.get('answers', [])
    total_score = 0
    total_possible_score = 0
    new_answers = []
    updated_answers = []

    for answer in answers:
        question_id = answer.get('question_id')
        answer_text = answer.get('answer')

        if not question_id or not answer_text:
            logging.error(f"Invalid answer format: {answer}")
            return jsonify({'error': 'Invalid answer format'}), 400

        normalized_answer = answer_text.split(') ')[0].strip()

        existing_answer = Answer.query.filter_by(
            user_id=current_user_id, question_id=question_id).first()

        question = Question.query.get(question_id)
        if question:
            weight = question.weights.get(normalized_answer, 0)
            total_score += weight
            max_weight = max(question.weights.values(), default=0)
            total_possible_score += max_weight

            if existing_answer:
                logging.debug(
                    f"Answer already exists for user {current_user_id} and question {question_id}, updating answer")
                existing_answer.answer = normalized_answer
                updated_answers.append(existing_answer)
            else:
                new_answer = Answer(user_id=current_user_id,
                                    question_id=question_id, answer=normalized_answer)
                new_answers.append(new_answer)

    if new_answers:
        db.session.bulk_save_objects(new_answers)

    if updated_answers:
        db.session.bulk_save_objects(updated_answers)

    user = User.query.get(current_user_id)
    user.score = total_score
    db.session.commit()

    percentage_score = (total_score / total_possible_score) * \
        100 if total_possible_score else 0

    return jsonify({'message': 'Answers submitted successfully!', 'total_score': percentage_score}), 201


# GET Requiest


# GET All Question
@questions_api.route('/data', methods=['GET'])
def get_data():

    questions = Question.query.all()
    output = []

    for question in questions:

        output.append({
            'id': question.id,
            'question': question.question,
            'options': question.options,

        })

    print("Questions data:", output)  # Debug statement

    return jsonify({'questions': output})


@questions_api.route('/questions', methods=['GET'])
@jwt_required()
def get_questions():
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(customer_id=current_user_id).first()

    if not user:
        return jsonify({'error': 'User not found'}), 404

    answers = {answer.question_id: answer for answer in user.answers}
    questions = Question.query.all()
    output = []

    for question in questions:
        attempted = question.id in answers
        output.append({
            'id': question.id,
            'question': question.question,
            'options': question.options,
            'attempted': attempted,
            'answer': answers[question.id].answer if attempted else None
        })
        
    print("Questions data:", output)  # Debug statement

    return jsonify({'questions': output})