import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
const api = axios.create(
    {
        baseURL: 'http://127.0.0.1:8000/'
    }
);

export const rankingApi = {
    getRanking: (token) =>
        api.get('/member/ranking/', {
            headers: {
                Authorization: 'Token ' + token,
            }
        })
}