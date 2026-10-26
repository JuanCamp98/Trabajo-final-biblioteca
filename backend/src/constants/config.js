export const API_PREFIX = '/api';
export const BEARER_PREFIX = 'Bearer ';

export const DEFAULTS = {
  PORT: 4000,
  FRONTEND_URL: 'http://localhost:5173',
  DB_DATABASE: './data/biblioteca.sqlite',
  JWT_EXPIRES_IN: '8h',
  ADMIN_USERNAME: 'admin',
};

export const JSON_BODY_LIMIT = '1mb';
export const BCRYPT_SALT_ROUNDS = 10;
export const JWT_SECRET_MIN_LENGTH = 16;
export const MIN_BOOK_YEAR = 1;

export const LOGS = {
  DIR: 'logs',
  FILE: 'application.log',
  DEFAULT_LIMIT: 200,
  MAX_LIMIT: 1000,
};
