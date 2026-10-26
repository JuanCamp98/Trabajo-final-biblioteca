import { Router } from 'express';
import { RESOURCES } from '../constants/resources.js';
import { login, me } from '../controllers/auth.controller.js';
import { createCrudController } from '../controllers/crud.controller.js';
import { listLogs } from '../controllers/log.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { authorService } from '../services/author.service.js';
import { bookService } from '../services/book.service.js';
import { genreService } from '../services/genre.service.js';
import { sagaService } from '../services/saga.service.js';
import { shelfService } from '../services/shelf.service.js';
import { buildCrudRouter } from './crud.router.js';

const router = Router();

router.post('/auth/login', login);

router.use(authenticateToken);

router.get('/auth/me', me);
router.get('/events', listLogs);

router.use(`/${RESOURCES.LIBROS}`, buildCrudRouter(createCrudController(bookService)));
router.use(`/${RESOURCES.AUTORES}`, buildCrudRouter(createCrudController(authorService)));
router.use(`/${RESOURCES.GENEROS}`, buildCrudRouter(createCrudController(genreService)));
router.use(`/${RESOURCES.SAGAS}`, buildCrudRouter(createCrudController(sagaService)));
router.use(`/${RESOURCES.ESTANTES}`, buildCrudRouter(createCrudController(shelfService)));

export default router;
