import { HTTP_STATUS } from '../constants/http-status.js';
import { MESSAGES } from '../constants/messages.js';
import { asyncHandler } from '../utils/async-handler.js';
import { parseId } from '../utils/parsers.js';

export function createCrudController(service) {
  return {
    list: asyncHandler(async (req, res) => {
      const data = await service.list(req.query);
      res.json({ success: true, data });
    }),

    get: asyncHandler(async (req, res) => {
      const data = await service.get(parseId(req.params.id));
      res.json({ success: true, data });
    }),

    create: asyncHandler(async (req, res) => {
      const data = await service.create(req.body);
      res.status(HTTP_STATUS.CREATED).json({ success: true, data });
    }),

    update: asyncHandler(async (req, res) => {
      const data = await service.update(parseId(req.params.id), req.body);
      res.json({ success: true, data });
    }),

    remove: asyncHandler(async (req, res) => {
      await service.remove(parseId(req.params.id));
      res.json({ success: true, message: MESSAGES.RECORD_DELETED });
    }),
  };
}
