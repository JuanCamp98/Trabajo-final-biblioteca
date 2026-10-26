import { AUTHOR_RULES } from '../constants/field-rules.js';
import { ENTITIES, RESOURCES } from '../constants/resources.js';
import { createCrudService } from './crud.service.js';

export const authorService = createCrudService({
  entity: ENTITIES.AUTHOR,
  resource: RESOURCES.AUTORES,
  rules: AUTHOR_RULES,
  label: 'autor',
  getName: (author) => `${author.nombre} ${author.apellido}`,
});
