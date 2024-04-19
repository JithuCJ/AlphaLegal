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
   

    # JWT Configuration
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
