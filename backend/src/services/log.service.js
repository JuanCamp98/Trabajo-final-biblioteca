import fs from 'node:fs';
import { LOG_FILE_PATH } from '../config/logger.js';
import { LOGS } from '../constants/config.js';
import { HTTP_STATUS } from '../constants/http-status.js';
import { LOG_TYPES, VALID_LOG_LEVELS, VALID_LOG_TYPES } from '../constants/log-levels.js';
import {
  ACTION_BY_METHOD,
  DETAIL_LABELS,
  DETAIL_SEPARATOR,
  REQUEST_TEXTS,
  RESOURCE_NAMES,
  STATUS_TEXTS,
} from '../constants/log-detail.js';
import { MESSAGES } from '../constants/messages.js';
import { AppError } from '../utils/app-error.js';
import { parseOptionalInteger } from '../utils/parsers.js';

function getStatusText(status) {
  return STATUS_TEXTS.find(({ maxStatus }) => status <= maxStatus)?.text;
}

function formatHttpLog(extra, message) {
  const { method, path, status, durationMs } = extra;
  const route = typeof path === 'string' ? path.split('?')[0] : '';
  const segments = route.split('/').filter(Boolean);
  const resource = segments[1];
  const recordId = /^\d+$/.test(segments[2] || '') ? segments[2] : undefined;
  const action = ACTION_BY_METHOD[method];
  const section = RESOURCE_NAMES[resource];
  const statusText = getStatusText(status);
  const detail = [
    section && action && recordId ? REQUEST_TEXTS.record(recordId) : null,
    REQUEST_TEXTS.result(status, statusText),
    REQUEST_TEXTS.time(durationMs),
  ]
    .filter(Boolean)
    .join(DETAIL_SEPARATOR);

  return {
    message: section && action ? REQUEST_TEXTS.message(action, section) : message,
    detail,
  };
}

function parseLine(line) {
  try {
    const { timestamp, level, message, type, stack, ...extra } = JSON.parse(line);
    if (type === LOG_TYPES.HTTP) {
      const formatted = formatHttpLog(extra, message);
      return { timestamp, level, type, ...formatted };
    }

    const detail = Object.entries(extra)
      .map(([key, value]) => {
        const label = DETAIL_LABELS[key] || key;
        const displayValue = key === 'resource' ? RESOURCE_NAMES[value] || value : value;
        return `${label}: ${displayValue}`;
      })
      .join(DETAIL_SEPARATOR);
    return { timestamp, level, type, message, detail };
  } catch {
    return null;
  }
}

export async function getLogs(query = {}) {
  const level = query.level || undefined;
  if (level && !VALID_LOG_LEVELS.includes(level)) {
    throw new AppError(HTTP_STATUS.BAD_REQUEST, MESSAGES.INVALID_LOG_LEVEL);
  }
  const type = query.type || undefined;
  if (type && !VALID_LOG_TYPES.includes(type)) {
    throw new AppError(HTTP_STATUS.BAD_REQUEST, MESSAGES.INVALID_LOG_TYPE);
  }

  const requested = parseOptionalInteger(query.limit, 'límite') || LOGS.DEFAULT_LIMIT;
  const limit = Math.min(Math.max(requested, 1), LOGS.MAX_LIMIT);

  if (!fs.existsSync(LOG_FILE_PATH)) return [];

  const content = await fs.promises.readFile(LOG_FILE_PATH, 'utf-8');
  const events = content.split('\n').filter(Boolean).map(parseLine).filter(Boolean);
  const filtered = events.filter((event) => {
    return (!level || event.level === level) && (!type || event.type === type);
  });

  return filtered.slice(-limit).reverse();
}
