import { useMemo } from 'react';
import { LABELS } from '../constants/labels';
import { useForm } from '../hooks/useForm';
import { buildResourceSchema } from '../schemas/validation';
import FormActions from './FormActions';
import FormField from './FormField';

export default function ResourceForm({ config, item, onSubmit, onCancel }) {
  const schema = useMemo(() => buildResourceSchema(config.fields), [config]);

  const initialValues = {};
  config.fields.forEach((field) => {
    initialValues[field.name] = item?.[field.name] ?? '';
  });

  const { values, errors, submitError, saving, handleChange, handleSubmit } = useForm({
    initialValues,
    schema,
    onSubmit,
  });

  const title = item
    ? LABELS.COMMON.EDIT_TITLE(config.singular)
    : LABELS.COMMON.ADD_TITLE(config.singular);

  return (
    <section className="panel form-panel">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          {config.fields.map((field) => (
            <FormField
              key={field.name}
              label={field.label}
              error={errors[field.name]}
              className={field.multiline ? 'span-two' : undefined}
            >
              {field.multiline ? (
                <textarea name={field.name} value={values[field.name]} onChange={handleChange} />
              ) : (
                <input
                  name={field.name}
                  value={values[field.name]}
                  onChange={handleChange}
                  maxLength={field.maxLength}
                />
              )}
            </FormField>
          ))}
        </div>
        <FormActions saving={saving} submitError={submitError} onCancel={onCancel} />
      </form>
    </section>
  );
}
