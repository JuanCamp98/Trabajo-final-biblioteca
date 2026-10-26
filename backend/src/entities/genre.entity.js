import { EntitySchema } from 'typeorm';
import { ENTITIES } from '../constants/resources.js';

export const GenreSchema = new EntitySchema({
  name: ENTITIES.GENRE,
  tableName: 'generos',
  columns: {
    id: { type: Number, primary: true, generated: true },
    nombre: { type: String, unique: true },
    descripcion: { type: String, nullable: true },
    createdAt: { type: 'datetime', createDate: true },
  },
  relations: {
    libros: { type: 'one-to-many', target: ENTITIES.BOOK, inverseSide: 'genero' },
  },
});
