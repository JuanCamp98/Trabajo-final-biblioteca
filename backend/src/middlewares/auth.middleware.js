import jwt from 'jsonwebtoken';
import { BEARER_PREFIX } from '../constants/config.js';
import { HTTP_STATUS } from '../constants/http-status.js';
import { MESSAGES } from '../constants/messages.js';
import { AppError } from '../utils/app-error.js';

export function authenticateToken(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith(BEARER_PREFIX) ? header.slice(BEARER_PREFIX.length) : null;

  if (!token) {
    return next(new AppError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.UNAUTHORIZED));
  }

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    return next(new AppError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.UNAUTHORIZED));
  }
}
