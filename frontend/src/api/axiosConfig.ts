

import axios from 'axios';
import store  from '../reduxToolkit/store';

import { BaseAPI } from './api';
import authSlice, { logout, updateTokens } from '../reduxToolkit/auth/authSlice';

const axiosConfig = axios.create({
    baseURL: `${BaseAPI}/`,
});

axiosConfig.interceptors.request.use(
    (config) => {
        const { auth } = store.getState();
        if (auth.accessToken) {
            config.headers.Authorization = `JWT ${auth.accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


axiosConfig.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { config, response } = error;
        const { auth } = store.getState();

        if (response.status === 401 && auth.refreshToken) {
            try {
                const refreshResponse = await axios.post('refresh/', {
                    refresh: auth.refreshToken,
                });
                store.dispatch(updateTokens(refreshResponse.data)); // Обновите токены в Redux
                config.headers.Authorization = `JWT ${refreshResponse.data.access}`;
                return axios(config);
            } catch (err) {
                store.dispatch(logout()); // Удалите токены при ошибке
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosConfig;