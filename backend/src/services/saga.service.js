import { SAGA_RULES } from '../constants/field-rules.js';
import { ENTITIES, RESOURCES } from '../constants/resources.js';
import { createCrudService } from './crud.service.js';

export const sagaService = createCrudService({
  entity: ENTITIES.SAGA,
  resource: RESOURCES.SAGAS,
  rules: SAGA_RULES,
  label: 'saga',
  getName: (saga) => saga.nombre,
});
