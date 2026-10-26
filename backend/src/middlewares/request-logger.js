import { logger } from '../config/logger.js';
import { HTTP_STATUS } from '../constants/http-status.js';
import { LOG_LEVELS, LOG_TYPES } from '../constants/log-levels.js';

export function requestLogger(req, res, next) {
  const startedAt = Date.now();

  res.on('finish', () => {
    const durationMs = Date.now() - startedAt;
    let level = LOG_LEVELS.INFO;
    if (res.statusCode >= HTTP_STATUS.INTERNAL_SERVER_ERROR) level = LOG_LEVELS.ERROR;
    else if (res.statusCode >= HTTP_STATUS.BAD_REQUEST) level = LOG_LEVELS.WARN;

    logger.log(level, `${req.method} ${req.originalUrl} ${res.statusCode} ${durationMs}ms`, {
      type: LOG_TYPES.HTTP,
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      durationMs,
    });
  });

  next();
}
