import requests
import json

def client():
    # import pdb; pdb.set_trace() 

    data = {
        "email" : "admin@likelion.org", 
        "password" : "1234"
    }


    response = requests.post("http://127.0.0.1:8000/member/login/", data=data)
    response_data = response.json()
    print(response_data)
    
    token_h = "Token "+response_data['key']
    headers = {"Authorization": token_h, "Content-Type":"application/json"}

    print("Status Code about login:", response.status_code)
    response_data = response.json()
    print(response_data)



    # data = [
    # {
    #     "user_id": "kang@likelion.org", 
    #     "week" : "1",
    #     "assignmnet" : True,
    #     "attendance" : True,
    #     "lecture" : True
    # },
    # {
    #     "user_id": "qkr@likelion.org", 
    #     "week" : "1",
    #     "assignmnet" : True,
    #     "attendance" : True,
    #     "lecture" : True
    # },
    # {
    #     "user_id": "ths@likelion.org", 
    #     "week" : "1",
    #     "assignmnet" : True,
    #     "attendance" : True,
    #     "lecture" : True
    # }
    # ]

    
    data = [
        {
            "user_id": "kang@likelion.org", 
            "week" : "1",
            "assignmnet" : "true",
            "attendance" : "true",
            "lecture" : "true"
        },
        {
            "user_id": "qkr@likelion.org", 
            "week" : "1",
            "assignmnet" : "true",
            "attendance" : "true",
            "lecture" : "true"
        },
        {
            "user_id": "ths@likelion.org", 
            "week" : "1",
            "assignmnet" : "true",
            "attendance" : "true",
            "lecture" : "true"
        }
    ]


    # response = requests.post("http://127.0.0.1:8000/member/users", headers=headers, data=json.dumps(data))
    response = requests.post("http://127.0.0.1:8000/member/score/%EC%9D%84%EC%A7%80%EB%A1%9C/", headers=headers, data=json.dumps(data))
    print("Status Code about create_score:", response.status_code)
    response_data = response.json()
    print(response_data)
    

if __name__ == "__main__":
    client()