import * as yup from 'yup';
import { FIELD_LIMITS, MAX_YEAR, MIN_YEAR } from '../constants/app';
import { VALIDATION_MESSAGES as MSG } from '../constants/messages';

const emptyToUndefined = (value, originalValue) => (originalValue === '' ? undefined : value);

const numberField = () => yup.number().transform(emptyToUndefined);

export const loginSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required(MSG.USERNAME_REQUIRED)
    .max(FIELD_LIMITS.USERNAME, MSG.MAX_LENGTH(FIELD_LIMITS.USERNAME)),
  password: yup
    .string()
    .required(MSG.PASSWORD_REQUIRED)
    .max(FIELD_LIMITS.PASSWORD, MSG.MAX_LENGTH(FIELD_LIMITS.PASSWORD)),
});

export function buildResourceSchema(fields) {
  const shape = {};

  fields.forEach((field) => {
    let rule = yup.string().trim().max(field.maxLength, MSG.MAX_LENGTH(field.maxLength));
    if (field.required) rule = rule.required(MSG.REQUIRED);
    shape[field.name] = rule;
  });

  return yup.object(shape);
}

export const bookSchema = yup.object({
  titulo: yup
    .string()
    .trim()
    .required(MSG.TITLE_REQUIRED)
    .max(FIELD_LIMITS.TITLE, MSG.MAX_LENGTH(FIELD_LIMITS.TITLE)),
  anioPublicacion: numberField()
    .typeError(MSG.YEAR_INVALID)
    .integer(MSG.YEAR_INVALID)
    .min(MIN_YEAR, MSG.YEAR_MIN(MIN_YEAR))
    .max(MAX_YEAR, MSG.YEAR_MAX(MAX_YEAR))
    .required(MSG.YEAR_REQUIRED),
  isbn: yup.string().trim().max(FIELD_LIMITS.ISBN, MSG.MAX_LENGTH(FIELD_LIMITS.ISBN)),
  descripcion: yup
    .string()
    .trim()
    .max(FIELD_LIMITS.DESCRIPTION, MSG.MAX_LENGTH(FIELD_LIMITS.DESCRIPTION)),
  autorId: numberField().typeError(MSG.AUTHOR_REQUIRED).required(MSG.AUTHOR_REQUIRED),
  generoId: numberField().typeError(MSG.GENRE_REQUIRED).required(MSG.GENRE_REQUIRED),
  estanteId: numberField().typeError(MSG.SHELF_REQUIRED).required(MSG.SHELF_REQUIRED),
  sagaId: numberField().nullable(),
});
