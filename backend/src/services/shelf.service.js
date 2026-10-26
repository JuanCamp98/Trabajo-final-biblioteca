import { SHELF_RULES } from '../constants/field-rules.js';
import { ENTITIES, RESOURCES } from '../constants/resources.js';
import { createCrudService } from './crud.service.js';

export const shelfService = createCrudService({
  entity: ENTITIES.SHELF,
  resource: RESOURCES.ESTANTES,
  rules: SHELF_RULES,
  label: 'estante',
  getName: (shelf) => shelf.codigo,
});
