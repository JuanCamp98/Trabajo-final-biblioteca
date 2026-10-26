import fs from 'node:fs';
import path from 'node:path';
import winston from 'winston';
import { LOGS } from '../constants/config.js';
import { LOG_LEVELS } from '../constants/log-levels.js';

const logsDir = path.resolve(LOGS.DIR);
export const LOG_FILE_PATH = path.join(logsDir, LOGS.FILE);
fs.mkdirSync(logsDir, { recursive: true });

const isProduction = process.env.NODE_ENV === 'production';

export const logger = winston.createLogger({
  level: isProduction ? LOG_LEVELS.INFO : LOG_LEVELS.DEBUG,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: LOG_FILE_PATH }),
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  ],
});
