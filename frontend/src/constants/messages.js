export const MESSAGES = {
  LOAD_ERROR: 'No se pudieron cargar los datos.',
  SAVE_ERROR: 'No se pudo guardar el registro.',
  DELETE_ERROR: 'No se pudo eliminar el registro.',
  LOGIN_ERROR: 'No se pudo iniciar sesión.',
  CREATED: 'Registro creado correctamente.',
  UPDATED: 'Registro actualizado correctamente.',
  DELETED: 'Registro eliminado correctamente.',
  CONFIRM_DELETE: (name) => `¿Eliminar "${name}"? Esta acción no se puede deshacer.`,
  CONFIRM_LOGOUT: '¿Querés cerrar la sesión?',
};

export const VALIDATION_MESSAGES = {
  REQUIRED: 'Este campo es obligatorio.',
  MAX_LENGTH: (max) => `No puede superar los ${max} caracteres.`,
  USERNAME_REQUIRED: 'Ingresá tu usuario.',
  PASSWORD_REQUIRED: 'Ingresá tu contraseña.',
  TITLE_REQUIRED: 'Ingresá el título del libro.',
  YEAR_REQUIRED: 'Ingresá el año de publicación.',
  YEAR_INVALID: 'Ingresá un año válido (número entero).',
  YEAR_MIN: (min) => `El año no puede ser menor que ${min}.`,
  YEAR_MAX: (max) => `El año no puede ser mayor que ${max}.`,
  AUTHOR_REQUIRED: 'Seleccioná un autor.',
  GENRE_REQUIRED: 'Seleccioná un género.',
  SHELF_REQUIRED: 'Seleccioná un estante.',
};
