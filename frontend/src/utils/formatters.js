import { LOCALE } from '../constants/app';

export const getAuthorName = (author) => `${author.nombre} ${author.apellido}`;

export const formatDateTime = (isoDate) => new Date(isoDate).toLocaleString(LOCALE);
