// client/src/components/navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { getUsuarioActual } from "../services/usuario.service";

function Navbar() {
  const navigate = useNavigate();
  const usuario = getUsuarioActual();

  // Cierra la sesión limpiando localStorage y redirige al inicio
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("rolId");
    localStorage.removeItem("notif_vistas");
    navigate("/Inicio");
  };

  return (
    <nav className="navbar-custom d-flex justify-content-between align-items-center">

      {/* Logo clickeable */}
      <Link to="/Inicio" className="brand-logo">
        Vivit
      </Link>

      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-light">ES</button>

        {usuario ? (
          // ── Sesión activa: muestra nombre + botón cerrar sesión ──
          <>
            <div style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "0.875rem",
              fontWeight: 600,
              padding: "6px 12px",
              background: "rgba(255,255,255,0.08)",
              borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
              <span style={{ fontSize: "1rem" }}>👤</span>
              {usuario.nombreCompleto}
            </div>

            <button
              className="btn btn-light"
              onClick={handleLogout}
              style={{ color: "#FF8A8A" }}
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          // ── Sin sesión: muestra Registrarse + Iniciar Sesión ──
          <>
            <Link to="/register">
              <button className="btn btn-dark-custom">
                Registrarse
              </button>
            </Link>
            <Link to="/login">
              <button className="btn btn-dark-custom">
                Iniciar Sesión
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;