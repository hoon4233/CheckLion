import axios from "axios";

const api = axios.create(
    {
        baseURL: 'http://127.0.0.1:8000/'
    }
);


export const logInApi = {
    logIn: (email, password) =>
        api.post('/member/login/', {
            email: email,
            password: password
        })
}

export const logoutApi = {
    logout: (email, password) =>
        api.post('/member/logout/')
}