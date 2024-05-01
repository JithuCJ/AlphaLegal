import connexion
import six

from app.models.customer_id_doc_id_body import CustomerIdDocIdBody  # noqa: E501
from app.models.customer_id_docs_body import CustomerIdDocsBody  # noqa: E501
from app.config import Config
from app import util
import os
from  app.storage.manager import StorageManager
import base64


def legalshield_qgenius_api_v1_customer_id_doc_id_get(customer_id, doc_id):  # noqa: E501
    """Get a document by ID

    Retrieve a document by its ID for the specified customer ID. # noqa: E501

    :param customer_id: The ID of the customer.
    :type customer_id: str
    :param doc_id: The ID of the document.
    :type doc_id: str

    :rtype: None
    """
    if (not validateCustomerId(customer_id)):
        return "Bad Request", 400
    return 'do some magic!'


def legalshield_qgenius_api_v1_customer_id_doc_id_put(body, customer_id, doc_id):  # noqa: E501
    """Update a document by ID

    Update a document by its ID for the specified customer ID. # noqa: E501

    :param body: 
    :type body: dict | bytes
    :param customer_id: The ID of the customer.
    :type customer_id: str
    :param doc_id: The ID of the document.
    :type doc_id: str

    :rtype: None
    """
    if (not validateCustomerId(customer_id)):
        return "Bad Request", 400
    if connexion.request.is_json:
        body = CustomerIdDocIdBody.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def legalshield_qgenius_api_v1_customer_id_docs_get(customer_id):  # noqa: E501
    """Get all document IDs

    Retrieve all document IDs for the specified customer ID. # noqa: E501

    :param customer_id: The ID of the customer.
    :type customer_id: str

    :rtype: None
    """
    print("[ GET ALL legalshield_qgenius_api_v1_customer_id_docs_get]")
    if (not validateCustomerId(customer_id)):
        return "Bad Request", 400

    print("[Valid Customer Getting the docs]")
    documents = getDocsFromStorage(customer_id)
    return documents


def legalshield_qgenius_api_v1_customer_id_docs_post(body, customer_id):  # noqa: E501
    """Post a document

    Upload a new document for the specified customer ID. # noqa: E501

    :param body: 
    :type body: dict | bytes
    :param customer_id: The ID of the customer.
    :type customer_id: str

    :rtype: None
    """
    if (not validateCustomerId(customer_id)):
        return "Bad Request", 400

    if connexion.request.is_json:
        body = CustomerIdDocsBody.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


'''
This function validate the customer ID and return True if it exist else False
'''
def validateCustomerId(customer_id):
    """Validate a customer ID
    :param customer_id: The
    :type customer_id: str
    :rtype: bool
    """
    if customer_id is None:
        return False
    if (StorageManager.checkCustomerIdIsValid(customer_id)):
        return True
    return False







# Function to convert PDF file to base64 string
def pdf_to_base64(file_path):
    with open(file_path, "rb") as pdf_file:
        pdf_bytes = pdf_file.read()
        base64_string = base64.b64encode(pdf_bytes).decode("utf-8")
    return base64_string

# Function to send PDF as JSON to REST API
def convert_pdf_as_json(file_path):
    base64_string = pdf_to_base64(file_path)
    payload = {
        "file": base64_string
    }
    headers = {
        "Content-Type": "application/json"
    }
    response = requests.post(url, json=payload, headers=headers)
    return response