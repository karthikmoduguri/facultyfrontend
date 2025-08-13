// utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:7000/api/v1',
});

// Attach token if present
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // stored after login redirect
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
