import { api, getData } from './api';

export function createCrudService(endpoint) {
  return {
    list: (params = {}) => getData(api.get(endpoint, { params })),
    get: (id) => getData(api.get(`${endpoint}/${id}`)),
    create: (data) => getData(api.post(endpoint, data)),
    update: (id, data) => getData(api.put(`${endpoint}/${id}`, data)),
    remove: (id) => api.delete(`${endpoint}/${id}`),
  };
}
