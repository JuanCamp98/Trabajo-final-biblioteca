import { Link, useParams } from 'react-router-dom';
import AsyncState from '../components/AsyncState';
import DetailItem from '../components/DetailItem';
import PageHeader from '../components/PageHeader';
import { LABELS } from '../constants/labels';
import { ROUTES } from '../constants/routes';
import { useAsync } from '../hooks/useAsync';
import { booksService } from '../services/library.service';
import { getAuthorName } from '../utils/formatters';

const TEXTS = LABELS.DETAIL;

export default function BookDetailPage() {
  const { id } = useParams();
  const { data: book, loading, error } = useAsync(() => booksService.get(id), [id]);

  return (
    <>
      <PageHeader eyebrow={TEXTS.EYEBROW} title={book?.titulo ?? LABELS.COMMON.LOADING}>
        <Link to={ROUTES.LIBROS} className="button secondary">
          {LABELS.COMMON.BACK_TO_LIST}
        </Link>
      </PageHeader>

      <AsyncState loading={loading} error={error}>
        {book && (
          <section className="panel detail-grid">
            <DetailItem label={TEXTS.AUTHOR}>
              <strong>{getAuthorName(book.autor)}</strong>
            </DetailItem>
            <DetailItem label={TEXTS.GENRE}>
              <strong>{book.genero.nombre}</strong>
            </DetailItem>
            <DetailItem label={TEXTS.YEAR}>
              <strong>{book.anioPublicacion}</strong>
            </DetailItem>
            <DetailItem label={TEXTS.SHELF}>
              <strong>{book.estante.codigo}</strong>
            </DetailItem>
            <DetailItem label={TEXTS.SHELF_LOCATION}>
              <strong>{book.estante.ubicacion || LABELS.COMMON.NO_DATA}</strong>
            </DetailItem>
            <DetailItem label={TEXTS.SAGA}>
              <strong>{book.saga ? book.saga.nombre : TEXTS.NO_SAGA}</strong>
            </DetailItem>
            <DetailItem label={TEXTS.ISBN}>
              <strong>{book.isbn || LABELS.COMMON.NO_DATA}</strong>
            </DetailItem>
            <DetailItem label={TEXTS.DESCRIPTION}>
              <p>{book.descripcion || TEXTS.NO_DESCRIPTION}</p>
            </DetailItem>
          </section>
        )}
      </AsyncState>
    </>
  );
}
