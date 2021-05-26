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

export const changePwApi = {
    changePw: (token, inputs) =>
        api.post('/member/pwchange/', {
            new_password1: inputs.pw1,
            new_password2: inputs.pw2
        }, {
            headers: {
                Authorization: 'Token ' + token,
            }
        })
}