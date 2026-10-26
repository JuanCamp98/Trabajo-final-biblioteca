import { EntitySchema } from 'typeorm';
import { ENTITIES } from '../constants/resources.js';

export const AuthorSchema = new EntitySchema({
  name: ENTITIES.AUTHOR,
  tableName: 'autores',
  columns: {
    id: { type: Number, primary: true, generated: true },
    nombre: { type: String },
    apellido: { type: String },
    createdAt: { type: 'datetime', createDate: true },
  },
  relations: {
    libros: { type: 'one-to-many', target: ENTITIES.BOOK, inverseSide: 'autor' },
  },
});
