

import axios from 'axios';
import store  from '../reduxToolkit/store';

import { BaseAPI } from './api';
import authSlice, { logout, updateTokens } from '../reduxToolkit/auth/authSlice';

const axiosConfig = axios.create({
    baseURL: `${BaseAPI}/`,
    withCredentials: true,
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


// axiosConfig.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const { config, response } = error;
//         const { auth } = store.getState();

//         if (response && response.status === 401 && auth.refreshToken ) {
            

//             try {
//                 const refreshResponse = await axiosConfig.post('user/token/refresh/', {
//                     refresh: auth.refreshToken,
//                 });
//                 store.dispatch(updateTokens(refreshResponse.data)); // Обновите токены в Redux
//                 config.headers.Authorization = `JWT ${refreshResponse.data.access}`;
//                 return axiosConfig(config);
//             } catch (err) {
//                 // store.dispatch(logout()); // Удалите токены при ошибке
//                 console.log("Z")
//                 return Promise.reject(err);
//             }
//         }
//         return Promise.reject(error);
        
//     }
// );


axiosConfig.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { config, response } = error;
        const { auth } = store.getState();

        if (response && response.status === 401 && auth.refreshToken) {
            if (config._retry) {
                return Promise.reject(error);
            }
            config._retry = true;

            try {
                const refreshResponse = await axiosConfig.post('user/token/refresh/', {
                    refresh: auth.refreshToken,
                });
                store.dispatch(updateTokens(refreshResponse.data));
                config.headers.Authorization = `JWT ${refreshResponse.data.access}`;
                return axiosConfig(config);
            } catch (err) {
                store.dispatch(logout());
                console.log("Token refresh failed:", err);
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
        
    }
);



export default axiosConfig;