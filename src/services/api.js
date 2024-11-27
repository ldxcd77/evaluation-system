import axios from 'axios';

const API_BASE_URL = 'http://your-api-base-url';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
};

export const userAPI = {
    getUsers: () => api.get('/users'),
    updateUser: (id, userData) => api.put(`/users/${id}`, userData),
    deleteUser: (id) => api.delete(`/users/${id}`),
};

export const indicatorAPI = {
    getIndicators: () => api.get('/indicators'),
    createIndicator: (data) => api.post('/indicators', data),
    updateIndicator: (id, data) => api.put(`/indicators/${id}`, data),
    deleteIndicator: (id) => api.delete(`/indicators/${id}`),
};

export default api; 