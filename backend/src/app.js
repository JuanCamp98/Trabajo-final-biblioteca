import cors from 'cors';
import express from 'express';
import { API_PREFIX, DEFAULTS, JSON_BODY_LIMIT } from './constants/config.js';
import { MESSAGES } from './constants/messages.js';
import { errorHandler, notFoundHandler } from './middlewares/error-handler.js';
import { requestLogger } from './middlewares/request-logger.js';
import routes from './routes/index.js';

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || DEFAULTS.FRONTEND_URL }));
app.use(express.json({ limit: JSON_BODY_LIMIT }));
app.use(requestLogger);

app.get(`${API_PREFIX}/health`, (req, res) => {
  res.json({ success: true, message: MESSAGES.HEALTH_OK });
});

app.use(API_PREFIX, routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
