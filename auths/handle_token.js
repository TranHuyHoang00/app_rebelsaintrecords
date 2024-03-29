import axios from 'axios';
import { get_local, set_local } from './local_storage';
import { LogBox } from 'react-native';

const handle_token_local = async (account) => {
    let token_init = null;
    let token_checked = null;
    let data_account_raw = await get_local(account);
    if (data_account_raw.access) {
        token_init = data_account_raw.access;
        token_checked = await check_token(account, token_init);
    } else {
        return token_checked;
    }
    return token_checked;
}
const check_token = async (account, token_init) => {
    const api = axios.create({ baseURL: `${process.env.EXPO_PUBLIC_API_URL}`, });
    api.interceptors.request.use(
        (config) => {
            let token = token_init;
            if (token) { config.headers.Authorization = `Bearer ${token}`; }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    api.interceptors.response.use(
        (response) => {
            return true;
        },
        async (error) => {
            if (error.response.status === 401) {
                return false;
            }
            return Promise.reject(error);
        }
    );
    let data_checked = await api.get(`${process.env.EXPO_PUBLIC_API_URL}auth/api/v1/list-role`);
    if (data_checked == true) {
        return token_init;
    } else {
        let data_account_raw = null;
        data_account_raw = await get_local(account);
        let data_token = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}auth/api/v1/token/refresh`, { refresh: data_account_raw.refresh });
        let token_new = data_token.data.data.access;

        let data_account_new = data_account_raw;
        data_account_new.access = token_new;
        await set_local(account, data_account_new);
        return token_new;
    }

}
export default handle_token_local;