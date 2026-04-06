// client/src/components/navbar.jsx
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar-custom d-flex justify-content-between align-items-center p-3">

      {/* Logo clickeable — lleva al inicio */}
      <Link to="/Inicio" style={{ textDecoration: "none" }}>
        <h3 className="fw-bold mb-0" style={{ color: "var(--primary)", cursor: "pointer" }}>
          Vivit
        </h3>
      </Link>

      <div>
        <button className="btn btn-light me-2">ES</button>

        <Link to="/register">
          <button className="btn btn-dark-custom me-2">
            Registrarse
          </button>
        </Link>

        <Link to="/login">
          <button className="btn btn-dark-custom">
            Iniciar sesión
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;