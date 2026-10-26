import { useState } from 'react';
import { MESSAGES } from '../constants/messages';
import { getErrorMessage } from '../utils/errors';

function mapYupErrors(validationError) {
  const errors = {};
  validationError.inner.forEach((item) => {
    if (!errors[item.path]) errors[item.path] = item.message;
  });
  return errors;
}

export function useForm({ initialValues, schema, onSubmit, errorMessage = MESSAGES.SAVE_ERROR }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setSubmitError('');

    let validValues;
    try {
      validValues = await schema.validate(values, { abortEarly: false });
    } catch (validationError) {
      setErrors(mapYupErrors(validationError));
      return;
    }

    setSaving(true);
    try {
      await onSubmit(validValues);
    } catch (error) {
      setSubmitError(getErrorMessage(error, errorMessage));
    } finally {
      setSaving(false);
    }
  };

  return { values, errors, submitError, saving, handleChange, handleSubmit };
}
