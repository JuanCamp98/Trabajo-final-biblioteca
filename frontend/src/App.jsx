import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import { ROUTES } from './constants/routes';
import { RESOURCE_KEYS } from './constants/resources';
import BookDetailPage from './pages/BookDetailPage';
import BooksPage from './pages/BooksPage';
import EventsPage from './pages/EventsPage';
import LoginPage from './pages/LoginPage';
import ResourcePage from './pages/ResourcePage';

export default function App() {
  return (
    <Routes>
      {/* Ruta pública */}
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />

      {/* Rutas privadas: PrivateRoute redirige al login si no hay sesión */}
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route index element={<Navigate to={ROUTES.LIBROS} replace />} />
          <Route path={ROUTES.LIBROS} element={<BooksPage />} />
          <Route path={ROUTES.LIBRO_DETALLE} element={<BookDetailPage />} />
          {/* La "key" hace que React reinicie la pantalla al cambiar de recurso */}
          <Route
            path={ROUTES.AUTORES}
            element={<ResourcePage key={RESOURCE_KEYS.AUTORES} resourceKey={RESOURCE_KEYS.AUTORES} />}
          />
          <Route
            path={ROUTES.GENEROS}
            element={<ResourcePage key={RESOURCE_KEYS.GENEROS} resourceKey={RESOURCE_KEYS.GENEROS} />}
          />
          <Route
            path={ROUTES.SAGAS}
            element={<ResourcePage key={RESOURCE_KEYS.SAGAS} resourceKey={RESOURCE_KEYS.SAGAS} />}
          />
          <Route
            path={ROUTES.ESTANTES}
            element={<ResourcePage key={RESOURCE_KEYS.ESTANTES} resourceKey={RESOURCE_KEYS.ESTANTES} />}
          />
          <Route path={ROUTES.EVENTOS} element={<EventsPage />} />
        </Route>
      </Route>

      <Route path={ROUTES.NOT_FOUND} element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}
