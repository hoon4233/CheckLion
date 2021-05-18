export const checkLogin = () => {
    if (localStorage.getItem('checkLionAuth') !== null) {
        return true;
    } else {
        return false;
    }
};

export const getToken = () => {
    if (localStorage.getItem('checkLionAuth') !== null) {
        return localStorage.getItem('checkLionAuth');
    } else {
        return null;
    }
};