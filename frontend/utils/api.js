import axios from 'axios';
import {getCookie} from './cookies.js'

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api',
  timeout: 5000, // Timeout if necessary
  headers: {
    "Authorization":`Bearer ${getCookie("token")}`,
    // Add all custom headers here
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  } else {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});