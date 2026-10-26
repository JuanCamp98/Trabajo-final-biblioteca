import { Navigate, useNavigate } from 'react-router-dom';
import LoginActions from '../components/LoginActions';
import FormField from '../components/FormField';
import { FIELD_LIMITS } from '../constants/app';
import { LABELS } from '../constants/labels';
import { MESSAGES } from '../constants/messages';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import { loginSchema } from '../schemas/validation';

const TEXTS = LABELS.LOGIN;

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const { values, errors, submitError, saving, handleChange, handleSubmit } = useForm({
    initialValues: { username: '', password: '' },
    schema: loginSchema,
    errorMessage: MESSAGES.LOGIN_ERROR,
    onSubmit: async (credentials) => {
      await login(credentials);
      navigate(ROUTES.LIBROS, { replace: true });
    },
  });

  if (isAuthenticated) return <Navigate to={ROUTES.LIBROS} replace />;

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleSubmit} noValidate>
        <h1>{TEXTS.TITLE}</h1>
        <p className="muted">{TEXTS.SUBTITLE}</p>

        <FormField label={TEXTS.USERNAME} error={errors.username}>
          <input
            name="username"
            value={values.username}
            onChange={handleChange}
            maxLength={FIELD_LIMITS.USERNAME}
            autoComplete="username"
          />
        </FormField>

        <FormField label={TEXTS.PASSWORD} error={errors.password}>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            maxLength={FIELD_LIMITS.PASSWORD}
            autoComplete="current-password"
          />
        </FormField>

        <LoginActions saving={saving} submitError={submitError} />
      </form>
    </main>
  );
}
