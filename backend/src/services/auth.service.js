import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/data-source.js';
import { logger } from '../config/logger.js';
import { BCRYPT_SALT_ROUNDS, DEFAULTS } from '../constants/config.js';
import { LOGIN_RULES } from '../constants/field-rules.js';
import { HTTP_STATUS } from '../constants/http-status.js';
import { LOG_TYPES } from '../constants/log-levels.js';
import { MESSAGES } from '../constants/messages.js';
import { ENTITIES } from '../constants/resources.js';
import { AppError } from '../utils/app-error.js';
import { validateBody } from '../utils/validate-body.js';

const adminRepository = () => AppDataSource.getRepository(ENTITIES.ADMIN);

export async function ensureAdmin() {
  if ((await adminRepository().count()) > 0) return;

  const username = process.env.ADMIN_USERNAME || DEFAULTS.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error(MESSAGES.ENV_ADMIN_PASSWORD);

  const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  await adminRepository().save(adminRepository().create({ username, passwordHash }));
  logger.info(MESSAGES.ADMIN_CREATED(username));
}

export async function login(body) {
  const { username, password } = validateBody(body, LOGIN_RULES);

  const admin = await adminRepository().findOneBy({ username });
  const passwordIsValid = admin ? await bcrypt.compare(password, admin.passwordHash) : false;

  if (!passwordIsValid) {
    logger.warn(MESSAGES.LOGIN_FAILED(username), { type: LOG_TYPES.AUTH });
    throw new AppError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.INVALID_CREDENTIALS);
  }

  const token = jwt.sign({ sub: admin.id, username: admin.username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || DEFAULTS.JWT_EXPIRES_IN,
  });

  logger.info(MESSAGES.LOGIN_OK(username), { type: LOG_TYPES.AUTH });
  return { token, user: { username: admin.username } };
}
