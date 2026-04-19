import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NoAutorizado() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleVolver = () => {
    // Redirige a su home según su rol
    if (auth?.rolId === 1) {
      navigate("/homerrhh");
    } else {
      navigate("/homeempleado");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center mt-5">
      <h2>⛔ Acceso no autorizado</h2>
      <p className="text-muted">No tienes permiso para ver esta página.</p>
      <button className="btn btn-dark-custom mt-3" onClick={handleVolver}>
        Volver a mi inicio
      </button>
    </div>
  );
}

export default NoAutorizado;