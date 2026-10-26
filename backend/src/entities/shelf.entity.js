import { EntitySchema } from 'typeorm';
import { ENTITIES } from '../constants/resources.js';

export const ShelfSchema = new EntitySchema({
  name: ENTITIES.SHELF,
  tableName: 'estantes',
  columns: {
    id: { type: Number, primary: true, generated: true },
    codigo: { type: String, unique: true },
    ubicacion: { type: String, nullable: true },
    descripcion: { type: String, nullable: true },
    createdAt: { type: 'datetime', createDate: true },
  },
  relations: {
    libros: { type: 'one-to-many', target: ENTITIES.BOOK, inverseSide: 'estante' },
  },
});
