import axios from 'axios';
import {getCookie} from './cookies.js'
import {logOut} from './auth.js'
import { redirect } from 'next/navigation.js';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api',
  timeout: 5000, // Timeout if necessary
});

axiosInstance.interceptors.request.use((config) => {
  const token = getCookie("token");

  if (token) {  
    config.headers['Authorization'] = `Bearer ${token}`;
  }
 
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  } else {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if(error.response.status === 401 || error.status === 401) {
    logOut();
    window.location.href = '/login';
  }
  return Promise.reject(error);
})