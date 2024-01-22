import requests
import json

# Your data to post
data_to_post = [
    {
        "id": "0",
        "type": "Feature",
        "properties": {
            "stop_id": 1,
            "stop_code": None,
            "stop_name": "Dilshad Garden",
            "stop_desc": None,
            "stop_lat": 28.675991,
            "stop_lon": 77.321495
        },
        "geometry": {"type": "Point", "coordinates": [77.321495, 28.675991]}
    },
    {
        "id": "1",
        "type": "Feature",
        "properties": {
            "stop_id": 2,
            "stop_code": None,
            "stop_name": "Jhilmil",
            "stop_desc": None,
            "stop_lat": 28.675648,
            "stop_lon": 77.312393
        },
        "geometry": {"type": "Point", "coordinates": [77.312393, 28.675648]}
    }
    # Add more data here if needed
]

# Send a POST request to localhost:5000/test/stores
url = 'http://localhost:5000/test/stores'

# Loop through your data and post each item
for item in data_to_post:
    try:
        response = requests.post(url, json=item)
        if response.status_code == 200:
            print(f"Data posted successfully: {item}")
        else:
            print(f"Failed to post data: {item}")
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
