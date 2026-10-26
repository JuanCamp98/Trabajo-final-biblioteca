import axios from 'axios';
import { DEFAULT_API_URL, AUTH_HEADER_PREFIX, HTTP_STATUS } from '../constants/http';
import { ENDPOINTS } from '../constants/endpoints';
import { ROUTES } from '../constants/routes';
import { STORAGE_KEYS } from '../constants/storage';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || DEFAULT_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  if (token) config.headers.Authorization = `${AUTH_HEADER_PREFIX}${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url?.includes(ENDPOINTS.LOGIN);

    if (error.response?.status === HTTP_STATUS.UNAUTHORIZED && !isLoginRequest) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.ADMIN);
      if (window.location.pathname !== ROUTES.LOGIN) window.location.href = ROUTES.LOGIN;
    }

    return Promise.reject(error);
  }
);

export const getData = (promise) => promise.then((response) => response.data.data);
