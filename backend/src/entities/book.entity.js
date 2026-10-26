import { EntitySchema } from 'typeorm';
import { ENTITIES } from '../constants/resources.js';

export const BookSchema = new EntitySchema({
  name: ENTITIES.BOOK,
  tableName: 'libros',
  columns: {
    id: { type: Number, primary: true, generated: true },
    titulo: { type: String },
    anioPublicacion: { type: Number },
    isbn: { type: String, nullable: true },
    descripcion: { type: String, nullable: true },
    createdAt: { type: 'datetime', createDate: true },
  },
  relations: {
    autor: {
      type: 'many-to-one',
      target: ENTITIES.AUTHOR,
      inverseSide: 'libros',
      nullable: false,
      eager: true,
      onDelete: 'RESTRICT',
    },
    genero: {
      type: 'many-to-one',
      target: ENTITIES.GENRE,
      inverseSide: 'libros',
      nullable: false,
      eager: true,
      onDelete: 'RESTRICT',
    },
    estante: {
      type: 'many-to-one',
      target: ENTITIES.SHELF,
      inverseSide: 'libros',
      nullable: false,
      eager: true,
      onDelete: 'RESTRICT',
    },
    saga: {
      type: 'many-to-one',
      target: ENTITIES.SAGA,
      inverseSide: 'libros',
      nullable: true,
      eager: true,
      onDelete: 'SET NULL',
    },
  },
});
