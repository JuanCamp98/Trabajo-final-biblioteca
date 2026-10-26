import { LABELS } from '../constants/labels';
import { MAX_YEAR, MIN_YEAR } from '../constants/app';
import { getAuthorName } from '../utils/formatters';

const TEXTS = LABELS.BOOKS.FILTERS;

export default function BookFilters({ filters, authors, genres, onChange, onClear }) {
  return (
    <section className="panel filter-panel">
      <label>
        {TEXTS.SEARCH}
        <input name="q" value={filters.q} onChange={onChange} />
      </label>

      <label>
        {TEXTS.GENRE}
        <select name="genero" value={filters.genero} onChange={onChange}>
          <option value="">{TEXTS.ALL_GENRES}</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.nombre}
            </option>
          ))}
        </select>
      </label>

      <label>
        {TEXTS.AUTHOR}
        <select name="autor" value={filters.autor} onChange={onChange}>
          <option value="">{TEXTS.ALL_AUTHORS}</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {getAuthorName(author)}
            </option>
          ))}
        </select>
      </label>

      <label>
        {TEXTS.YEAR}
        <input
          type="number"
          name="anio"
          value={filters.anio}
          onChange={onChange}
          min={MIN_YEAR}
          max={MAX_YEAR}
        />
      </label>

      <button type="button" className="button secondary" onClick={onClear}>
        {TEXTS.CLEAR}
      </button>
    </section>
  );
}
