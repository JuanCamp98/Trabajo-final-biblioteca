import { createContext, useState } from 'react';
import { STORAGE_KEYS } from '../constants/storage';
import { authService } from '../services/auth.service';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEYS.TOKEN));
  const [username, setUsername] = useState(() => localStorage.getItem(STORAGE_KEYS.ADMIN));

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
    localStorage.setItem(STORAGE_KEYS.ADMIN, data.user.username);
    setToken(data.token);
    setUsername(data.user.username);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.ADMIN);
    setToken(null);
    setUsername(null);
  };

  const value = { token, username, isAuthenticated: Boolean(token), login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
