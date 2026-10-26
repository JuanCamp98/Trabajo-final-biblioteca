import 'reflect-metadata';
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { DataSource } from 'typeorm';
import { DEFAULTS } from '../constants/config.js';
import { AdminSchema } from '../entities/admin.entity.js';
import { AuthorSchema } from '../entities/author.entity.js';
import { GenreSchema } from '../entities/genre.entity.js';
import { SagaSchema } from '../entities/saga.entity.js';
import { ShelfSchema } from '../entities/shelf.entity.js';
import { BookSchema } from '../entities/book.entity.js';

const databasePath = path.resolve(process.env.DB_DATABASE || DEFAULTS.DB_DATABASE);
fs.mkdirSync(path.dirname(databasePath), { recursive: true });

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: databasePath,
  synchronize: true,
  entities: [AdminSchema, AuthorSchema, GenreSchema, SagaSchema, ShelfSchema, BookSchema],
});
