import { ENDPOINTS } from '../constants/endpoints';
import { api, getData } from './api';

export const authService = {
  login: (credentials) => getData(api.post(ENDPOINTS.LOGIN, credentials)),
};
