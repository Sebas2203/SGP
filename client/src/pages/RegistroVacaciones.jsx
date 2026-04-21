// client/src/pages/registroVacaciones.jsx
import { useState, useEffect } from "react";
import { getSolicitudes, actualizarEstadoSolicitud } from "../services/vacaciones.service";

const colorEstado = {
  Pendiente: "#aaa",
  Aprobado: "#4DB8B8",
  Rechazado: "#e05c5c",
};

function formatFecha(fecha) {
  if (!fecha) return "—";
  return fecha.slice(0, 10);
}

function RegistroVacaciones() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [vistaDetalle, setVistaDetalle] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [cargandoLista, setCargandoLista] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getSolicitudes()
      .then((data) => {
        const vacaciones = data.filter(s => s.TC_SOL_MOTIVO === "Vacaciones");
        setSolicitudes(vacaciones);
      })
      .catch((err) => setError(err.message))
      .finally(() => setCargandoLista(false));
  }, []);

  const handleActualizar = async (solicitudId, nuevoEstadoId) => {
    setCargando(true);
    setError("");
    try {
      await actualizarEstadoSolicitud(solicitudId, nuevoEstadoId);
      const nuevoEstadoTexto = nuevoEstadoId === 2 ? "Aprobado" : "Rechazado";
      setSolicitudes((prev) =>
        prev.map((s) => s.TN_SOL_ID === solicitudId
          ? { ...s, ESTADO: nuevoEstadoTexto }
          : s)
      );
      setVistaDetalle(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  if (vistaDetalle) {
    return (
      <DetalleVacacion
        solicitud={vistaDetalle}
        onActualizar={handleActualizar}
        onVolver={() => setVistaDetalle(null)}
        cargando={cargando}
        error={error}
      />
    );
  }

  return (
    <div className="container mt-4">
      <div className="row g-4">
        <div className="col-md-3">
          <h4 className="fw-bold">Registro de<br />vacaciones</h4>
          <p className="text-muted" style={{ fontSize: "0.85rem" }}>
            Empleados que han solicitado Vacaciones
          </p>
          <div style={{ fontSize: "0.82rem" }}>
            <span className="badge me-1" style={{ backgroundColor: colorEstado.Pendiente }}>Pendiente</span>
            <span className="badge me-1" style={{ backgroundColor: colorEstado.Aprobado }}>Aprobado</span>
            <span className="badge" style={{ backgroundColor: colorEstado.Rechazado }}>Rechazado</span>
          </div>
        </div>

        <div className="col-md-9">
          {error && <div className="alert alert-danger py-2" style={{ fontSize: "0.85rem" }}>{error}</div>}
          {cargandoLista && <p className="text-muted">Cargando solicitudes...</p>}
          {!cargandoLista && solicitudes.length === 0 && (
            <p className="text-muted">No hay solicitudes de vacaciones.</p>
          )}

          {solicitudes.length > 0 && (
            <div className="row fw-semibold text-muted mb-1 px-2" style={{ fontSize: "0.82rem" }}>
              <div className="col-4">Empleado</div>
              <div className="col-2">Inicio</div>
              <div className="col-2">Fin</div>
              <div className="col-2">Estado</div>
              <div className="col-2">Acción</div>
            </div>
          )}

          {solicitudes.map((sol) => (
            <div key={sol.TN_SOL_ID} className="card mb-2 p-2 shadow-sm">
              <div className="row align-items-center" style={{ fontSize: "0.82rem" }}>
                <div className="col-4 fw-semibold">{sol.TC_USU_NOMBRE} {sol.TC_USU_APELLIDOS}</div>
                <div className="col-2 text-muted">{formatFecha(sol.TF_SOL_FECHA_INICIO)}</div>
                <div className="col-2 text-muted">{formatFecha(sol.TF_SOL_FECHA_FIN)}</div>
                <div className="col-2">
                  <span className="badge" style={{ backgroundColor: colorEstado[sol.ESTADO] || "#aaa" }}>
                    {sol.ESTADO}
                  </span>
                </div>
                <div className="col-2">
                  <button className="btn btn-sm btn-outline-secondary py-0"
                    style={{ fontSize: "0.75rem" }}
                    onClick={() => setVistaDetalle(sol)}>
                    Ver
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── REGLA DE REACT: todos los hooks PRIMERO, luego la lógica derivada ─────────
function DetalleVacacion({ solicitud, onActualizar, onVolver, cargando, error }) {
  // ✅ Hooks siempre primero — antes de cualquier cálculo o condición
  const [confirmDias, setConfirmDias] = useState(false);
  const [confirmAutorizado, setConfirmAutorizado] = useState(false);

  // Lógica derivada DESPUÉS de los hooks
  const esPendiente = solicitud.ESTADO === "Pendiente";
  const puedeAceptar = confirmDias && confirmAutorizado && esPendiente;

  return (
    <div className="container mt-4">
      <div className="row g-4">
        <div className="col-md-3">
          <h4 className="fw-bold">Detalle de<br />vacaciones</h4>
          <div className="rounded p-3 text-white text-center mt-3" style={{ backgroundColor: "#4DB8B8" }}>
            <div className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
              style={{ width: 60, height: 60, backgroundColor: "rgba(255,255,255,0.3)", fontSize: 24 }}>
              👤
            </div>
            <strong>{solicitud.TC_USU_NOMBRE} {solicitud.TC_USU_APELLIDOS}</strong>
            <div style={{ fontSize: "0.82rem" }}>{solicitud.DEPARTAMENTO || "Empleado"}</div>
          </div>
          <div className="card p-3 mt-3 shadow-sm" style={{ fontSize: "0.80rem" }}>
            <div className="text-muted mb-1">Estado actual</div>
            <span className="badge" style={{ backgroundColor: colorEstado[solicitud.ESTADO] || "#aaa" }}>
              {solicitud.ESTADO}
            </span>
            {solicitud.TC_USU_CORREO && (
              <>
                <div className="text-muted mt-2 mb-1">Correo</div>
                <div>{solicitud.TC_USU_CORREO}</div>
              </>
            )}
          </div>
        </div>

        <div className="col-md-9">
          <h5 className="fw-bold text-center mb-4">Información de la solicitud</h5>

          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="card p-3 text-center shadow-sm" style={{ fontSize: "0.85rem" }}>
                <div className="text-muted mb-1">Empleado</div>
                <strong>{solicitud.TC_USU_NOMBRE} {solicitud.TC_USU_APELLIDOS}</strong>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 text-center shadow-sm" style={{ fontSize: "0.85rem" }}>
                <div className="text-muted mb-1">Fecha inicio</div>
                <strong>{formatFecha(solicitud.TF_SOL_FECHA_INICIO)}</strong>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 text-center shadow-sm" style={{ fontSize: "0.85rem" }}>
                <div className="text-muted mb-1">Fecha fin</div>
                <strong>{formatFecha(solicitud.TF_SOL_FECHA_FIN)}</strong>
              </div>
            </div>
          </div>

          {esPendiente && (
            <div className="card p-3 mb-4 shadow-sm" style={{ fontSize: "0.85rem" }}>
              <p className="fw-semibold mb-3">Para aprobar, confirmá los siguientes puntos:</p>
              <div className="form-check mb-2">
                <input type="checkbox" className="form-check-input" id="checkDias"
                  checked={confirmDias} onChange={(e) => setConfirmDias(e.target.checked)} />
                <label className="form-check-label" htmlFor="checkDias">
                  Confirmo que el empleado tiene los días disponibles para esta solicitud.
                </label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="checkAut"
                  checked={confirmAutorizado} onChange={(e) => setConfirmAutorizado(e.target.checked)} />
                <label className="form-check-label" htmlFor="checkAut">
                  Confirmo que la solicitud está autorizada por el jefe inmediato.
                </label>
              </div>
              {(!confirmDias || !confirmAutorizado) && (
                <p className="text-muted mt-2 mb-0" style={{ fontSize: "0.80rem" }}>
                  * Debés marcar ambas opciones para poder aceptar.
                </p>
              )}
            </div>
          )}

          {error && <div className="alert alert-danger py-2" style={{ fontSize: "0.85rem" }}>{error}</div>}

          {esPendiente ? (
            <div className="d-flex gap-3">
              <button className="btn btn-dark-custom"
                onClick={() => onActualizar(solicitud.TN_SOL_ID, 2)}
                disabled={cargando || !puedeAceptar}
                title={!puedeAceptar ? "Marcá ambas opciones para aceptar" : ""}>
                {cargando ? "Procesando..." : "Aceptar"}
              </button>
              <button className="btn btn-danger"
                onClick={() => onActualizar(solicitud.TN_SOL_ID, 3)}
                disabled={cargando}>
                {cargando ? "Procesando..." : "Rechazar"}
              </button>
            </div>
          ) : (
            <div className="alert alert-info py-2" style={{ fontSize: "0.85rem" }}>
              Esta solicitud ya fue procesada con estado: <strong>{solicitud.ESTADO}</strong>
            </div>
          )}

          <button className="btn btn-link mt-3 p-0" onClick={onVolver}
            style={{ fontSize: "0.85rem" }}>← Volver al registro</button>
        </div>
      </div>
    </div>
  );
}

export default RegistroVacaciones;