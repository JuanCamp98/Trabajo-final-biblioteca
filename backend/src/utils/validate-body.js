import { AppError } from './app-error.js';
import { HTTP_STATUS } from '../constants/http-status.js';
import { MESSAGES } from '../constants/messages.js';

function isEmpty(value) {
  return value === undefined || value === null || (typeof value === 'string' && value.trim() === '');
}

function fail(message) {
  throw new AppError(HTTP_STATUS.BAD_REQUEST, message);
}

export function validateBody(body, rules) {
  const source = body || {};
  const clean = {};

  for (const [field, rule] of Object.entries(rules)) {
    const value = source[field];

    if (isEmpty(value)) {
      if (rule.required) fail(MESSAGES.FIELD_REQUIRED(rule.label));
      clean[field] = null;
      continue;
    }

    if (rule.type === 'integer') {
      const number = Number(value);
      if (!Number.isInteger(number)) fail(MESSAGES.FIELD_INTEGER(rule.label));
      if (rule.min !== undefined && number < rule.min) fail(MESSAGES.FIELD_MIN(rule.label, rule.min));
      if (rule.max !== undefined && number > rule.max) fail(MESSAGES.FIELD_MAX(rule.label, rule.max));
      clean[field] = number;
    } else {
      const text = String(value).trim();
      if (rule.max !== undefined && text.length > rule.max) {
        fail(MESSAGES.FIELD_TOO_LONG(rule.label, rule.max));
      }
      clean[field] = text;
    }
  }

  return clean;
}
