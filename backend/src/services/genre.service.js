import { GENRE_RULES } from '../constants/field-rules.js';
import { ENTITIES, RESOURCES } from '../constants/resources.js';
import { createCrudService } from './crud.service.js';

export const genreService = createCrudService({
  entity: ENTITIES.GENRE,
  resource: RESOURCES.GENEROS,
  rules: GENRE_RULES,
  label: 'género',
  getName: (genre) => genre.nombre,
});
