// client/src/pages/registroIncapacidades.jsx
import { useState, useEffect } from "react";
import { getIncapacidades, actualizarEstadoIncapacidad } from "../services/incapacidades.service";

const colorEstado = {
  Pendiente: "#aaa",
  Aprobado: "#4DB8B8",
  Rechazado: "#e05c5c",
};

function formatFecha(fecha) {
  if (!fecha) return "—";
  return fecha.slice(0, 10);
}

function RegistroIncapacidades() {
  const [incapacidades, setIncapacidades] = useState([]);
  const [vistaDetalle, setVistaDetalle] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [cargandoLista, setCargandoLista] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getIncapacidades()
      .then((data) => setIncapacidades(data))
      .catch((err) => setError(err.message))
      .finally(() => setCargandoLista(false));
  }, []);

  const handleActualizar = async (solicitudId, nuevoEstadoId) => {
    setCargando(true);
    setError("");
    try {
      await actualizarEstadoIncapacidad(solicitudId, nuevoEstadoId);
      const nuevoEstadoTexto = nuevoEstadoId === 2 ? "Aprobado" : "Rechazado";
      setIncapacidades((prev) =>
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
      <DetalleIncapacidad
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
          <h4 className="fw-bold">Registro de<br />incapacidades</h4>
          <p className="text-muted" style={{ fontSize: "0.85rem" }}>
            Empleados que han reportado una incapacidad
          </p>
          <div style={{ fontSize: "0.82rem" }}>
            <span className="badge me-1" style={{ backgroundColor: colorEstado.Pendiente }}>Pendiente</span>
            <span className="badge me-1" style={{ backgroundColor: colorEstado.Aprobado }}>Aprobado</span>
            <span className="badge" style={{ backgroundColor: colorEstado.Rechazado }}>Rechazado</span>
          </div>
        </div>

        <div className="col-md-9">
          {error && <div className="alert alert-danger py-2" style={{ fontSize: "0.85rem" }}>{error}</div>}
          {cargandoLista && <p className="text-muted">Cargando incapacidades...</p>}
          {!cargandoLista && incapacidades.length === 0 && (
            <p className="text-muted">No hay incapacidades reportadas.</p>
          )}

          {incapacidades.length > 0 && (
            <div className="row fw-semibold text-muted mb-1 px-2" style={{ fontSize: "0.82rem" }}>
              <div className="col-4">Empleado</div>
              <div className="col-2">Inicio</div>
              <div className="col-2">Fin</div>
              <div className="col-2">Estado</div>
              <div className="col-2">Acción</div>
            </div>
          )}

          {incapacidades.map((inc) => (
            <div key={inc.TN_SOL_ID} className="card mb-2 p-2 shadow-sm">
              <div className="row align-items-center" style={{ fontSize: "0.82rem" }}>
                <div className="col-4 fw-semibold">{inc.TC_USU_NOMBRE} {inc.TC_USU_APELLIDOS}</div>
                <div className="col-2 text-muted">{formatFecha(inc.TF_SOL_FECHA_INICIO)}</div>
                <div className="col-2 text-muted">{formatFecha(inc.TF_SOL_FECHA_FIN)}</div>
                <div className="col-2">
                  <span className="badge" style={{ backgroundColor: colorEstado[inc.ESTADO] || "#aaa" }}>
                    {inc.ESTADO}
                  </span>
                </div>
                <div className="col-2">
                  <button className="btn btn-sm btn-outline-secondary py-0"
                    style={{ fontSize: "0.75rem" }}
                    onClick={() => setVistaDetalle(inc)}>
                    Ver detalles
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
function DetalleIncapacidad({ solicitud, onActualizar, onVolver, cargando, error }) {
  // ✅ Hooks siempre primero
  const [confirmDocumento, setConfirmDocumento] = useState(false);
  const [confirmLegitimo, setConfirmLegitimo] = useState(false);

  // Lógica derivada DESPUÉS de los hooks
  const esPendiente = solicitud.ESTADO === "Pendiente";
  const puedeAceptar = confirmDocumento && confirmLegitimo && esPendiente;

  return (
    <div className="container mt-4">
      <div className="row g-4">
        <div className="col-md-3">
          <h4 className="fw-bold">Registro<br />individual<br />de incapacidad</h4>
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
          <div className="border rounded p-3 mb-4 d-flex align-items-center gap-2"
            style={{ backgroundColor: "#f9f9f9" }}>
            <span style={{ fontSize: 20 }}>📄</span>
            {solicitud.TC_ARCHIVO_URL ? (
              <a
                href={`http://localhost:4000${solicitud.TC_ARCHIVO_URL}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "0.85rem" }}
              >
                Ver documento adjunto
              </a>
            ) : (
              <span style={{ fontSize: "0.85rem", color: "#666" }}>
                Comprobante/Incapacidad del CCSS.PDF
              </span>
            )}
          </div>

          <h5 className="fw-bold text-center mb-4">Información de la incapacidad y el empleado</h5>

          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="card p-3 text-center shadow-sm" style={{ fontSize: "0.82rem" }}>
                <div className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
                  style={{ width: 50, height: 50, backgroundColor: "#4DB8B8", color: "#fff", fontSize: 20 }}>
                  👤
                </div>
                <strong>{solicitud.TC_USU_NOMBRE} {solicitud.TC_USU_APELLIDOS}</strong>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 text-center shadow-sm" style={{ fontSize: "0.82rem" }}>
                <div className="text-muted mb-1">Motivo</div>
                <strong>{solicitud.TC_SOL_MOTIVO || "Incapacidad"}</strong>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 text-center shadow-sm" style={{ fontSize: "0.82rem" }}>
                <div className="text-muted mb-1">Período</div>
                <strong>{formatFecha(solicitud.TF_SOL_FECHA_INICIO)} → {formatFecha(solicitud.TF_SOL_FECHA_FIN)}</strong>
              </div>
            </div>
          </div>

          {esPendiente && (
            <div className="card p-3 mb-4 shadow-sm" style={{ fontSize: "0.85rem" }}>
              <p className="fw-semibold mb-3">Para aprobar, confirmá la legitimidad del documento:</p>
              <div className="form-check mb-2">
                <input type="checkbox" className="form-check-input" id="checkDoc"
                  checked={confirmDocumento} onChange={(e) => setConfirmDocumento(e.target.checked)} />
                <label className="form-check-label" htmlFor="checkDoc">
                  Confirmo que el documento adjunto es válido y fue emitido por una entidad médica reconocida.
                </label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="checkLeg"
                  checked={confirmLegitimo} onChange={(e) => setConfirmLegitimo(e.target.checked)} />
                <label className="form-check-label" htmlFor="checkLeg">
                  Confirmo que las fechas del documento coinciden con las fechas de la solicitud.
                </label>
              </div>
              {(!confirmDocumento || !confirmLegitimo) && (
                <p className="text-muted mt-2 mb-0" style={{ fontSize: "0.80rem" }}>
                  * Debés confirmar ambos puntos para poder aceptar.
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
                title={!puedeAceptar ? "Confirmá ambos puntos para aceptar" : ""}>
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
              Esta incapacidad ya fue procesada con estado: <strong>{solicitud.ESTADO}</strong>
            </div>
          )}

          <button className="btn btn-link mt-3 p-0" onClick={onVolver}
            style={{ fontSize: "0.85rem" }}>← Volver al registro</button>
        </div>
      </div>
    </div>
  );
}

export default RegistroIncapacidades;