import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { solicitarVacaciones } from "../services/vacaciones.service";
import { getUsuarioActual } from "../services/usuario.service";
import { getHistorialEmpleado } from "../services/employee.service";

const colorEstado = {
  Pendiente: "#8CA0B6",
  Aprobado: "#2AABAA",
  Rechazado: "#E05252",
};

function Vacaciones() {
  const navigate = useNavigate();
  const usuario = getUsuarioActual();
  const [historial, setHistorial] = useState([]);
  const [form, setForm] = useState({ desde: "", hasta: "" });
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (usuario?.id) {
      getHistorialEmpleado(usuario.id)
        .then((data) => setHistorial(data.filter(s => s.MOTIVO === "Vacaciones")))
        .catch((err) => console.error(err));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); setMensaje("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setMensaje("");
    if (form.desde > form.hasta) {
      setError("La fecha de inicio no puede ser mayor a la fecha de fin");
      return;
    }
    setCargando(true);
    try {
      const result = await solicitarVacaciones(form.desde, form.hasta);
      setMensaje(result.message || "Solicitud enviada exitosamente");
      setForm({ desde: "", hasta: "" });
      if (usuario?.id) {
        const data = await getHistorialEmpleado(usuario.id);
        setHistorial(data.filter(s => s.MOTIVO === "Vacaciones"));
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container mt-4 fade-in">

     <button className="btn btn-link p-0 mb-4 d-flex align-items-center gap-1"
    onClick={() => navigate("/homeempleado")}
    style={{ fontSize: "0.875rem", fontWeight: 600 }}>
    ← Volver al inicio
    </button>

      <div className="row g-4">

        {/* Columna izquierda */}
        <div className="col-md-3 perfil-sidebar">
          <div className="perfil-card-teal">
            <div className="avatar-circle">👤</div>
            <div className="nombre">{usuario?.nombreCompleto || "—"}</div>
            <div className="depto">Departamento {usuario?.depId || "—"}</div>
          </div>

          <div className="perfil-info-card mb-3">
            <div className="info-label">Correo</div>
            <div className="info-value">{usuario?.correo || "—"}</div>
          </div>

          <div className="perfil-info-card">
            <div className="fw-semibold mb-3" style={{ fontSize: "0.82rem", color: "var(--text-primary)" }}>
              Mis solicitudes
            </div>
            {historial.length === 0 ? (
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Sin solicitudes previas</div>
            ) : (
              historial.map((sol) => (
                <div key={sol["NUMERO SOLICITUD"]} className="historial-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fecha">{sol["FECHA INICIO"]?.slice(0, 10)}</span>
                    <span className="badge" style={{ backgroundColor: colorEstado[sol.ESTADO] || "#aaa", color: "#fff" }}>
                      {sol.ESTADO}
                    </span>
                  </div>
                  <div className="hasta">hasta {sol["FECHA FIN"]?.slice(0, 10)}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Columna derecha */}
        <div className="col-md-9">

          {/* Stats banner */}
          <div className="stats-banner mb-4">
            <div className="stat-item">
              <div className="stat-value">{historial.filter(s => s.ESTADO === "Pendiente").length}</div>
              <div className="stat-label">En proceso</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{historial.filter(s => s.ESTADO === "Aprobado").length}</div>
              <div className="stat-label">Aceptados</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{historial.filter(s => s.ESTADO === "Rechazado").length}</div>
              <div className="stat-label">Rechazados</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{historial.length}</div>
              <div className="stat-label">Total solicitudes</div>
            </div>
          </div>

          <p className="mb-4" style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
            Ingresa la fecha de los días que desea disfrutar de sus vacaciones
          </p>

          <form onSubmit={handleSubmit}>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label">Desde el</label>
                <input type="date" name="desde" className="form-control"
                  value={form.desde} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Hasta el</label>
                <input type="date" name="hasta" className="form-control"
                  value={form.hasta} onChange={handleChange} required />
              </div>
            </div>

            <div className="confirm-box mb-4">
              <div className="form-check mb-2">
                <input type="checkbox" className="form-check-input" id="check1" required />
                <label className="form-check-label" htmlFor="check1" style={{ fontSize: "0.875rem" }}>
                  Si necesita días adicionales, comuníquese con su jefe para que los autorice.
                </label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="check2" required />
                <label className="form-check-label" htmlFor="check2" style={{ fontSize: "0.875rem" }}>
                  Entiendo que la solicitud puede tomar unos días para ser procesada.
                </label>
              </div>
            </div>
            
            {mensaje && <div className="alert alert-success mb-3">{mensaje}</div>}
            {error && <div className="alert alert-danger mb-3">{error}</div>}

            <button type="submit" className="btn btn-dark-custom" disabled={cargando}>
              {cargando ? "Enviando solicitud..." : "Solicitar días de vacaciones"}
            </button>
             
          </form>
        </div>
      </div>
    </div>
  );
}

export default Vacaciones;