import { AppDataSource } from '../config/data-source.js';
import { logger } from '../config/logger.js';
import { BOOK_RULES } from '../constants/field-rules.js';
import { HTTP_STATUS } from '../constants/http-status.js';
import { LOG_TYPES } from '../constants/log-levels.js';
import { MESSAGES } from '../constants/messages.js';
import { ENTITIES, RESOURCES } from '../constants/resources.js';
import { AppError } from '../utils/app-error.js';
import { parseOptionalInteger } from '../utils/parsers.js';
import { validateBody } from '../utils/validate-body.js';

const bookRepository = () => AppDataSource.getRepository(ENTITIES.BOOK);

async function findRelated(entity, id, label) {
  const record = await AppDataSource.getRepository(entity).findOneBy({ id });
  if (!record) throw new AppError(HTTP_STATUS.BAD_REQUEST, MESSAGES.RELATION_NOT_FOUND(label));
  return record;
}

async function buildBookData(body) {
  const data = validateBody(body, BOOK_RULES);

  return {
    titulo: data.titulo,
    anioPublicacion: data.anioPublicacion,
    isbn: data.isbn,
    descripcion: data.descripcion,
    autor: await findRelated(ENTITIES.AUTHOR, data.autorId, BOOK_RULES.autorId.label),
    genero: await findRelated(ENTITIES.GENRE, data.generoId, BOOK_RULES.generoId.label),
    estante: await findRelated(ENTITIES.SHELF, data.estanteId, BOOK_RULES.estanteId.label),
    saga: data.sagaId ? await findRelated(ENTITIES.SAGA, data.sagaId, BOOK_RULES.sagaId.label) : null,
  };
}

async function list(query = {}) {
  const genero = parseOptionalInteger(query.genero, 'género');
  const autor = parseOptionalInteger(query.autor, 'autor');
  const anio = parseOptionalInteger(query.anio, 'año de publicación');
  const text = typeof query.q === 'string' ? query.q.trim() : '';

  const queryBuilder = bookRepository()
    .createQueryBuilder('libro')
    .leftJoinAndSelect('libro.autor', 'autor')
    .leftJoinAndSelect('libro.genero', 'genero')
    .leftJoinAndSelect('libro.estante', 'estante')
    .leftJoinAndSelect('libro.saga', 'saga')
    .orderBy('libro.titulo', 'ASC');

  if (genero !== undefined) queryBuilder.andWhere('genero.id = :genero', { genero });
  if (autor !== undefined) queryBuilder.andWhere('autor.id = :autor', { autor });
  if (anio !== undefined) queryBuilder.andWhere('libro.anioPublicacion = :anio', { anio });
  if (text) queryBuilder.andWhere('libro.titulo LIKE :text', { text: `%${text}%` });

  return queryBuilder.getMany();
}

async function get(id) {
  const book = await bookRepository().findOne({ where: { id } });
  if (!book) throw new AppError(HTTP_STATUS.NOT_FOUND, MESSAGES.RECORD_NOT_FOUND);
  return book;
}

async function create(body) {
  const data = await buildBookData(body);
  const saved = await bookRepository().save(bookRepository().create(data));
  logger.info(MESSAGES.RECORD_CREATED('libro', saved.titulo), {
    type: LOG_TYPES.EVENT,
    resource: RESOURCES.LIBROS,
    recordId: saved.id,
  });
  return get(saved.id);
}

async function update(id, body) {
  const current = await get(id);
  const data = await buildBookData(body);
  bookRepository().merge(current, data);
  await bookRepository().save(current);
  logger.info(MESSAGES.RECORD_UPDATED('libro', current.titulo), {
    type: LOG_TYPES.EVENT,
    resource: RESOURCES.LIBROS,
    recordId: id,
  });
  return get(id);
}

async function remove(id) {
  const current = await get(id);
  await bookRepository().remove(current);
  logger.info(MESSAGES.RECORD_DELETED_LOG('libro', current.titulo), {
    type: LOG_TYPES.EVENT,
    resource: RESOURCES.LIBROS,
    recordId: id,
  });
}

export const bookService = { list, get, create, update, remove };
