import axios from 'axios';
import { API_BASE_URL } from 'shared/appConstants';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/vnd.providesk; version=1',
    'Content-Type': 'application/json',
  },
});
