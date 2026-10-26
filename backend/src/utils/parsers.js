import { AppError } from './app-error.js';
import { HTTP_STATUS } from '../constants/http-status.js';
import { MESSAGES } from '../constants/messages.js';

export function parseId(value) {
  const id = Number(value);
  if (!Number.isInteger(id) || id < 1) {
    throw new AppError(HTTP_STATUS.BAD_REQUEST, MESSAGES.INVALID_ID);
  }
  return id;
}

export function parseOptionalInteger(value, label) {
  if (value === undefined || value === null || value === '') return undefined;
  const number = Number(value);
  if (!Number.isInteger(number)) {
    throw new AppError(HTTP_STATUS.BAD_REQUEST, MESSAGES.FIELD_INTEGER(label));
  }
  return number;
}
