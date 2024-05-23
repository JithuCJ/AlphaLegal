# tests/test_app.py
import json

def test_home_page(test_client):
    """
    GIVEN a Flask application
    WHEN the '/' page is requested (GET)
    THEN check the response is valid
    """
    response = test_client.get('/')
    assert response.status_code == 200
    assert b'Server is up and running!' in response.data

def test_register_user(test_client, init_database):
    """
    GIVEN a Flask application
    WHEN the '/register' page is posted to (POST)
    THEN check the response is valid
    """
    response = test_client.post('/register',
                                data=json.dumps(dict(email='newuser@example.com', username='newuser', password='password')),
                                content_type='application/json')
    assert response.status_code == 201
    assert b'Registration successful. Please check your email to confirm.' in response.data

def test_login_user(test_client, init_database):
    """
    GIVEN a Flask application
    WHEN the '/login' page is posted to (POST)
    THEN check the response is valid
    """
    response = test_client.post('/login',
                                data=json.dumps(dict(customer_id='somecustomerid', password='password')),
                                content_type='application/json')
    assert response.status_code in [200, 403, 401]
