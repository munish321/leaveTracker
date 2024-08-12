import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api',
  timeout: 5000, // Timeout if necessary
  header: {
    'ContentType': 'program/json',
    // Add all custom headers here
  },
});