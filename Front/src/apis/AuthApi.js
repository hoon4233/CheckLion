import axios from "axios";
import Registration from "../routes/Registration";

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

export const registrationApi = {
    register: (name, email, password, conPassword) =>
        api.post('/member/registration/', {
            username: name,
            email: email,
            password1: password,
            password2: conPassword
        })
}