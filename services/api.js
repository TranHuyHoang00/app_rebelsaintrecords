import axios from 'axios';
const URL = () => {
    return 'http://103.180.137.113/'
}
const get_list_user = () => {
    return axios.get(`${URL()}/auth/api/v1/list-user`);
}
const get_user = (id) => {
    return axios.get(`${URL()}/auth/api/v1/get-user/${id}`);
}
const Login = (username, password) => {
    return axios.post(`${URL()}/auth/api/v1/login`, { username: username, password: password });
}
export {
    get_list_user, get_user, Login
}
