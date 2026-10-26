import 'dotenv/config';
import { AppDataSource } from './config/data-source.js';
import { ENTITIES } from './constants/resources.js';

await AppDataSource.initialize();

const repo = (entity) => AppDataSource.getRepository(entity);

if ((await repo(ENTITIES.BOOK).count()) > 0) {
  console.log('Ya hay libros cargados: no se agregan datos de ejemplo.');
  await AppDataSource.destroy();
  process.exit(0);
}

const save = (entity, data) => repo(entity).save(repo(entity).create(data));

const garciaMarquez = await save(ENTITIES.AUTHOR, { nombre: 'Gabriel', apellido: 'García Márquez' });
const borges = await save(ENTITIES.AUTHOR, { nombre: 'Jorge Luis', apellido: 'Borges' });
const tolkien = await save(ENTITIES.AUTHOR, { nombre: 'J. R. R.', apellido: 'Tolkien' });

const novela = await save(ENTITIES.GENRE, { nombre: 'Novela', descripcion: 'Narrativa extensa' });
const cuento = await save(ENTITIES.GENRE, { nombre: 'Cuento', descripcion: 'Narrativa breve' });
const fantasia = await save(ENTITIES.GENRE, { nombre: 'Fantasía', descripcion: 'Mundos imaginarios' });

const estanteA = await save(ENTITIES.SHELF, { codigo: 'A-01', ubicacion: 'Sala principal' });
const estanteB = await save(ENTITIES.SHELF, { codigo: 'B-02', ubicacion: 'Sala de lectura' });

const anillos = await save(ENTITIES.SAGA, { nombre: 'El Señor de los Anillos' });

const libros = [
  { titulo: 'Cien años de soledad', anioPublicacion: 1967, autor: garciaMarquez, genero: novela, estante: estanteA },
  { titulo: 'El Aleph', anioPublicacion: 1949, autor: borges, genero: cuento, estante: estanteB },
  { titulo: 'La Comunidad del Anillo', anioPublicacion: 1954, autor: tolkien, genero: fantasia, estante: estanteB, saga: anillos },
  { titulo: 'Las dos torres', anioPublicacion: 1954, autor: tolkien, genero: fantasia, estante: estanteB, saga: anillos },
  { titulo: 'El retorno del rey', anioPublicacion: 1955, autor: tolkien, genero: fantasia, estante: estanteB, saga: anillos },
];
for (const libro of libros) await save(ENTITIES.BOOK, libro);

console.log('Datos de ejemplo cargados correctamente.');
await AppDataSource.destroy();
