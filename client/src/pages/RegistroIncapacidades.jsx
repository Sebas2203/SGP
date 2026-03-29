import { useState } from "react";

// Datos mock — luego vienen del backend
const empleadosMock = [
  { id: 1, nombre: "Micaela Solano", dni: "1-0987-CN", fecha: "", accion: null },
  { id: 2, nombre: "José Pablo Solis", dni: "09/17/CN", fecha: "", accion: null },
  { id: 3, nombre: "David Martínez", dni: "1-00523-CN", fecha: "", accion: null },
  { id: 4, nombre: "Marco Ruiz", dni: "9/881/34", fecha: "", accion: null },
  { id: 5, nombre: "Pedro Naranjo", dni: "9/916/34", fecha: "", accion: null },
  { id: 6, nombre: "Lucy Paz Díaz", dni: "1-49234", fecha: "", accion: null },
  { id: 7, nombre: "Fabio Murga", dni: "9/80g-35", fecha: "", accion: null },
];

const perfilMock = {
  nombre: "Juan Perez",
  puesto: "Médico",
  jefe: "María López Cárdenas",
  adminRRHH: "María López Cárdenas",
  email: "Maria@Vivit.co.cr",
  telefono: "+506 2223-4567",
};

function RegistroIncapacidades() {
  const [perfilActivo, setPerfilActivo] = useState(perfilMock);
  const [vistaDetalle, setVistaDetalle] = useState(null);

  if (vistaDetalle) {
    return (
      <DetalleIncapacidad
        empleado={vistaDetalle}
        onVolver={() => setVistaDetalle(null)}
      />
    );
  }

  return (
    <div className="container mt-4">
      <div className="row g-4">

        {/* Columna izquierda — Perfil */}
        <div className="col-md-3">
          <h4 className="fw-bold">Registro de<br />incapacidades</h4>
          <p className="text-muted" style={{ fontSize: "0.85rem" }}>
            Empleados que han solicitado una incapacidad
          </p>

          <div
            className="rounded p-3 text-white text-center"
            style={{ backgroundColor: "#4DB8B8" }}
          >
            <div
              className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
              style={{
                width: 60,
                height: 60,
                backgroundColor: "rgba(255,255,255,0.3)",
                fontSize: 24,
              }}
            >
              👤
            </div>
            <strong>{perfilActivo.nombre}</strong>
            <div style={{ fontSize: "0.82rem" }}>{perfilActivo.puesto}</div>
          </div>

          <div className="card p-3 mt-3 shadow-sm" style={{ fontSize: "0.80rem" }}>
            <div className="text-muted mb-1">Jefe Inmediato</div>
            <div className="mb-2">{perfilActivo.jefe}</div>
            <div className="text-muted mb-1">Administrador Recursos Humanos</div>
            <div className="mb-2">{perfilActivo.adminRRHH}</div>
            <div className="mb-1">{perfilActivo.email}</div>
            <div>{perfilActivo.telefono}</div>
          </div>
        </div>

        {/* Columna derecha — Tabla */}
        <div className="col-md-9">
          <div className="row fw-semibold text-muted mb-1 px-2" style={{ fontSize: "0.82rem" }}>
            <div className="col-4">Empleado</div>
            <div className="col-3">DNI</div>
            <div className="col-3">Inicio incapacidad</div>
            <div className="col-2">Acción</div>
          </div>

          {empleadosMock.map((emp) => (
            <div
              key={emp.id}
              className="card mb-2 p-2 shadow-sm"
              style={{ cursor: "pointer" }}
              onClick={() => setPerfilActivo({ ...perfilMock, nombre: emp.nombre })}
            >
              <div className="row align-items-center" style={{ fontSize: "0.82rem" }}>
                <div className="col-4 fw-semibold">{emp.nombre}</div>
                <div className="col-3 text-muted">{emp.dni}</div>
                <div className="col-3 text-muted">{emp.fecha || "—"}</div>
                <div className="col-2">
                  <button
                    className="btn btn-sm btn-outline-secondary py-0"
                    style={{ fontSize: "0.75rem" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setVistaDetalle(emp);
                    }}
                  >
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

// Vista de detalle individual de incapacidad
function DetalleIncapacidad({ empleado, onVolver }) {
  const handleAceptar = () => {
    console.log("Aceptar incapacidad:", empleado.id);
    // TODO: conectar con backend
    onVolver();
  };

  const handleRechazar = () => {
    console.log("Rechazar incapacidad:", empleado.id);
    // TODO: conectar con backend
    onVolver();
  };

  return (
    <div className="container mt-4">
      <div className="row g-4">

        {/* Columna izquierda — Perfil */}
        <div className="col-md-3">
          <h4 className="fw-bold">Registro<br />Individual<br />de Incapacidad</h4>

          <div
            className="rounded p-3 text-white text-center mt-3"
            style={{ backgroundColor: "#4DB8B8" }}
          >
            <div
              className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
              style={{
                width: 60,
                height: 60,
                backgroundColor: "rgba(255,255,255,0.3)",
                fontSize: 24,
              }}
            >
              👤
            </div>
            <strong>{empleado.nombre}</strong>
            <div style={{ fontSize: "0.82rem" }}>Médico</div>
          </div>

          <div className="card p-3 mt-3 shadow-sm" style={{ fontSize: "0.80rem" }}>
            <div className="text-muted mb-1">Jefe Inmediato</div>
            <div className="mb-2">María López Cárdenas</div>
            <div className="text-muted mb-1">Administrador Recursos Humanos</div>
            <div className="mb-2">María López Cárdenas</div>
            <div className="mb-1">Maria@Vivit.co.cr</div>
            <div>+506 2223-4567</div>
          </div>
        </div>

        {/* Columna derecha — Detalle */}
        <div className="col-md-9">

          {/* Zona archivo */}
          <div
            className="border rounded p-3 mb-4 d-flex align-items-center gap-2"
            style={{ backgroundColor: "#f9f9f9" }}
          >
            <span style={{ fontSize: 20 }}>📄</span>
            <span style={{ fontSize: "0.85rem" }}>
              Comprobante/Incapacidad del CCSS.PDF
            </span>
          </div>

          <h5 className="fw-bold text-center mb-4">
            Información de la<br />incapacidad y el Empleado
          </h5>

          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="card p-3 text-center shadow-sm" style={{ fontSize: "0.82rem" }}>
                <div
                  className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#4DB8B8",
                    color: "#fff",
                    fontSize: 20,
                  }}
                >
                  👤
                </div>
                <strong>{empleado.nombre}</strong>
                <div className="text-muted">Médico</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 text-center shadow-sm" style={{ fontSize: "0.82rem" }}>
                <div className="text-muted mb-1">Causa incapacidad</div>
                <div>Fractura de tobillo</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 text-center shadow-sm" style={{ fontSize: "0.82rem" }}>
                <div className="text-muted mb-1">Días de incapacidad</div>
                <div>Online - 5 día</div>
              </div>
            </div>
          </div>

          <div className="mb-3" style={{ fontSize: "0.85rem" }}>
            <p>✅ Si acepta la incapacidad, los días se deducirán de las vacaciones del empleado.</p>
            <p>❌ Si rechaza la incapacidad, deberá comunicar la razón y solicitar al empleado una nueva.</p>
          </div>

          <div className="d-flex gap-3">
            <button className="btn btn-dark-custom" onClick={handleAceptar}>
              Aceptar
            </button>
            <button
              className="btn btn-danger"
              onClick={handleRechazar}
            >
              Rechazar
            </button>
          </div>

          <button
            className="btn btn-link mt-3 p-0"
            onClick={onVolver}
            style={{ fontSize: "0.85rem" }}
          >
            ← Volver al registro
          </button>
        </div>

      </div>
    </div>
  );
}

export default RegistroIncapacidades;