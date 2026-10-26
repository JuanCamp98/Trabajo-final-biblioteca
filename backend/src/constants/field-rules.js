import { MIN_BOOK_YEAR } from './config.js';


export const LOGIN_RULES = {
  username: { label: 'usuario', type: 'string', required: true, max: 80 },
  password: { label: 'contraseña', type: 'string', required: true, max: 200 },
};

export const AUTHOR_RULES = {
  nombre: { label: 'nombre', type: 'string', required: true, max: 120 },
  apellido: { label: 'apellido', type: 'string', required: true, max: 120 },
};

export const GENRE_RULES = {
  nombre: { label: 'nombre', type: 'string', required: true, max: 100 },
  descripcion: { label: 'descripción', type: 'string', max: 1000 },
};

export const SAGA_RULES = {
  nombre: { label: 'nombre', type: 'string', required: true, max: 150 },
  descripcion: { label: 'descripción', type: 'string', max: 1000 },
};

export const SHELF_RULES = {
  codigo: { label: 'código', type: 'string', required: true, max: 40 },
  ubicacion: { label: 'ubicación', type: 'string', max: 150 },
  descripcion: { label: 'descripción', type: 'string', max: 1000 },
};

export const BOOK_RULES = {
  titulo: { label: 'título', type: 'string', required: true, max: 200 },
  anioPublicacion: {
    label: 'año de publicación',
    type: 'integer',
    required: true,
    min: MIN_BOOK_YEAR,
    max: new Date().getFullYear() + 1,
  },
  isbn: { label: 'ISBN', type: 'string', max: 30 },
  descripcion: { label: 'descripción', type: 'string', max: 1000 },
  autorId: { label: 'autor', type: 'integer', required: true, min: 1 },
  generoId: { label: 'género', type: 'integer', required: true, min: 1 },
  estanteId: { label: 'estante', type: 'integer', required: true, min: 1 },
  sagaId: { label: 'saga', type: 'integer', min: 1 },
};
