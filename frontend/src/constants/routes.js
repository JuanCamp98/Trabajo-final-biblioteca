export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  LIBROS: '/libros',
  LIBRO_DETALLE: '/libros/:id',
  AUTORES: '/autores',
  GENEROS: '/generos',
  SAGAS: '/sagas',
  ESTANTES: '/estantes',
  EVENTOS: '/eventos',
  NOT_FOUND: '*',
};

export const getBookDetailPath = (id) => `/libros/${id}`;
