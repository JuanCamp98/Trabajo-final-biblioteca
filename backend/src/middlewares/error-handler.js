import { logger } from '../config/logger.js';
import { HTTP_STATUS } from '../constants/http-status.js';
import { LOG_LEVELS, LOG_TYPES } from '../constants/log-levels.js';
import { MESSAGES } from '../constants/messages.js';
import { AppError } from '../utils/app-error.js';

export function notFoundHandler(req, res, next) {
  next(new AppError(HTTP_STATUS.NOT_FOUND, MESSAGES.ROUTE_NOT_FOUND(req.method, req.originalUrl)));
}

function translateError(err) {
  if (err instanceof AppError) {
    return { status: err.status, message: err.message };
  }

  if (err.type === 'entity.parse.failed') {
    return { status: HTTP_STATUS.BAD_REQUEST, message: MESSAGES.INVALID_JSON };
  }

  const text = err.message || '';
  if (err.code === 'SQLITE_CONSTRAINT' || text.includes('SQLITE_CONSTRAINT')) {
    if (text.includes('UNIQUE')) {
      return { status: HTTP_STATUS.CONFLICT, message: MESSAGES.DUPLICATE_RECORD };
    }
    if (text.includes('FOREIGN KEY')) {
      return { status: HTTP_STATUS.CONFLICT, message: MESSAGES.RECORD_IN_USE };
    }
    return { status: HTTP_STATUS.BAD_REQUEST, message: MESSAGES.VALIDATION_ERROR };
  }

  return { status: HTTP_STATUS.INTERNAL_SERVER_ERROR, message: MESSAGES.SERVER_ERROR };
}

export function errorHandler(err, req, res, next) {
  const { status, message } = translateError(err);

  if (status >= HTTP_STATUS.INTERNAL_SERVER_ERROR) {
    logger.log(LOG_LEVELS.ERROR, message, { type: LOG_TYPES.ERROR, path: req.originalUrl, stack: err.stack });
  } else {
    logger.log(LOG_LEVELS.WARN, message, { type: LOG_TYPES.ERROR, path: req.originalUrl, status });
  }

  res.status(status).json({ success: false, message });
}
