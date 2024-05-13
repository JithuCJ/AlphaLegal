# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from app.models.customer_id_doc_id_body import CustomerIdDocIdBody  # noqa: E501
from app.models.customer_id_docs_body import CustomerIdDocsBody  # noqa: E501
from app.test import BaseTestCase


class TestDefaultController(BaseTestCase):
    """DefaultController integration test stubs"""

    def test_legalshield_qgenius_api_v1_customer_id_doc_id_get(self):
        """Test case for legalshield_qgenius_api_v1_customer_id_doc_id_get

        Get a document by ID
        """
        response = self.client.open(
            '/legalshield/qgenius/api/v1/legalshield/qgenius/api/v1/{customerId}/{docId}'.format(customer_id='customer_id_example', doc_id='doc_id_example'),
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_legalshield_qgenius_api_v1_customer_id_doc_id_put(self):
        """Test case for legalshield_qgenius_api_v1_customer_id_doc_id_put

        Update a document by ID
        """
        body = CustomerIdDocIdBody()
        response = self.client.open(
            '/legalshield/qgenius/api/v1/legalshield/qgenius/api/v1/{customerId}/{docId}'.format(customer_id='customer_id_example', doc_id='doc_id_example'),
            method='PUT',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_legalshield_qgenius_api_v1_customer_id_docs_get(self):
        """Test case for legalshield_qgenius_api_v1_customer_id_docs_get

        Get all document IDs
        """
        response = self.client.open(
            '/legalshield/qgenius/api/v1/legalshield/qgenius/api/v1/{customerId}/docs'.format(customer_id='customer_id_example'),
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_legalshield_qgenius_api_v1_customer_id_docs_post(self):
        """Test case for legalshield_qgenius_api_v1_customer_id_docs_post

        Post a document
        """
        body = CustomerIdDocsBody()
        response = self.client.open(
            '/legalshield/qgenius/api/v1/legalshield/qgenius/api/v1/{customerId}/docs'.format(customer_id='customer_id_example'),
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
