import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LABELS } from '../constants/labels';
import { MESSAGES } from '../constants/messages';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';

const NAV_ITEMS = [
  { to: ROUTES.LIBROS, label: LABELS.NAV.LIBROS },
  { to: ROUTES.AUTORES, label: LABELS.NAV.AUTORES },
  { to: ROUTES.GENEROS, label: LABELS.NAV.GENEROS },
  { to: ROUTES.SAGAS, label: LABELS.NAV.SAGAS },
  { to: ROUTES.ESTANTES, label: LABELS.NAV.ESTANTES },
  { to: ROUTES.EVENTOS, label: LABELS.NAV.EVENTOS },
];

export default function Layout() {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (!window.confirm(MESSAGES.CONFIRM_LOGOUT)) return;
    logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h2 className="brand">{LABELS.APP.NAME}</h2>
        <p className="admin-label">{LABELS.APP.ROLE}</p>

        <nav>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <span>
            {LABELS.APP.LOGGED_AS} <strong>{username}</strong>
          </span>
          <button type="button" className="button secondary full" onClick={handleLogout}>
            {LABELS.NAV.LOGOUT}
          </button>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
