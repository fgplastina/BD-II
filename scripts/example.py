import os

from pymongo import MongoClient

print("Starting script")

try:
    uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
    client = MongoClient(uri)
    db = client['mydatabase']

    print("Collections:", db.list_collection_names())
except Exception as e:
    print("Exception: {e}")
    ...

finally:
    print("Script execution ended")
