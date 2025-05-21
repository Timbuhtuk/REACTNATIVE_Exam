import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.119:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
