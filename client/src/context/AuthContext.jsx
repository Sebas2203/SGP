import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    return {
      token,
      usuario:   localStorage.getItem("usuario"),
      rolId:     Number(localStorage.getItem("rolId")),
      birthdate: localStorage.getItem("birthdate"),
    };
  });

  const login = (data) => {
    localStorage.setItem("token",     data.token);
    localStorage.setItem("usuario",   data.nombre);
    localStorage.setItem("rolId",     data.rolId);
    localStorage.setItem("birthdate", data.birthdate);

    setAuth({
      token:     data.token,
      usuario:   data.nombre,
      rolId:     data.rolId,
      birthdate: data.birthdate,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("rolId");
    localStorage.removeItem("birthdate");
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);