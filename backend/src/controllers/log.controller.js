import { getLogs } from '../services/log.service.js';
import { asyncHandler } from '../utils/async-handler.js';

export const listLogs = asyncHandler(async (req, res) => {
  const data = await getLogs(req.query);
  res.json({ success: true, data });
});
