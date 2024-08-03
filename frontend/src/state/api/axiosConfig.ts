import axios from 'axios';
import store from '../store';
import { clearTokens } from '../auth/authSlice';
import { refreshToken } from '../auth/authThunk';
import { BaseAPI, KeyWordJWT } from './EAPI';


const axiosConfig = axios.create({
    baseURL: BaseAPI.BaseAPI,
    withCredentials: true,

    headers: {
        'Content-Type': 'application/json',
    },
    
});

axiosConfig.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.accessToken;

        if (token) {
            config.headers['Authorization'] = `${KeyWordJWT.KEY} ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axiosConfig.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {

                const refreshResponse = await store.dispatch(refreshToken()).unwrap();
                const newToken = refreshResponse.access; // или другой ключ для нового токена

               
                axiosConfig.defaults.headers.common['Authorization'] = `${KeyWordJWT.KEY} ${newToken}`;

                return axiosConfig(originalRequest);
            } catch (err) {
                store.dispatch(clearTokens());
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);


export default axiosConfig;