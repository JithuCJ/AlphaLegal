from flask import Blueprint, request, jsonify
from models import db, Question, Answer, User
import fitz
import logging

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
    question = ""
    options = []
    weights = {}
    option_prefixes = ('a)', 'b)', 'c)', 'd)')
    
    for line in lines:
        if line.strip().startswith(tuple(f"{i}." for i in range(1, 101))):
            if question:
                if options and weights:
                    questions_data.append({
                        'question': question.strip(),
                        'options': [f"{prefix} {opt}" for prefix, opt in zip(option_prefixes, options)],
                        'weights': weights
                    })
                else:
                    questions_data.append({
                        'question': question.strip(),
                        'options': [f"{prefix} {opt}" for prefix, opt in zip(option_prefixes, options)],
                        'weights': {}
                    })
            question = line.strip()
            options = []
            weights = {}
        elif any(line.strip().startswith(prefix) for prefix in option_prefixes):
            option_text = line.strip().split(") ", 1)[1]
            option_key = line.strip().split(")")[0]
            options.append(option_text)
        elif line.strip().startswith("Ans:"):
            weights_text = line.strip().split("[", 1)[1].strip("]").split(", ")
            for weight in weights_text:
                key, value = weight.split("=")
                weights[key.strip()] = int(value.strip())
        else:
            if options:
                options[-1] += ' ' + line.strip()
            else:
                question += ' ' + line.strip()

    if question:
        if options and weights:
            questions_data.append({
                'question': question.strip(),
                'options': [f"{prefix} {opt}" for prefix, opt in zip(option_prefixes, options)],
                'weights': weights
            })
        else:
            questions_data.append({
                'question': question.strip(),
                'options': [f"{prefix} {opt}" for prefix, opt in zip(option_prefixes, options)],
                'weights': {}
            })

    return questions_data




def save_questions_to_db(questions_data):
    for item in questions_data:
        question_text = item['question']
        options_text = "\n".join(item['options']) if item['options'] else ""
        weights_data = item['weights']
        question = Question(question=question_text, options=options_text, weights=weights_data)
        db.session.add(question)
    db.session.commit()


@questions_api.route('/questions', methods=['GET'])
def get_questions():
    questions = Question.query.all()
    output = [{'id': q.id, 'question': q.question, 'options': q.options}
              for q in questions]
    return jsonify({'questions': output})

@questions_api.route('/save', methods=['POST'])
def save_answers():
    data = request.get_json()
    logging.debug(f"Received data: {data}")
    
    customer_id = data.get('customerId')
    answers = data.get('answers', [])

    if not customer_id:
        logging.error("Missing customerId")
        return jsonify({'error': 'Missing customerId'}), 400

    total_score = 0
    total_possible_score = 0

    for answer in answers:
        question_id = answer.get('question_id')
        answer_text = answer.get('answer')

        if question_id is None or answer_text is None:
            logging.error(f"Invalid answer format: {answer}")
            return jsonify({'error': 'Invalid answer format'}), 400
        
        # Normalize the answer text by removing trailing characters after the first ')'
        normalized_answer = answer_text.split(') ')[0].strip()

        # Check if the answer for this question already exists for this customer
        existing_answer = Answer.query.filter_by(user_id=customer_id, question_id=question_id).first()
        if existing_answer:
            logging.debug(f"Answer already exists for customer {customer_id} and question {question_id}")
            continue
        
        question = Question.query.get(question_id)
        if question:
            weight = question.weights.get(normalized_answer, 0)
            total_score += weight
            # Calculate the maximum possible score for this question
            max_weight = max(question.weights.values(), default=0)
            total_possible_score += max_weight
        
        new_answer = Answer(user_id=customer_id, question_id=question_id, answer=normalized_answer)
        db.session.add(new_answer)
    
    db.session.commit()

    # Calculate the percentage score
    percentage_score = (total_score / total_possible_score) * 100 if total_possible_score else 0
    
    return jsonify({'message': 'Answers saved successfully!', 'total_score': percentage_score}), 201



@questions_api.route('/questions_with_answers', methods=['GET'])
def get_questions_with_answers():
    customer_id = request.args.get('customerId')
    if not customer_id:
        return jsonify({'error': 'Missing customerId'}), 400

    questions = Question.query.all()
    answers = Answer.query.filter_by(user_id=customer_id).all()

    answered_questions = {answer.question_id: answer.answer for answer in answers}

    questions_with_answers = []
    for question in questions:
        questions_with_answers.append({
            'id': question.id,
            'question': question.question,
            'options': question.options,
            'answer': answered_questions.get(question.id, '')
        })

    return jsonify({'questions': questions_with_answers}), 200
