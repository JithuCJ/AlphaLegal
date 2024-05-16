#!/usr/bin/env python3

import connexion

from flask_cors import CORS

from app import encoder


def main():
    app = connexion.App(__name__, specification_dir='./swagger/')
    app.app.json_encoder = encoder.FlaskJSONProvider

    CORS(app.app, supports_credentials=True, origins=["http://localhost:3000"])

    app.add_api('swagger.yaml', arguments={'title': 'LegalShield QGenius API'}, pythonic_params=True)
    app.run(port=8080)


if __name__ == '__main__':
    main()
