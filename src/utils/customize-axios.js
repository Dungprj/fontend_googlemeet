import axios from 'axios';

import Cookies from 'js-cookie';
import { constant } from 'lodash';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_AUTHEN,
    timeout: 10000
});

instance.interceptors.request.use(
    async config => {
        // Cookies.set('token', accessToken);
        // Cookies.set('refreshToken', refreshToken);

        const token = Cookies.get('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response && response.data && response.data.data
            ? response.data
            : { data: response.data, statuscode: response.status };
    },
    async err => {
        const originalRequest = err.config;

        if (err.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const token = Cookies.get('token');

            const refreshToken = Cookies.get('refreshToken');

            if (!refreshToken) return Promise.reject(err);

            try {
                const res = await instance.post('/api/Account/Renewtoken', {
                    accessToken: token,
                    refreshToken: refreshToken
                });

                const { status, data } = await res;

                const { accessToken, refreshToken } = data;

                Cookies.set('token', accessToken);
                Cookies.set('refreshToken', refreshToken);

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                return instance(originalRequest);
            } catch (error) {
                Cookies.remove('token');
                Cookies.remove('refreshToken');

                return Promise.reject(error);
            }
        }
    }
);

export default instance;
