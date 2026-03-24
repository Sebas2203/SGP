import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar-custom d-flex justify-content-between align-items-center p-3">
      <h3 className="fw-bold" style={{ color: "var(--primary)" }}>Vivit</h3>

      <div>
        <button className="btn btn-light me-2">ES</button>

        <Link to="/register">
          <button className="btn btn-dark-custom me-2">
            Registrarse
          </button>
        </Link>

        <Link to="/login">
          <button className="btn btn-dark-custom">
            Iniciar Sesión
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
