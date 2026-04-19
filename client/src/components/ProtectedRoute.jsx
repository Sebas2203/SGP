import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ rolPermitido }) {
  const { auth } = useAuth();

  // No tiene token → al login
  if (!auth?.token) {
    return <Navigate to="/login" replace />;
  }

  // Tiene token pero no el rol correcto → no autorizado
  if (rolPermitido && auth.rolId !== rolPermitido) {
    return <Navigate to="/no-autorizado" replace />;
  }

  // Todo ok → renderiza la página
  return <Outlet />;
}