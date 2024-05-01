import os
import json
import base64
from azure.data.tables import TableServiceClient
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
class StorageManager:
    def __init__(self):
        self.connection_string = os.environ.get('STORAGE_CONNECTION_STRING',
                                           "BlobEndpoint=https://legalschieldproduction.blob.core.windows.net/;QueueEndpoint=https://legalschieldproduction.queue.core.windows.net/;FileEndpoint=https://legalschieldproduction.file.core.windows.net/;TableEndpoint=https://legalschieldproduction.table.core.windows.net/;SharedAccessSignature=sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-04-30T01:58:20Z&st=2024-04-01T17:58:20Z&spr=https&sig=Jjrbmcr0j3Qo8Ndlpes8%2BDKcFEpCQEPMEvPk8Qn%2FcGA%3D")
        self.table_name = os.environ.get('STORAGE_TABLE_NAME', "customerdata")
        self.container_name = os.environ.get('STORAGE_CONTAINER_NAME', "customerdata")

    '''
        Check Customer is valid or not
    '''
    def checkCustomerIdIsValid(self, customer_id):
        print("[  checkCustomerIdInStorage ]")
        table_service_client = TableServiceClient.from_connection_string(self.connection_string)
        table_client = table_service_client.get_table_client(self.table_name)
        table_properties = table_client.get_entity(partition_key=customer_id, row_key=customer_id)
        print([" Check Customer ID"], table_properties)
        return table_properties

    def getDocsFromStorage(self, customer_id):
        """Access the
        """
        # Create a BlobServiceClient using the connection string
        blob_service_client = BlobServiceClient.from_connection_string(self.connection_string)

        # Get a ContainerClient using the container name
        container_client = blob_service_client.get_container_client(customer_id)

        # List the blobs in the container
        print("\nListing blobs...")
        download_file = {}
        blobs = container_client.list_blobs()
        if len(blobs == 0):
            print("No blobs found")
            for blob in blobs:
                print(blob.name)
                blob_client = container_client.get_blob_client(blob)
                byte_string = blob_client.download_blob().readall()
                base64_encoded = base64.b64encode(byte_string).decode('utf-8')
                import json
                # Create a JSON object with the base64 encoded string
                json_data = json.dumps({"data": base64_encoded})

                # Example usage to print the JSON data
                print(["Response Data"], json_data)
                download_file[blob.name] = json_data
            return download_file
        else:
            for blob in blobs:
                print(blob.name)
                blob_client = container_client.get_blob_client(blob)
                byte_string = blob_client.download_blob().readall()
                base64_encoded = base64.b64encode(byte_string).decode('utf-8')
                # Create a JSON object with the base64 encoded string
                json_data = json.dumps({"data": base64_encoded})

                # Example usage to print the JSON data
                print(["Response Data"], json_data)
                download_file[blob.name] = json_data
            return download_file
