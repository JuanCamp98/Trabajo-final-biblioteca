import { useState } from 'react';
import { Link } from 'react-router-dom';
import AsyncState from '../components/AsyncState';
import BookFilters from '../components/BookFilters';
import BookForm from '../components/BookForm';
import DataTable from '../components/DataTable';
import Notice from '../components/Notice';
import PageHeader from '../components/PageHeader';
import { DEBOUNCE_MS, EMPTY_BOOK_FILTERS, NOTICE_TYPES } from '../constants/app';
import { LABELS } from '../constants/labels';
import { getBookDetailPath } from '../constants/routes';
import { useCatalogOptions } from '../hooks/useCatalogOptions';
import { useCrudPage } from '../hooks/useCrudPage';
import { useDebounce } from '../hooks/useDebounce';
import { booksService } from '../services/library.service';
import { getAuthorName } from '../utils/formatters';
import { removeEmptyValues } from '../utils/params';

const COLUMNS = [
  { header: LABELS.BOOKS.COLUMNS.TITLE, render: (book) => <strong>{book.titulo}</strong> },
  { header: LABELS.BOOKS.COLUMNS.AUTHOR, render: (book) => getAuthorName(book.autor) },
  { header: LABELS.BOOKS.COLUMNS.GENRE, render: (book) => book.genero.nombre },
  { header: LABELS.BOOKS.COLUMNS.YEAR, render: (book) => book.anioPublicacion },
  { header: LABELS.BOOKS.COLUMNS.SHELF, render: (book) => book.estante.codigo },
  { header: LABELS.BOOKS.COLUMNS.SAGA, render: (book) => book.saga?.nombre ?? LABELS.COMMON.NO_DATA },
];

export default function BooksPage() {
  const [filters, setFilters] = useState(EMPTY_BOOK_FILTERS);
  const debouncedFilters = useDebounce(filters, DEBOUNCE_MS);

  const { options, error: optionsError } = useCatalogOptions();

  const crud = useCrudPage({
    service: booksService,
    loadItems: () => booksService.list(removeEmptyValues(debouncedFilters)),
    dependencies: [debouncedFilters],
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((previous) => ({ ...previous, [name]: value }));
  };

  const renderActions = (book) => (
    <div className="table-actions">
      <Link to={getBookDetailPath(book.id)} className="button secondary small">
        {LABELS.COMMON.VIEW}
      </Link>
      <button type="button" className="button secondary small" onClick={() => crud.openEditForm(book)}>
        {LABELS.COMMON.EDIT}
      </button>
      <button type="button" className="button danger small" onClick={() => crud.remove(book, book.titulo)}>
        {LABELS.COMMON.DELETE}
      </button>
    </div>
  );

  return (
    <>
      <PageHeader
        eyebrow={LABELS.BOOKS.EYEBROW}
        title={LABELS.BOOKS.TITLE}
        subtitle={LABELS.BOOKS.SUBTITLE}
      >
        <button type="button" className="button primary" onClick={crud.openCreateForm}>
          {LABELS.BOOKS.NEW}
        </button>
      </PageHeader>

      {crud.feedback && <Notice type={crud.feedback.type}>{crud.feedback.text}</Notice>}
      {optionsError && <Notice type={NOTICE_TYPES.ERROR}>{optionsError}</Notice>}

      {crud.isFormOpen && (
        <BookForm
          key={crud.selectedItem?.id ?? 'new'}
          book={crud.selectedItem}
          options={options}
          onSubmit={crud.save}
          onCancel={crud.closeForm}
        />
      )}

      <BookFilters
        filters={filters}
        authors={options.authors}
        genres={options.genres}
        onChange={handleFilterChange}
        onClear={() => setFilters(EMPTY_BOOK_FILTERS)}
      />

      <section className="panel table-wrap">
        <AsyncState loading={crud.loading} error={crud.error}>
          <DataTable columns={COLUMNS} rows={crud.items} renderActions={renderActions} />
        </AsyncState>
      </section>
    </>
  );
}
