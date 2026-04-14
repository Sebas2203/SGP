// client/src/pages/incapacidades.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { solicitarIncapacidad } from "../services/incapacidades.service";
import { getUsuarioActual } from "../services/usuario.service";
import { getHistorialEmpleado } from "../services/employee.service";

const colorEstado = {
  Pendiente: "#8CA0B6",
  Aprobado: "#2AABAA",
  Rechazado: "#E05252",
};

function Incapacidades() {
  const navigate = useNavigate();
  const usuario = getUsuarioActual();
  const [historial, setHistorial] = useState([]);
  const [form, setForm] = useState({
    desde: "", hasta: "", archivo: null,
    aceptaCondiciones: false, entiendeProcesso: false,
  });
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (usuario?.id) {
      getHistorialEmpleado(usuario.id)
        .then((data) => setHistorial(data.filter(s => s.MOTIVO === "Incapacidad")))
        .catch((err) => console.error(err));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
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
      const result = await solicitarIncapacidad(form.desde, form.hasta, form.archivo);
      setMensaje(result.message || "Incapacidad enviada exitosamente");
      setForm({ desde: "", hasta: "", archivo: null, aceptaCondiciones: false, entiendeProcesso: false });
      if (usuario?.id) {
        const data = await getHistorialEmpleado(usuario.id);
        setHistorial(data.filter(s => s.MOTIVO === "Incapacidad"));
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container mt-4 fade-in">

      {/* Botón volver */}
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

          {/* Stats resumen */}
          <div className="perfil-info-card mb-3">
            <div className="row text-center g-0">
              <div className="col-4">
                <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--text-secondary)" }}>
                  {historial.filter(s => s.ESTADO === "Pendiente").length}
                </div>
                <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Proceso
                </div>
              </div>
              <div className="col-4">
                <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--primary)" }}>
                  {historial.filter(s => s.ESTADO === "Aprobado").length}
                </div>
                <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Aprobadas
                </div>
              </div>
              <div className="col-4">
                <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "#E05252" }}>
                  {historial.filter(s => s.ESTADO === "Rechazado").length}
                </div>
                <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Rechazadas
                </div>
              </div>
            </div>
          </div>

          <div className="perfil-info-card">
            <div className="fw-semibold mb-3" style={{ fontSize: "0.82rem", color: "var(--text-primary)" }}>
              Mis incapacidades
            </div>
            {historial.length === 0 ? (
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Sin registros previos</div>
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

          <p className="fw-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            Adjunta aquí el documento oficial de tu incapacidad:
          </p>

          {/* Upload zone */}
          <div className="upload-zone mb-4"
            onClick={() => document.getElementById("archivoInput").click()}>
            <div className="upload-icon">⬆️</div>
            <div className="upload-text">
              {form.archivo ? `📄 ${form.archivo.name}` : "Haz clic para subir el archivo (PDF, JPG, PNG)"}
            </div>
            <input id="archivoInput" type="file" name="archivo"
              accept=".pdf,.jpg,.jpeg,.png" style={{ display: "none" }} onChange={handleChange} />
          </div>

          <p className="mb-4" style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
            Ingresa la fecha de los días efectivos de tu incapacidad
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
                <input type="checkbox" name="aceptaCondiciones" className="form-check-input"
                  id="check1" checked={form.aceptaCondiciones} onChange={handleChange} required />
                <label className="form-check-label" htmlFor="check1" style={{ fontSize: "0.875rem" }}>
                  Si la incapacidad requiere días adicionales, me comunicaré con RRHH para informarlo.
                </label>
              </div>
              <div className="form-check">
                <input type="checkbox" name="entiendeProcesso" className="form-check-input"
                  id="check2" checked={form.entiendeProcesso} onChange={handleChange} required />
                <label className="form-check-label" htmlFor="check2" style={{ fontSize: "0.875rem" }}>
                  Entiendo que la incapacidad puede tomar unos días para ser procesada.
                </label>
              </div>
            </div>
            
            {mensaje && <div className="alert alert-success mb-3">{mensaje}</div>}
            {error && <div className="alert alert-danger mb-3">{error}</div>}

            <button type="submit" className="btn btn-dark-custom" disabled={cargando}>
              {cargando ? "Enviando..." : "Enviar datos a procesar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Incapacidades;