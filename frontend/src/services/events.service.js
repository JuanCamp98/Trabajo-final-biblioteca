import { ENDPOINTS } from '../constants/endpoints';
import { api, getData } from './api';

export const eventsService = {
  list: (params = {}) => getData(api.get(ENDPOINTS.EVENTOS, { params })),
};
