from dotenv import load_dotenv
import os

load_dotenv()


class ApplicationConfig:

    SECRETE_KEY = os.environ.get('SECRETE_KEY')
    # Database Configuration
    SQLALCHEMY_DATABASE_URI = 'sqlite:///app.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True

    # Flask-Mail Configuration
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = os.environ.get('MAIL_USERNAME')

    # JWT Configuration
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
