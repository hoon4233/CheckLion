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
    postScore: (token, teamName, week, assignment, attendance, lecture, email) =>
        api.post('/member/score/' + teamName + '/', {
            week: week,
            assignment: assignment,
            attendance: attendance,
            lecture: lecture,
            user_id: email
        }, {
            headers: {
                Authorization: 'Token ' + token
            }
        })
}