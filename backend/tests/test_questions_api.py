# tests/test_questions_api.py
import json
import io

def test_get_questions(test_client, init_database):
    """
    GIVEN a Flask application
    WHEN the '/questions' page is requested (GET)
    THEN check the response is valid and returns a list of questions
    """
    response = test_client.get('/questions/questions')
    assert response.status_code == 200
    assert 'questions' in response.json

def test_upload_pdf(test_client, init_database):
    """
    GIVEN a Flask application
    WHEN a valid PDF is uploaded to '/upload' (POST)
    THEN check the response is valid
    """
    pdf_data = b'%PDF-1.4\n1 0 obj\n<<\n/Title (PDF Title)\n>>\nendobj\nxref\n0 1\n0000000000 65535 f \ntrailer\n<<\n/Root 1 0 R\n>>\n%%EOF'
    data = {'pdf': (io.BytesIO(pdf_data), 'test.pdf')}
    response = test_client.post('/questions/upload', content_type='multipart/form-data', data=data)
    assert response.status_code == 200
    assert b'PDF processed successfully' in response.data

def test_upload_invalid_pdf(test_client, init_database):
    """
    GIVEN a Flask application
    WHEN an invalid file is uploaded to '/upload' (POST)
    THEN check the response returns an error
    """
    data = {'pdf': (io.BytesIO(b'Invalid content'), 'test.txt')}
    response = test_client.post('/questions/upload', content_type='multipart/form-data', data=data)
    assert response.status_code == 400
    assert b'Invalid file format. Only PDFs are allowed.' in response.data

def test_save_answers(test_client, init_database):
    """
    GIVEN a Flask application
    WHEN answers are posted to '/save' (POST)
    THEN check the response is valid
    """
    answers = [
        {'question_id': 1, 'answer': 'Yes'},
        {'question_id': 2, 'answer': 'No'}
    ]
    response = test_client.post('/questions/save', data=json.dumps(dict(customerId='somecustomerid', answers=answers)), content_type='application/json')
    assert response.status_code == 201
    assert b'Answers saved successfully!' in response.data

def test_save_answers_missing_customer_id(test_client, init_database):
    """
    GIVEN a Flask application
    WHEN answers are posted to '/save' (POST) without customerId
    THEN check the response returns an error
    """
    answers = [
        {'question_id': 1, 'answer': 'Yes'},
        {'question_id': 2, 'answer': 'No'}
    ]
    response = test_client.post('/questions/save', data=json.dumps(dict(answers=answers)), content_type='application/json')
    assert response.status_code == 400
    assert b'Missing customerId' in response.data

def test_get_questions_with_answers(test_client, init_database):
    """
    GIVEN a Flask application
    WHEN the '/questions_with_answers' page is requested (GET) with a valid customerId
    THEN check the response is valid and returns questions with answers
    """
    response = test_client.get('/questions/questions_with_answers', query_string={'customerId': 'somecustomerid'})
    assert response.status_code == 200
    assert 'questions' in response.json

def test_get_questions_with_answers_missing_customer_id(test_client, init_database):
    """
    GIVEN a Flask application
    WHEN the '/questions_with_answers' page is requested (GET) without customerId
    THEN check the response returns an error
    """
    response = test_client.get('/questions/questions_with_answers')
    assert response.status_code == 400
    assert b'Missing customerId' in response.data
