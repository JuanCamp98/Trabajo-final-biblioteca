import { EMPTY_CATALOG_OPTIONS } from '../constants/app';
import {
  authorsService,
  genresService,
  sagasService,
  shelvesService,
} from '../services/library.service';
import { useAsync } from './useAsync';

export function useCatalogOptions() {
  const { data, loading, error } = useAsync(
    async () => {
      const [authors, genres, shelves, sagas] = await Promise.all([
        authorsService.list(),
        genresService.list(),
        shelvesService.list(),
        sagasService.list(),
      ]);
      return { authors, genres, shelves, sagas };
    },
    [],
    EMPTY_CATALOG_OPTIONS
  );

  return { options: data, loading, error };
}
