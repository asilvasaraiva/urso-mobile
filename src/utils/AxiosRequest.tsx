import axios from 'axios';

const URL = 'http://192.168.101.8:3001';

const AxiosRequest = axios.create({
    baseURL: URL
});

AxiosRequest.interceptors.response.use(response => {
    return response;
}, error => {
    if (!error.response) {//caso seja erro de conxeão ou server fora do ar
        return null;
    }
    return Promise.reject(error.response);
});

export default AxiosRequest;