import { FIELD_LIMITS } from './app';

export const RESOURCE_KEYS = {
  AUTORES: 'autores',
  GENEROS: 'generos',
  SAGAS: 'sagas',
  ESTANTES: 'estantes',
};

export const RESOURCE_CONFIG = {
  [RESOURCE_KEYS.AUTORES]: {
    label: 'Autores',
    singular: 'autor',
    fields: [
      { name: 'nombre', label: 'Nombre', required: true, maxLength: FIELD_LIMITS.SHORT_TEXT },
      { name: 'apellido', label: 'Apellido', required: true, maxLength: FIELD_LIMITS.SHORT_TEXT },
    ],
    getName: (item) => `${item.nombre} ${item.apellido}`,
  },
  [RESOURCE_KEYS.GENEROS]: {
    label: 'Géneros',
    singular: 'género',
    fields: [
      { name: 'nombre', label: 'Nombre', required: true, maxLength: FIELD_LIMITS.SHORT_TEXT },
      { name: 'descripcion', label: 'Descripción', multiline: true, maxLength: FIELD_LIMITS.DESCRIPTION },
    ],
    getName: (item) => item.nombre,
  },
  [RESOURCE_KEYS.SAGAS]: {
    label: 'Sagas',
    singular: 'saga',
    fields: [
      { name: 'nombre', label: 'Nombre', required: true, maxLength: FIELD_LIMITS.SHORT_TEXT },
      { name: 'descripcion', label: 'Descripción', multiline: true, maxLength: FIELD_LIMITS.DESCRIPTION },
    ],
    getName: (item) => item.nombre,
  },
  [RESOURCE_KEYS.ESTANTES]: {
    label: 'Estantes',
    singular: 'estante',
    fields: [
      { name: 'codigo', label: 'Código', required: true, maxLength: FIELD_LIMITS.SHORT_TEXT },
      { name: 'ubicacion', label: 'Ubicación', maxLength: FIELD_LIMITS.SHORT_TEXT },
      { name: 'descripcion', label: 'Descripción', multiline: true, maxLength: FIELD_LIMITS.DESCRIPTION },
    ],
    getName: (item) => item.codigo,
  },
};
