from dotenv import load_dotenv
import os

load_dotenv()


class ApplicationConfig:

    SECRETE_KEY = os.environ.get('SECRETE_KEY')

    SQLALCHEMY_DATABASE_URI = 'sqlite:///app.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
