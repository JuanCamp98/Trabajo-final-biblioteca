import * as authService from '../services/auth.service.js';
import { asyncHandler } from '../utils/async-handler.js';

export const login = asyncHandler(async (req, res) => {
  const data = await authService.login(req.body);
  res.json({ success: true, data });
});

export const me = (req, res) => {
  res.json({ success: true, data: { username: req.admin.username } });
};
