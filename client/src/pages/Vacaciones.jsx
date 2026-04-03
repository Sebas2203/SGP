// client/src/pages/vacaciones.jsx
import { useState } from "react";
import { solicitarVacaciones } from "../services/vacaciones.service";
import { getUsuarioActual } from "../services/usuario.service";

function Vacaciones() {
  // ✅ Se llama DENTRO del componente para que el token ya esté disponible
  const usuario = getUsuarioActual();

  const [form, setForm] = useState({ desde: "", hasta: "" });
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setMensaje("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    if (form.desde > form.hasta) {
      setError("La fecha de inicio no puede ser mayor a la fecha de fin");
      return;
    }

    setCargando(true);

    try {
      const result = await solicitarVacaciones(form.desde, form.hasta);
      setMensaje(result.message || "Solicitud enviada exitosamente");
      setForm({ desde: "", hasta: "" });
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row g-4">

        {/* Columna izquierda: perfil real del usuario */}
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

          <div className="card p-3 shadow-sm" style={{ fontSize: "0.82rem" }}>
            <div className="text-muted mb-1">Jefe Inmediato</div>
            <div className="mb-2">—</div>
            <div className="text-muted mb-1">Administrador RRHH</div>
            <div>—</div>
          </div>
        </div>

        {/* Columna derecha: formulario */}
        <div className="col-md-9">
          <div className="rounded p-3 mb-4 text-white d-flex gap-4"
            style={{ backgroundColor: "#4DB8B8", fontSize: "0.85rem" }}>
            <div><div className="fw-bold">—</div><div>Días calendario</div></div>
            <div><div className="fw-bold">—</div><div>Días hábiles</div></div>
            <div><div className="fw-bold">—</div><div>En proceso</div></div>
            <div><div className="fw-bold">—</div><div>Aceptados</div></div>
            <div><div className="fw-bold">—</div><div>Total de días</div></div>
          </div>

          <p className="mb-3">Ingresa la fecha de los días que desea disfrutar de sus vacaciones</p>

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
              <input type="checkbox" className="form-check-input" id="check1" required />
              <label className="form-check-label" htmlFor="check1" style={{ fontSize: "0.85rem" }}>
                Si necesita días adicionales, comuníquese con su jefe para que los autorice.
              </label>
            </div>
            <div className="form-check mb-4">
              <input type="checkbox" className="form-check-input" id="check2" required />
              <label className="form-check-label" htmlFor="check2" style={{ fontSize: "0.85rem" }}>
                Entiendo que la solicitud puede tomar unos días para ser procesada.
              </label>
            </div>

            {mensaje && <div className="alert alert-success py-2" style={{ fontSize: "0.85rem" }}>{mensaje}</div>}
            {error && <div className="alert alert-danger py-2" style={{ fontSize: "0.85rem" }}>{error}</div>}

            <button type="submit" className="btn btn-dark-custom" disabled={cargando}>
              {cargando ? "Enviando solicitud..." : "Solicitar días de Vacaciones"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Vacaciones;