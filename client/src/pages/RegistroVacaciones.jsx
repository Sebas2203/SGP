// client/src/pages/registroVacaciones.jsx
//
// Pantalla de RRHH — gestiona solicitudes de vacaciones.
// Usa GET /api/getSolicitudes para cargar la lista
// y PUT /api/putEstado para aceptar o rechazar.
//
// nuevoEstadoId: 2 = Aprobado, 3 = Rechazado

import { useState, useEffect } from "react";
import { getSolicitudes, actualizarEstadoSolicitud } from "../services/vacaciones.service";

const colorEstado = {
  Pendiente: "#aaa",
  Aprobado: "#4DB8B8",
  Rechazado: "#e05c5c",
};

// Mapea el TN_EST_ID numérico de la DB al texto que mostramos
const mapaEstado = { 1: "Pendiente", 2: "Aprobado", 3: "Rechazado" };

function RegistroVacaciones() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [vistaDetalle, setVistaDetalle] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [cargandoLista, setCargandoLista] = useState(true);
  const [error, setError] = useState("");

  // Carga las solicitudes del backend al entrar a la pantalla
  useEffect(() => {
    getSolicitudes()
      .then((data) => {
        // Filtramos solo vacaciones (reason = "Vacaciones")
        const vacaciones = data.filter(s => s.TC_SOL_MOTIVO === "Vacaciones");
        setSolicitudes(vacaciones);
      })
      .catch((err) => setError(err.message))
      .finally(() => setCargandoLista(false));
  }, []);

  // Aceptar (nuevoEstadoId: 2) o Rechazar (nuevoEstadoId: 3)
  const handleActualizar = async (solicitudId, nuevoEstadoId) => {
    setCargando(true);
    setError("");
    try {
      await actualizarEstadoSolicitud(solicitudId, nuevoEstadoId);

      // Actualiza el estado en la lista local sin recargar
      setSolicitudes((prev) =>
        prev.map((s) =>
          s.TN_SOL_ID === solicitudId
            ? { ...s, TN_EST_ID: nuevoEstadoId }
            : s
        )
      );
      setVistaDetalle(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  };

  // ── Vista detalle ────────────────────────────────────────────────────────
  if (vistaDetalle) {
    const estadoTexto = mapaEstado[vistaDetalle.TN_EST_ID] || "Pendiente";

    return (
      <div className="container mt-4">
        <div className="row g-4">
          <div className="col-md-3">
            <h4 className="fw-bold">Detalle de<br />Vacaciones</h4>
            <div className="rounded p-3 text-white text-center mt-3" style={{ backgroundColor: "#4DB8B8" }}>
              <div className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
                style={{ width: 60, height: 60, backgroundColor: "rgba(255,255,255,0.3)", fontSize: 24 }}>
                👤
              </div>
              <strong>{vistaDetalle.TC_USU_NOMBRE} {vistaDetalle.TC_USU_APELLIDOS}</strong>
              <div style={{ fontSize: "0.82rem" }}>Empleado</div>
            </div>
            <div className="card p-3 mt-3 shadow-sm" style={{ fontSize: "0.80rem" }}>
              <div className="text-muted mb-1">Estado actual</div>
              <span className="badge" style={{ backgroundColor: colorEstado[estadoTexto] }}>
                {estadoTexto}
              </span>
            </div>
          </div>

          <div className="col-md-9">
            <h5 className="fw-bold text-center mb-4">Información de la Solicitud</h5>
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <div className="card p-3 text-center shadow-sm" style={{ fontSize: "0.85rem" }}>
                  <div className="text-muted mb-1">Empleado</div>
                  <strong>{vistaDetalle.TC_USU_NOMBRE} {vistaDetalle.TC_USU_APELLIDOS}</strong>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3 text-center shadow-sm" style={{ fontSize: "0.85rem" }}>
                  <div className="text-muted mb-1">Fecha inicio</div>
                  <strong>{vistaDetalle.TF_SOL_FECHA_INICIO?.slice(0, 10)}</strong>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3 text-center shadow-sm" style={{ fontSize: "0.85rem" }}>
                  <div className="text-muted mb-1">Fecha fin</div>
                  <strong>{vistaDetalle.TF_SOL_FECHA_FIN?.slice(0, 10)}</strong>
                </div>
              </div>
            </div>

            <div className="mb-4" style={{ fontSize: "0.85rem" }}>
              <p>✅ Si <strong>acepta</strong>, los días se registran como aprobados.</p>
              <p>❌ Si <strong>rechaza</strong>, el empleado podrá enviar una nueva solicitud.</p>
            </div>

            {error && <div className="alert alert-danger py-2" style={{ fontSize: "0.85rem" }}>{error}</div>}

            <div className="d-flex gap-3">
              <button className="btn btn-dark-custom"
                onClick={() => handleActualizar(vistaDetalle.TN_SOL_ID, 2)}
                disabled={cargando || vistaDetalle.TN_EST_ID !== 1}>
                {cargando ? "Procesando..." : "Aceptar"}
              </button>
              <button className="btn btn-danger"
                onClick={() => handleActualizar(vistaDetalle.TN_SOL_ID, 3)}
                disabled={cargando || vistaDetalle.TN_EST_ID !== 1}>
                {cargando ? "Procesando..." : "Rechazar"}
              </button>
            </div>

            {vistaDetalle.TN_EST_ID !== 1 && (
              <div className="alert alert-info mt-3 py-2" style={{ fontSize: "0.85rem" }}>
                Esta solicitud ya fue procesada: <strong>{estadoTexto}</strong>
              </div>
            )}

            <button className="btn btn-link mt-3 p-0" onClick={() => setVistaDetalle(null)}
              style={{ fontSize: "0.85rem" }}>← Volver al registro</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Vista lista ──────────────────────────────────────────────────────────
  return (
    <div className="container mt-4">
      <div className="row g-4">
        <div className="col-md-3">
          <h4 className="fw-bold">Registro de<br />Vacaciones</h4>
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
          {cargandoLista && <p className="text-muted">Cargando solicitudes...</p>}
          {error && <div className="alert alert-danger py-2" style={{ fontSize: "0.85rem" }}>{error}</div>}

          {!cargandoLista && solicitudes.length === 0 && (
            <p className="text-muted">No hay solicitudes de vacaciones pendientes.</p>
          )}

          <div className="row fw-semibold text-muted mb-1 px-2" style={{ fontSize: "0.82rem" }}>
            <div className="col-4">Empleado</div>
            <div className="col-2">Inicio</div>
            <div className="col-2">Fin</div>
            <div className="col-2">Estado</div>
            <div className="col-2">Acción</div>
          </div>

          {solicitudes.map((sol) => {
            const estadoTexto = mapaEstado[sol.TN_EST_ID] || "Pendiente";
            return (
              <div key={sol.TN_SOL_ID} className="card mb-2 p-2 shadow-sm">
                <div className="row align-items-center" style={{ fontSize: "0.82rem" }}>
                  <div className="col-4 fw-semibold">{sol.TC_USU_NOMBRE} {sol.TC_USU_APELLIDOS}</div>
                  <div className="col-2 text-muted">{sol.TF_SOL_FECHA_INICIO?.slice(0, 10)}</div>
                  <div className="col-2 text-muted">{sol.TF_SOL_FECHA_FIN?.slice(0, 10)}</div>
                  <div className="col-2">
                    <span className="badge" style={{ backgroundColor: colorEstado[estadoTexto] || "#aaa" }}>
                      {estadoTexto}
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
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RegistroVacaciones;