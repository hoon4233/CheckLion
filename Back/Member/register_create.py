import requests
import json

def client():
    import pdb; pdb.set_trace() 

    data = {
        "name": "test",
        "email" : "test@likelion.org", 
        "password1" : "1234",
        "password2" : "1234"
    }

    response = requests.post("http://127.0.0.1:8000/api/rest-auth/registration/", data=data)
    response_data = response.json()
    print(response_data)
    
    token_h = "Token "+response_data['key']
    headers = {"Authorization": token_h}
    # token_h = "Token "
    # headers = {"Authorization": token_h}

    response = requests.get("http://127.0.0.1:8000/member/users", headers=headers)

    print("Status Code:", response.status_code)
    response_data = response.json()
    print(response_data)

if __name__ == "__main__":
    client()