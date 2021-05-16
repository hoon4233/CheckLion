export const checkLogin = () => {
    if (localStorage.getItem('checkLionAuth') !== null) {
        return true;
    } else {
        return false;
    }
}