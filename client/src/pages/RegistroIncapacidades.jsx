// client/src/pages/registroIncapacidades.jsx
// Igual que registroVacaciones pero filtra por reason = "Incapacidad"

import { useState, useEffect } from "react";
import { getIncapacidades, actualizarEstadoIncapacidad } from "../services/incapacidades.service";

const colorEstado = {
  Pendiente: "#aaa",
  Aprobado: "#4DB8B8",
  Rechazado: "#e05c5c",
};

const mapaEstado = { 1: "Pendiente", 2: "Aprobado", 3: "Rechazado" };

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
      setIncapacidades((prev) =>
        prev.map((s) => s.TN_SOL_ID === solicitudId ? { ...s, TN_EST_ID: nuevoEstadoId } : s)
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
            <h4 className="fw-bold">Registro<br />Individual<br />de Incapacidad</h4>
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
            <div className="border rounded p-3 mb-4 d-flex align-items-center gap-2"
              style={{ backgroundColor: "#f9f9f9" }}>
              <span style={{ fontSize: 20 }}>📄</span>
              <span style={{ fontSize: "0.85rem" }}>Comprobante/Incapacidad del CCSS.PDF</span>
            </div>

            <h5 className="fw-bold text-center mb-4">Información de la incapacidad y el Empleado</h5>

            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <div className="card p-3 text-center shadow-sm" style={{ fontSize: "0.82rem" }}>
                  <div className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
                    style={{ width: 50, height: 50, backgroundColor: "#4DB8B8", color: "#fff", fontSize: 20 }}>
                    👤
                  </div>
                  <strong>{vistaDetalle.TC_USU_NOMBRE} {vistaDetalle.TC_USU_APELLIDOS}</strong>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3 text-center shadow-sm" style={{ fontSize: "0.82rem" }}>
                  <div className="text-muted mb-1">Motivo</div>
                  <strong>{vistaDetalle.TC_SOL_MOTIVO}</strong>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3 text-center shadow-sm" style={{ fontSize: "0.82rem" }}>
                  <div className="text-muted mb-1">Período</div>
                  <strong>
                    {vistaDetalle.TF_SOL_FECHA_INICIO?.slice(0, 10)} → {vistaDetalle.TF_SOL_FECHA_FIN?.slice(0, 10)}
                  </strong>
                </div>
              </div>
            </div>

            <div className="mb-4" style={{ fontSize: "0.85rem" }}>
              <p>✅ Si <strong>acepta</strong>, los días de incapacidad quedan registrados.</p>
              <p>❌ Si <strong>rechaza</strong>, el empleado deberá enviar nueva documentación.</p>
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
                Esta incapacidad ya fue procesada: <strong>{estadoTexto}</strong>
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
          {cargandoLista && <p className="text-muted">Cargando incapacidades...</p>}
          {error && <div className="alert alert-danger py-2" style={{ fontSize: "0.85rem" }}>{error}</div>}

          {!cargandoLista && incapacidades.length === 0 && (
            <p className="text-muted">No hay incapacidades reportadas.</p>
          )}

          <div className="row fw-semibold text-muted mb-1 px-2" style={{ fontSize: "0.82rem" }}>
            <div className="col-4">Empleado</div>
            <div className="col-2">Inicio</div>
            <div className="col-2">Fin</div>
            <div className="col-2">Estado</div>
            <div className="col-2">Acción</div>
          </div>

          {incapacidades.map((inc) => {
            const estadoTexto = mapaEstado[inc.TN_EST_ID] || "Pendiente";
            return (
              <div key={inc.TN_SOL_ID} className="card mb-2 p-2 shadow-sm">
                <div className="row align-items-center" style={{ fontSize: "0.82rem" }}>
                  <div className="col-4 fw-semibold">{inc.TC_USU_NOMBRE} {inc.TC_USU_APELLIDOS}</div>
                  <div className="col-2 text-muted">{inc.TF_SOL_FECHA_INICIO?.slice(0, 10)}</div>
                  <div className="col-2 text-muted">{inc.TF_SOL_FECHA_FIN?.slice(0, 10)}</div>
                  <div className="col-2">
                    <span className="badge" style={{ backgroundColor: colorEstado[estadoTexto] || "#aaa" }}>
                      {estadoTexto}
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
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RegistroIncapacidades;