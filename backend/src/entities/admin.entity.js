import { EntitySchema } from 'typeorm';
import { ENTITIES } from '../constants/resources.js';

export const AdminSchema = new EntitySchema({
  name: ENTITIES.ADMIN,
  tableName: 'administradores',
  columns: {
    id: { type: Number, primary: true, generated: true },
    username: { type: String, unique: true },
    passwordHash: { type: String },
  },
});
