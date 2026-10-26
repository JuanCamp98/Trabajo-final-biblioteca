import { AppDataSource } from '../config/data-source.js';
import { logger } from '../config/logger.js';
import { HTTP_STATUS } from '../constants/http-status.js';
import { LOG_TYPES } from '../constants/log-levels.js';
import { MESSAGES } from '../constants/messages.js';
import { AppError } from '../utils/app-error.js';
import { validateBody } from '../utils/validate-body.js';

export function createCrudService({ entity, resource, rules, label, getName }) {
  const repository = () => AppDataSource.getRepository(entity);

  async function get(id) {
    const record = await repository().findOneBy({ id });
    if (!record) throw new AppError(HTTP_STATUS.NOT_FOUND, MESSAGES.RECORD_NOT_FOUND);
    return record;
  }

  return {
    list: () => repository().find({ order: { id: 'ASC' } }),

    get,

    async create(body) {
      const data = validateBody(body, rules);
      const saved = await repository().save(repository().create(data));
      logger.info(MESSAGES.RECORD_CREATED(label, getName(saved)), {
        type: LOG_TYPES.EVENT,
        resource,
        recordId: saved.id,
      });
      return saved;
    },

    async update(id, body) {
      const current = await get(id);
      const data = validateBody(body, rules);
      repository().merge(current, data);
      const saved = await repository().save(current);
      logger.info(MESSAGES.RECORD_UPDATED(label, getName(saved)), {
        type: LOG_TYPES.EVENT,
        resource,
        recordId: id,
      });
      return saved;
    },

    async remove(id) {
      const current = await get(id);
      const name = getName(current);
      await repository().remove(current);
      logger.info(MESSAGES.RECORD_DELETED_LOG(label, name), {
        type: LOG_TYPES.EVENT,
        resource,
        recordId: id,
      });
    },
  };
}
