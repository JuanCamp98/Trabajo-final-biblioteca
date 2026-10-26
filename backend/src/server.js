import 'dotenv/config';
import { AppDataSource } from './config/data-source.js';
import { logger } from './config/logger.js';
import { DEFAULTS, JWT_SECRET_MIN_LENGTH } from './constants/config.js';
import { MESSAGES } from './constants/messages.js';
import app from './app.js';
import { ensureAdmin } from './services/auth.service.js';

async function start() {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < JWT_SECRET_MIN_LENGTH) {
    throw new Error(MESSAGES.ENV_JWT_SECRET(JWT_SECRET_MIN_LENGTH));
  }

  await AppDataSource.initialize();
  await ensureAdmin();

  const port = process.env.PORT || DEFAULTS.PORT;
  app.listen(port, () => logger.info(MESSAGES.SERVER_RUNNING(port)));
}

start().catch((error) => {
  logger.error(MESSAGES.SERVER_START_ERROR, { stack: error.stack, detail: error.message });
  process.exit(1);
});
