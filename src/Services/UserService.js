import axios from '~/utils/customize-axios';

const fetchAllUser = page => {
    return axios.get(`/api/users?page=${page}`);
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
    return axios.post('/api/login', { email: email, password });
};
export { fetchAllUser, postCreateUser, putUpdateUser, DeleteUser, LoginApi };
