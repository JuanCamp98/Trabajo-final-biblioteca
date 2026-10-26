export const DETAIL_LABELS = {
  resource: 'Sección',
  recordId: 'Registro n.º',
  method: 'Método',
  path: 'Ruta',
  status: 'Código de respuesta',
  detail: 'Motivo',
};

export const RESOURCE_NAMES = {
  libros: 'Libros',
  autores: 'Autores',
  generos: 'Géneros',
  sagas: 'Sagas',
  estantes: 'Estantes',
  events: 'Eventos',
};

export const ACTION_BY_METHOD = {
  GET: 'Consulta',
  POST: 'Alta',
  PUT: 'Modificación',
  DELETE: 'Baja',
};

export const STATUS_TEXTS = [
  { maxStatus: 299, text: 'correcto' },
  { maxStatus: 399, text: 'sin cambios' },
  { maxStatus: 499, text: 'rechazado' },
  { maxStatus: 599, text: 'error del servidor' },
];

export const REQUEST_TEXTS = {
  message: (action, section) => `${action} en la sección ${section}`,
  record: (id) => `Registro n.º ${id}`,
  result: (status, text) => `Resultado: ${text} (${status})`,
  time: (ms) => `Tiempo de respuesta: ${ms} ms`,
};

export const DETAIL_SEPARATOR = ' · ';
