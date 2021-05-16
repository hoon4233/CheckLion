import requests
import json

def client():
    credentials = {"email": "admin@likelion.org", "password" : "1234"}

    response = requests.post("http://127.0.0.1:8000/member/login/", data=credentials)
    print("Status Code:", response.status_code)
    response_data = response.json()
    print(response_data)
    
    token_h = "Token "+response_data['key']
    headers = {"Authorization": token_h}
    print(token_h)
    # token_h = "Token "
    # headers = {"Authorization": token_h}

    response = requests.get("http://127.0.0.1:8000/member/%EC%9D%84%EC%A7%80%EB%A1%9C/users/", headers=headers)

    print("Status Code:", response.status_code)
    response_data = response.json()
    print(response_data)

if __name__ == "__main__":
    client()