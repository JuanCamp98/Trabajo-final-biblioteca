import { ENDPOINTS } from '../constants/endpoints';
import { RESOURCE_KEYS } from '../constants/resources';
import { createCrudService } from './crud.service';

export const booksService = createCrudService(ENDPOINTS.LIBROS);
export const authorsService = createCrudService(ENDPOINTS.AUTORES);
export const genresService = createCrudService(ENDPOINTS.GENEROS);
export const sagasService = createCrudService(ENDPOINTS.SAGAS);
export const shelvesService = createCrudService(ENDPOINTS.ESTANTES);

export const RESOURCE_SERVICES = {
  [RESOURCE_KEYS.AUTORES]: authorsService,
  [RESOURCE_KEYS.GENEROS]: genresService,
  [RESOURCE_KEYS.SAGAS]: sagasService,
  [RESOURCE_KEYS.ESTANTES]: shelvesService,
};
