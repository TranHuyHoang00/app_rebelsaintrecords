import axios from 'axios';
import api_user from '../auths/api_user';

const get_list_user = () => {
    return axios.get(`${process.env.EXPO_PUBLIC_API_URL}/auth/api/v1/list-user`);
}
const get_user = (id) => {
    return axios.get(`${process.env.EXPO_PUBLIC_API_URL}/auth/api/v1/get-user/${id}`);
}
const Login = (username, password) => {
    return axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/api/v1/login`, { username: username, password: password });
}
const get_list_schedule = (data) => {
    return api_user.post(`/management/api/v1/list-schedule`, data);
}
const get_schedule = (id) => {
    return api_user.get(`/management/api/v1/get-schedule/${id}`);
}
const get_charge_of = (id) => {
    return api_user.get(`/management/api/v1/get-charge_of/${id}`,);
}
const get_time_location = (id) => {
    return api_user.get(`/management/api/v1/get-time_location/${id}`,);
}
const get_makeup_hair = (id) => {
    return api_user.get(`/management/api/v1/get-makeup_hair/${id}`,);
}
const get_stylist = (id) => {
    return api_user.get(`/management/api/v1/get-stylist/${id}`,);
}
const create_device = (data) => {
    return api_user.post(`/management/api/v1/create-device`, data,);
}
const delete_device = (id) => {
    return api_user.delete(`/management/api/v1/delete-device/${id}`,);
}
const get_list_device = () => {
    return api_user.get(`/management/api/v1/list-device`);
}
export {
    get_list_user, get_user, Login, get_list_schedule, get_schedule, get_charge_of,
    get_time_location, get_makeup_hair, get_stylist, create_device, delete_device,
    get_list_device
}
