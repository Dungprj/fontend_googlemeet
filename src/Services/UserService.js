import axios from '~/utils/customize-axios';
import Cookies from 'js-cookie';

//Api user
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

const search = async (q, type = 'less') => {
    return axios.get('/api/User/Search', {
        params: {
            q,
            type
        }
    });
};

const getDataFile = () => {
    return axios.get(`/api/GoogleDocs/read`);
};

const testAuthor = () => {
    return axios.get('/api/Test/TestAuthor');
};

//api Login Register
const LoginApi = (email, password) => {
    return axios.post('/api/Account/SignIn', { email: email, password });
};

// api CRUD video

const GetVideos = () => {
    return axios.get('/api/Videos');
};

const DeleteVideos = id => {
    return axios.delete(`/api/Videos/${id}`);
};
const Upload = async (formData, config) => {
    // Gửi yêu cầu POST với FormData
    const response = await axios.post('/api/Videos/upload', formData, config);

    return response; // Trả về kết quả sau khi upload thành công
};

const Renewtoken = async () => {
    const token = Cookies.get('token');

    const refreshToken = Cookies.get('refreshToken');

    const response = await axios.post('/api/Account/Renewtoken', {
        accessToken: token,
        refreshToken: refreshToken
    });

    return response;
};

export {
    fetchAllUser,
    postCreateUser,
    putUpdateUser,
    DeleteUser,
    LoginApi,
    search,
    GetVideos,
    Upload,
    DeleteVideos,
    testAuthor,
    Renewtoken,
    getDataFile
};
