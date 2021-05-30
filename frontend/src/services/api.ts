import axios from 'axios';

const api = axios.create({
    baseURL: 'https://deps-pdist-hospital-backend.herokuapp.com/api/v1/',
})

export default api;