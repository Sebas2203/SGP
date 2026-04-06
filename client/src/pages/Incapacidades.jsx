// client/src/pages/incapacidades.jsx
import { useState, useEffect } from "react";
import { solicitarIncapacidad } from "../services/incapacidades.service";
import { getUsuarioActual } from "../services/usuario.service";
import { getHistorialEmpleado } from "../services/employee.service";

const colorEstado = {
  Pendiente: "#aaa",
  Aprobado: "#4DB8B8",
  Rechazado: "#e05c5c",
};

function Incapacidades() {
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
        .catch((err) => console.error("Error cargando historial:", err));
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
      // Pasamos el archivo como tercer parámetro al service
      const result = await solicitarIncapacidad(form.desde, form.hasta, form.archivo);
      setMensaje(result.message || "Incapacidad enviada exitosamente");
      setForm({ desde: "", hasta: "", archivo: null, aceptaCondiciones: false, entiendeProcesso: false });

      // Recarga el historial
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
    <div className="container mt-4">
      <div className="row g-4">

        {/* Columna izquierda: perfil + historial */}
        <div className="col-md-3">
          <div className="rounded p-3 text-white text-center mb-3"
            style={{ backgroundColor: "#4DB8B8" }}>
            <div className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
              style={{ width: 70, height: 70, backgroundColor: "rgba(255,255,255,0.3)", fontSize: 28 }}>
              👤
            </div>
            <strong>{usuario?.nombreCompleto || "—"}</strong>
            <div style={{ fontSize: "0.85rem" }}>Departamento {usuario?.depId || "—"}</div>
          </div>

          <div className="card p-3 shadow-sm mb-3" style={{ fontSize: "0.82rem" }}>
            <strong>Correo:</strong>
            <div>{usuario?.correo || "—"}</div>
          </div>

          {/* Historial de incapacidades */}
          <div className="card p-3 shadow-sm" style={{ fontSize: "0.80rem" }}>
            <div className="fw-semibold mb-2">Mis incapacidades</div>
            {historial.length === 0 ? (
              <div className="text-muted">Sin registros previos</div>
            ) : (
              historial.map((sol) => (
                <div key={sol["NUMERO SOLICITUD"]} className="border-bottom pb-2 mb-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>{sol["FECHA INICIO"]?.slice(0, 10)}</span>
                    <span className="badge"
                      style={{ backgroundColor: colorEstado[sol.ESTADO] || "#aaa", fontSize: "0.72rem" }}>
                      {sol.ESTADO}
                    </span>
                  </div>
                  <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                    hasta {sol["FECHA FIN"]?.slice(0, 10)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Columna derecha: formulario */}
        <div className="col-md-9">

          {/* Resumen del historial */}
          <div className="rounded p-3 mb-4 text-white d-flex gap-4"
            style={{ backgroundColor: "#4DB8B8", fontSize: "0.85rem" }}>
            <div>
              <div className="fw-bold">{historial.filter(s => s.ESTADO === "Pendiente").length}</div>
              <div>En proceso</div>
            </div>
            <div>
              <div className="fw-bold">{historial.filter(s => s.ESTADO === "Aprobado").length}</div>
              <div>Aprobadas</div>
            </div>
            <div>
              <div className="fw-bold">{historial.filter(s => s.ESTADO === "Rechazado").length}</div>
              <div>Rechazadas</div>
            </div>
            <div>
              <div className="fw-bold">{historial.length}</div>
              <div>Total</div>
            </div>
          </div>

          <p className="mb-1 fw-semibold">Adjunta aquí el documento oficial de tu incapacidad:</p>

          <div className="border rounded p-4 text-center mb-4"
            style={{ borderStyle: "dashed", cursor: "pointer", backgroundColor: "#f9f9f9" }}
            onClick={() => document.getElementById("archivoInput").click()}>
            <div style={{ fontSize: 28 }}>⬆️</div>
            <div style={{ fontSize: "0.85rem", color: "#666" }}>
              {form.archivo
                ? `📄 ${form.archivo.name}`
                : "Haz clic para subir el archivo (PDF, JPG, PNG)"}
            </div>
            <input id="archivoInput" type="file" name="archivo"
              accept=".pdf,.jpg,.jpeg,.png" style={{ display: "none" }} onChange={handleChange} />
          </div>

          <p className="mb-3">Ingresa la fecha de los días efectivos de tu incapacidad</p>

          <form onSubmit={handleSubmit}>
            <div className="row g-3 mb-3">
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

            <div className="form-check mb-2">
              <input type="checkbox" name="aceptaCondiciones" className="form-check-input"
                id="check1" checked={form.aceptaCondiciones} onChange={handleChange} required />
              <label className="form-check-label" htmlFor="check1" style={{ fontSize: "0.85rem" }}>
                Si la incapacidad requiere días adicionales, me comunicaré con RRHH para informarlo.
              </label>
            </div>
            <div className="form-check mb-4">
              <input type="checkbox" name="entiendeProcesso" className="form-check-input"
                id="check2" checked={form.entiendeProcesso} onChange={handleChange} required />
              <label className="form-check-label" htmlFor="check2" style={{ fontSize: "0.85rem" }}>
                Entiendo que la incapacidad puede tomar unos días para ser procesada.
              </label>
            </div>

            {mensaje && <div className="alert alert-success py-2" style={{ fontSize: "0.85rem" }}>{mensaje}</div>}
            {error && <div className="alert alert-danger py-2" style={{ fontSize: "0.85rem" }}>{error}</div>}

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