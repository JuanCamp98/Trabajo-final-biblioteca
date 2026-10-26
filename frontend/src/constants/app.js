export const LOCALE = 'es-AR';
export const DEBOUNCE_MS = 400;

export const MIN_YEAR = 1;
export const MAX_YEAR = new Date().getFullYear() + 1;

export const NOTICE_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
};

export const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
};

export const LOG_TYPES = {
  EVENT: 'event',
  HTTP: 'http',
  ERROR: 'error',
  AUTH: 'auth',
};

export const FIELD_LIMITS = {
  USERNAME: 80,
  PASSWORD: 200,
  TITLE: 200,
  ISBN: 30,
  SHORT_TEXT: 150,
  DESCRIPTION: 1000,
};

export const EMPTY_BOOK_FILTERS = {
  q: '',
  genero: '',
  autor: '',
  anio: '',
};

export const EMPTY_CATALOG_OPTIONS = {
  authors: [],
  genres: [],
  shelves: [],
  sagas: [],
};
