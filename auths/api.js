import axios from 'axios';
import { getDataLocal, setDataLocal, deleteDataLocal } from './localStorage';
const api = axios.create({
    baseURL: `${process.env.EXPO_PUBLIC_API_URL}`,
});
api.interceptors.request.use(
    async (request) => {
        const dataAccount = await getDataLocal(process.env.EXPO_PUBLIC_ACCOUNT);
        const token = dataAccount.access;
        if (token) { request.headers.Authorization = `Bearer ${token}`; }
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);
api.interceptors.response.use(
    (response) => { return response; },
    async (error) => {
        const originalConfig = error.config;
        if (error?.response?.status === 401) {
            let dataAccount = await getDataLocal(process.env.EXPO_PUBLIC_ACCOUNT);
            const refresh = dataAccount.refresh;
            let token;
            if (!refresh) {
                return Promise.reject(error);
            }
            try {
                const data = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/api/v1/token/refresh`, { refresh: refresh });
                if (data) {
                    token = data.data.data.access;
                    originalConfig.headers.Authorization = `Bearer ${token}`;
                    dataAccount.access = token;
                    setDataLocal(process.env.EXPO_PUBLIC_ACCOUNT, dataAccount);
                    return api(originalConfig);
                }
            } catch (error) {
                deleteDataLocal(process.env.EXPO_PUBLIC_ACCOUNT);
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
