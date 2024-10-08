from flask import Blueprint, request, jsonify
from models import db, Question, Answer, User, CompanyInfo
import fitz
import logging
from sqlalchemy import func
from flask_jwt_extended import jwt_required, get_jwt_identity
import json

# Set up logging
logging.basicConfig(level=logging.DEBUG)

questions_api = Blueprint('questions_api', __name__)


@questions_api.route('/upload', methods=['POST'])
def upload_pdf():
    if 'pdf' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    if 'title' not in request.form:
        return jsonify({'error': 'No title provided'}), 400

    title = request.form['title']
    file = request.files['pdf']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and file.filename.endswith('.pdf'):
        pdf_text = extract_text_from_pdf(file)
        questions_data = parse_questions(pdf_text, title)
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


# def parse_questions(text, title):
#     lines = text.splitlines()
#     questions_data = []
#     question, options, weights = "", [], {}
#     option_prefixes = ('a)', 'b)', 'c)', 'd)')
#     yes_no_options = ("Yes", "No")

#     def add_question():
#         if question:
#             if options:
#                 formatted_options = [
#                     f"{prefix} {opt}" for prefix, opt in zip(option_prefixes, options)]
#             else:
#                 formatted_options = [f"{opt}" for opt in yes_no_options]
#             questions_data.append({
#                 'title': title,
#                 'question': question.strip(),
#                 'options': formatted_options,
#                 'weights': weights if weights else {}
#             })

#     for line in lines:
#         stripped_line = line.strip()
#         if stripped_line.startswith(tuple(f"{i}." for i in range(1, 200001))):
#             add_question()
#             question, options, weights = stripped_line, [], {}
#         elif any(stripped_line.startswith(prefix) for prefix in option_prefixes):
#             option_text = stripped_line.split(") ", 1)[1]
#             options.append(option_text)
#         elif stripped_line.startswith("Ans:"):
#             if "[" in stripped_line and "]" in stripped_line:
#                 weights_text = stripped_line.split(
#                     "[", 1)[1].strip("]").split(", ")
#                 weights = {
#                     weight.split("=")[0].strip(): int(weight.split("=")[1].strip())
#                     for weight in weights_text
#                 }
#             else:
#                 yes_no_weights = stripped_line.split(
#                     "Ans:")[1].strip().split(", ")
#                 weights = {
#                     item.split("=")[0].strip(): int(item.split("=")[1].strip())
#                     for item in yes_no_weights
#                 }
#         else:
#             if options:
#                 options[-1] += ' ' + stripped_line
#             else:
#                 question += ' ' + stripped_line

#     add_question()
#     return questions_data


def parse_questions(text, title):
    lines = text.splitlines()
    questions_data = []
    question, options, weights = "", [], {}
    option_prefixes = ('a)', 'b)', 'c)', 'd)')
    yes_no_options = ("Yes", "No")

    def add_question():
        if question:
            if options:
                formatted_options = [
                    f"{prefix} {opt}" for prefix, opt in zip(option_prefixes, options)]
            else:
                formatted_options = [f"{opt}" for opt in yes_no_options]
            questions_data.append({
                'title': title,
                'question': question.strip(),
                'options': formatted_options,
                'weights': weights if weights else {}
            })

    for line in lines:
        stripped_line = line.strip()
        if stripped_line.startswith(tuple(f"{i}." for i in range(1, 200001))):
            add_question()
            question, options, weights = stripped_line, [], {}
        elif any(stripped_line.startswith(prefix) for prefix in option_prefixes):
            if ") " in stripped_line:
                option_text = stripped_line.split(") ", 1)[1]
                options.append(option_text)
        elif stripped_line.startswith("Ans:"):
            if "[" in stripped_line and "]" in stripped_line:
                weights_text = stripped_line.split(
                    "[", 1)[1].strip("]").split(", ")
                weights = {
                    weight.split("=")[0].strip(): int(weight.split("=")[1].strip())
                    for weight in weights_text if "=" in weight
                }
            else:
                yes_no_weights = stripped_line.split("Ans:")[1].strip().split(", ")
                weights = {
                    item.split("=")[0].strip(): int(item.split("=")[1].strip())
                    for item in yes_no_weights if "=" in item
                }
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
        title = item['title']
        question = Question(title=title, question=question_text,
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
            'title': question.title,
            'question': question.question,
            'options': question.options,
            'attempted': attempted,
            'answer': answers[question.id].answer if attempted else None
        })

    print("Questions data:", output)  # Debug statement

    return jsonify({'questions': output})


@questions_api.route('/score', methods=['GET'])
@jwt_required()
def get_score():
    current_user_id = get_jwt_identity()

    user = User.query.get(current_user_id)
    if user is None:
        return jsonify({'error': 'User not found'}), 404

    total_score = user.score

    # Assuming you have a method or value to get the total possible score
    # You need to implement this function
    total_possible_score = get_total_possible_score()

    if total_possible_score == 0:
        percentage_score = 0
    else:
        percentage_score = (total_score / total_possible_score) * 100

    return jsonify({'score': percentage_score}), 200


def get_total_possible_score():
    # Implement logic to calculate or retrieve the total possible score
    # For example, summing up the max weights of all questions
    total_possible_score = 0
    questions = Question.query.all()
    for question in questions:
        max_weight = max(question.weights.values(), default=0)
        total_possible_score += max_weight

    return total_possible_score


# Porgress Bar

@questions_api.route('/progress', methods=['GET'])
@jwt_required()
def get_user_progress():
    try:
        current_user_id = get_jwt_identity()

        # Calculate the total number of questions
        total_questions = db.session.query(func.count(Question.id)).scalar()

        # Calculate the number of questions the user has attempted
        attempted_questions = db.session.query(func.count(
            Answer.id)).filter_by(user_id=current_user_id).scalar()

        # Calculate the progress
        if total_questions == 0:
            progress = 0
        else:
            progress = (attempted_questions / total_questions) * 100

        result = {
            'total_questions': total_questions,
            'attempted_questions': attempted_questions,
            'progress_percentage': progress
        }

        return jsonify(result), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@questions_api.route('/company_info', methods=['POST'])
@jwt_required()
def add_company_info():
    data = request.json
    # Get the current user ID from the JWT token
    current_user_id = get_jwt_identity()

    # Find the user by user_id
    user = User.query.filter_by(customer_id=current_user_id).first()

    if not user:
        return jsonify({"message": "User not found"}), 404

    # Check if company info already exists for the user
    existing_company_info = CompanyInfo.query.filter_by(
        user_id=current_user_id).first()
    if existing_company_info:
        return jsonify({"message": "Company info already exists for this user"}), 400

    company_info = CompanyInfo(
        user_id=current_user_id,
        company_name=data.get('company_name'),
        industry=data.get('industry'),
        company_size=data.get('company_size'),
        annual_revenue=data.get('annual_revenue'),
        locations=data.get('locations'),
        contact_name=data.get('contact_name'),
        contact_position=data.get('contact_position'),
        contact_email=data.get('contact_email'),
        contact_phone=data.get('contact_phone'),
        ai_applications=json.dumps(data.get('ai_applications', [])),
        compliance_requirements=json.dumps(
            data.get('compliance_requirements', [])),
        ai_governance=data.get('ai_governance') == 'Yes',
        ai_vendors=data.get('ai_vendors')
    )

    db.session.add(company_info)
    db.session.commit()

    return jsonify({"message": "Company info added successfully"}), 201


@questions_api.route('/company_info/check', methods=['GET'])
@jwt_required()
def check_company_info():
    current_user_id = get_jwt_identity()

    user = User.query.filter_by(customer_id=current_user_id).first()

    if not user:
        return jsonify({"message": "User not found"}), 404

    existing_company_info = CompanyInfo.query.filter_by(
        user_id=current_user_id).first()
    if existing_company_info:
        return jsonify({"company_info_exists": True}), 200
    else:
        return jsonify({"company_info_exists": False}), 200
