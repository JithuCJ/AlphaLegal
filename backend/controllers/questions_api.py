from flask import Blueprint, request, jsonify
from models import db, Question, Answer, User
import fitz

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
    question = ""
    options = []
    option_prefixes = ('a.', 'b.', 'c.', 'd.',)
    yes_no_options = ('Yes', 'No')

    for line in lines:
        if line.strip().startswith(tuple(f"{i}." for i in range(1, 101))):
            if question:
                if options:
                    questions_data.append(
                        {'question': question.strip(), 'options': options})
                else:
                    questions_data.append(
                        {'question': question.strip(), 'options': None})
            question = line.strip()
            options = []
        elif any(line.strip().startswith(prefix) for prefix in option_prefixes):
            options.append(line.strip())
        elif any(line.strip().startswith(opt) for opt in yes_no_options):
            options.append(line.strip())
        else:
            if options:
                options[-1] += ' ' + line.strip()
            else:
                question += ' ' + line.strip()

    if question:
        if options:
            questions_data.append(
                {'question': question.strip(), 'options': options})
        else:
            questions_data.append(
                {'question': question.strip(), 'options': None})

    return questions_data


def save_questions_to_db(questions_data):
    for item in questions_data:
        question_text = item['question']
        options_text = "\n".join(item['options']) if item['options'] else ""
        question = Question(question=question_text, options=options_text)
        db.session.add(question)
    db.session.commit()


@questions_api.route('/questions', methods=['GET'])
def get_questions():
    questions = Question.query.all()
    output = [{'id': q.id, 'question': q.question, 'options': q.options}
              for q in questions]
    return jsonify({'questions': output})



# # working
# @questions_api.route('/save-answer', methods=['POST'])
# def save_answer():
#     data = request.json
#     customer_id = data['customer_id']
#     answers = data['answers']

#     for answer in answers:
#         question_id = answer['question_id']
#         answer_text = answer['answer']

#         existing_answer = Answer.query.filter_by(user_id=customer_id, question_id=question_id).first()
#         if existing_answer:
#             existing_answer.answer = answer_text
#         else:
#             new_answer = Answer(user_id=customer_id, question_id=question_id, answer=answer_text)
#             db.session.add(new_answer)

#     db.session.commit()
#     return jsonify({'message': 'Answers saved successfully'}), 200


@questions_api.route('/save-answer', methods=['POST'])
def save_answer():
    data = request.get_json()  # Ensure you are getting the JSON data from the request
    if not data or 'customer_id' not in data:
        return jsonify({'error': 'Missing customer_id in request data'}), 400
    
    customer_id = data['customer_id']
    answers = data.get('answers', [])

    for answer in answers:
        question_id = answer['question_id']
        answer_text = answer['answer']

        existing_answer = Answer.query.filter_by(user_id=customer_id, question_id=question_id).first()
        if existing_answer:
            existing_answer.answer = answer_text
        else:
            new_answer = Answer(user_id=customer_id, question_id=question_id, answer=answer_text)
            db.session.add(new_answer)

    db.session.commit()
    return jsonify({'message': 'Answers saved successfully'}), 200



@questions_api.route('/unanswered-questions/<customer_id>', methods=['GET'])
def get_unanswered_questions(customer_id):
    answered_question_ids = [answer.question_id for answer in Answer.query.filter_by(user_id=customer_id).all()]
    unanswered_questions = Question.query.filter(~Question.id.in_(answered_question_ids)).all()
    output = [{'id': q.id, 'question': q.question, 'options': q.options} for q in unanswered_questions]
    return jsonify({'questions': output})



@questions_api.route('/customer_id', methods=['GET'])
def user():
    customer_id = request.json.get('customer_id')
    user = User.query.filter_by(customer_id=customer_id).first()
    return jsonify({'customer_id': user.customer_id}), 200

