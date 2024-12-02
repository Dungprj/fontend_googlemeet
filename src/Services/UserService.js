import axios from '~/utils/customize-axios';

const fetchAllUser = page => {
    return axios.get(`/api/User/GetUsers?page=${page}`);
};

const postCreateUser = (name, job) => {
    return axios.post(`/api/users`, { name, job });
};

const putUpdateUser = (id, name, job) => {
    return axios.put(`/api/users/${id}`, { name, job });
};

const DeleteUser = id => {
    return axios.delete(`/api/users/${id}`);
};

const LoginApi = (email, password) => {
    return axios.post('/api/Account/SignIn', { email: email, password });
};

const GetVideos = () => {
    return axios.get('/api/Videos');
};

const search = async (q, type = 'less') => {
    return axios.get('/api/User/Search', {
        params: {
            q,
            type
        }
    });
};

export {
    fetchAllUser,
    postCreateUser,
    putUpdateUser,
    DeleteUser,
    LoginApi,
    search,
    GetVideos
};
