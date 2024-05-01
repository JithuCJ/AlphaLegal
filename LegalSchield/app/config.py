import os
class Config:
    def __init__(self):
        self.storage_account = os.environ.get('STORAGE_ACCOUNT')
        self.storage_sas_endpoint = os.environ.get('STORAGE_SAS_ENDPOINT')

