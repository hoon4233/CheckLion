import axios from "axios";

const data = [
    {
        user_id: "kang@likelion.org",
        week: 2,
        assignment: true,
        attendance: true,
        lecture: true
    },
    {
        user_id: "qkr@likelion.org",
        week: 2,
        assignment: true,
        attendance: true,
        lecture: true
    },
    {
        user_id: "ths@likelion.org",
        week: 2,
        assignment: true,
        attendance: true,
        lecture: true
    }, {
        user_id: "normal@likelion.org",
        week: 2,
        assignment: true,
        attendance: false,
        lecture: true
    }]

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


export const teamListApi = {
    getTeamList: (token) =>
        api.get('/member/teams/', {
            headers: {
                Authorization: 'Token ' + token,
            }
        })
}

export const usersOfTeamAPi = {
    getUsers: (token, teamName) =>
        api.get('/member/' + teamName + '/users/', {
            headers: {
                Authorization: 'Token ' + token,
            }
        })
}


export const teamScoreOfWeekApi = {
    getScoreOfWeek: (token, teamName, week) =>
        api.get('/member/score/' + teamName + '/' + week + '/', {
            headers: {
                Authorization: 'Token ' + token,
            }
        })
}

export const scoreCreateApi = {
    postScore: (token, teamName, data) =>
        api.post('/member/score/' + teamName + '/', {
            data
        }, {
            headers: {
                Authorization: 'Token ' + token
            }
        })
}