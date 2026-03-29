import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Datos mock — luego vienen del backend
const empleadosMock = [
  {
    id: 1,
    nombre: "Juan Perez Solis",
    diasCalendario: 2.6,
    diasHabiles: 0,
    terminados: 2,
    estado: "Pendiente",
  },
  {
    id: 2,
    nombre: "Lucy Martínez",
    diasCalendario: 10,
    diasHabiles: 2,
    terminados: 2,
    estado: "Pendiente",
  },
  {
    id: 3,
    nombre: "David Martínez",
    diasCalendario: 4,
    diasHabiles: 0,
    terminados: 1,
    estado: "Aceptados",
  },
  {
    id: 4,
    nombre: "Michael Arboe",
    diasCalendario: 1,
    diasHabiles: 0,
    terminados: 6,
    estado: "Rechazados",
  },
  {
    id: 5,
    nombre: "Abiana Ingeniosa",
    diasCalendario: 12.3,
    diasHabiles: 4,
    terminados: 2,
    estado: "Aceptados",
  },
  {
    id: 6,
    nombre: "Abby Schmit",
    diasCalendario: 0,
    diasHabiles: 0,
    terminados: 0,
    estado: "Pendiente",
  },
  {
    id: 7,
    nombre: "Miguel Ángel Soto",
    diasCalendario: 0.2,
    diasHabiles: 5,
    terminados: 2,
    estado: "Rechazados",
  },
];

const empleadoSeleccionadoMock = {
  nombre: "Martín López",
  puesto: "Médico",
  antiguedad: "4 años activo",
  jefe: "Martín López Cárdenas",
  adminRRHH: "Martín López Cárdenas",
  email: "Martín@Vivit.co.cr",
  telefono: "+506 2223-4567",
};

const estadoColor = {
  Pendiente: "#aaa",
  Aceptados: "#4DB8B8",
  Rechazados: "#e05c5c",
};

function RegistroVacaciones() {
  const [empleadoActivo, setEmpleadoActivo] = useState(empleadoSeleccionadoMock);
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <div className="row g-4">

        {/* Columna izquierda — Perfil */}
        <div className="col-md-3">
          <h4 className="fw-bold">Registro de<br />Vacaciones</h4>
          <p className="text-muted" style={{ fontSize: "0.85rem" }}>
            Empleados que han solicitado Vacaciones
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
            <strong>{empleadoActivo.nombre}</strong>
            <div style={{ fontSize: "0.82rem" }}>{empleadoActivo.puesto}</div>
            <div style={{ fontSize: "0.78rem" }}>{empleadoActivo.antiguedad}</div>
          </div>

          <div className="card p-3 mt-3 shadow-sm" style={{ fontSize: "0.80rem" }}>
            <div className="text-muted mb-1">Jefe Inmediato</div>
            <div className="mb-2">{empleadoActivo.jefe}</div>
            <div className="text-muted mb-1">Administrador Recursos Humanos</div>
            <div className="mb-2">{empleadoActivo.adminRRHH}</div>
            <div className="mb-1">{empleadoActivo.email}</div>
            <div>{empleadoActivo.telefono}</div>
          </div>
        </div>

        {/* Columna derecha — Tabla */}
        <div className="col-md-9">
          {empleadosMock.map((emp) => (
            <div
              key={emp.id}
              className="card mb-2 p-2 shadow-sm"
              style={{ cursor: "pointer" }}
              onClick={() => setEmpleadoActivo({ ...empleadoSeleccionadoMock, nombre: emp.nombre })}
            >
              <div className="row align-items-center" style={{ fontSize: "0.82rem" }}>
                <div className="col-3 fw-semibold">{emp.nombre}</div>
                <div className="col-2 text-center">{emp.diasCalendario}</div>
                <div className="col-2 text-center">{emp.diasHabiles}</div>
                <div className="col-2 text-center">{emp.terminados}</div>
                <div className="col-3 text-end">
                  <span
                    className="badge"
                    style={{
                      backgroundColor: estadoColor[emp.estado] || "#aaa",
                      color: "#fff",
                      fontSize: "0.78rem",
                    }}
                  >
                    {emp.estado}
                  </span>
                  {" "}
                  <button
                    className="btn btn-sm btn-outline-secondary py-0"
                    style={{ fontSize: "0.75rem" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/registro-vacaciones/${emp.id}`);
                    }}
                  >
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

export default RegistroVacaciones;