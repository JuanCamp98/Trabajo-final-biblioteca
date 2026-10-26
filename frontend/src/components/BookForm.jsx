import { LABELS } from '../constants/labels';
import { FIELD_LIMITS, MAX_YEAR, MIN_YEAR } from '../constants/app';
import { useForm } from '../hooks/useForm';
import { bookSchema } from '../schemas/validation';
import { getAuthorName } from '../utils/formatters';
import FormActions from './FormActions';
import FormField from './FormField';

const TEXTS = LABELS.BOOKS.FORM;

export default function BookForm({ book, options, onSubmit, onCancel }) {
  const initialValues = {
    titulo: book?.titulo ?? '',
    anioPublicacion: book?.anioPublicacion ?? '',
    isbn: book?.isbn ?? '',
    descripcion: book?.descripcion ?? '',
    autorId: book?.autor?.id ?? '',
    generoId: book?.genero?.id ?? '',
    estanteId: book?.estante?.id ?? '',
    sagaId: book?.saga?.id ?? '',
  };

  const { values, errors, submitError, saving, handleChange, handleSubmit } = useForm({
    initialValues,
    schema: bookSchema,
    onSubmit,
  });

  return (
    <section className="panel form-panel">
      <h2>{book ? LABELS.BOOKS.EDIT_TITLE : LABELS.BOOKS.NEW_TITLE}</h2>
      <form onSubmit={handleSubmit} noValidate className="book-form">
        <div className="form-grid">
          <FormField label={TEXTS.TITLE} error={errors.titulo}>
            <input
              name="titulo"
              value={values.titulo}
              onChange={handleChange}
              maxLength={FIELD_LIMITS.TITLE}
            />
          </FormField>

          <FormField label={TEXTS.YEAR} error={errors.anioPublicacion}>
            <input
              type="number"
              name="anioPublicacion"
              value={values.anioPublicacion}
              onChange={handleChange}
              min={MIN_YEAR}
              max={MAX_YEAR}
            />
          </FormField>

          <FormField label={TEXTS.AUTHOR} error={errors.autorId}>
            <select name="autorId" value={values.autorId} onChange={handleChange}>
              <option value="">{LABELS.COMMON.SELECT}</option>
              {options.authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {getAuthorName(author)}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label={TEXTS.GENRE} error={errors.generoId}>
            <select name="generoId" value={values.generoId} onChange={handleChange}>
              <option value="">{LABELS.COMMON.SELECT}</option>
              {options.genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.nombre}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label={TEXTS.SHELF} error={errors.estanteId}>
            <select name="estanteId" value={values.estanteId} onChange={handleChange}>
              <option value="">{LABELS.COMMON.SELECT}</option>
              {options.shelves.map((shelf) => (
                <option key={shelf.id} value={shelf.id}>
                  {shelf.codigo}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label={TEXTS.SAGA} error={errors.sagaId}>
            <select name="sagaId" value={values.sagaId} onChange={handleChange}>
              <option value="">{TEXTS.NO_SAGA}</option>
              {options.sagas.map((saga) => (
                <option key={saga.id} value={saga.id}>
                  {saga.nombre}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label={TEXTS.ISBN} error={errors.isbn}>
            <input
              name="isbn"
              value={values.isbn}
              onChange={handleChange}
              maxLength={FIELD_LIMITS.ISBN}
            />
          </FormField>

          <FormField label={TEXTS.DESCRIPTION} error={errors.descripcion} className="span-two">
            <textarea name="descripcion" value={values.descripcion} onChange={handleChange} />
          </FormField>
        </div>

        <FormActions saving={saving} submitError={submitError} onCancel={onCancel} />
      </form>
    </section>
  );
}
