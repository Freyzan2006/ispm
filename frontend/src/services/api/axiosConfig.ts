import axios from 'axios';
import store from '../../store/store';
import { clearTokens, setAccessToken } from '../../store/slices/authSlice/authSlice';
import { refreshToken } from '../../store/slices/authSlice/authThunk';
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
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            

           

            try {

                const refreshResponse = await store.dispatch(refreshToken()).unwrap();
                const newToken = refreshResponse.access; // или другой ключ для нового токена

                
                // axiosConfig.defaults.headers.common['Authorization'] = `${KeyWordJWT.KEY} ${newToken}`; было
                store.dispatch(setAccessToken(newToken));
                originalRequest.headers['Authorization'] = `${KeyWordJWT.KEY} ${newToken}`; // стало

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