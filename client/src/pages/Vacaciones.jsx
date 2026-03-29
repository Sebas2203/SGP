import { useState } from "react";

// Datos mock del empleado (luego vendrán del backend)
const empleadoMock = {
  nombre: "Juan Perez",
  puesto: "Médico",
  avatar: null,
  diasCalendario: 105,
  diasHabiles: 15,
  enProceso: 0,
  aceptados: 0,
  totalDias: 15,
  jefe: "María López Cárdenas",
  adminRRHH: "María López Cárdenas",
  emailRRHH: "Maria@Vivit.co.cr",
  telefono: "+506 2223-4567",
};

function Vacaciones() {
  const [form, setForm] = useState({
    desde: "",
    hasta: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Solicitud vacaciones:", form);
    // TODO: conectar con backend
  };

  return (
    <div className="container mt-4">
      <div className="row g-4">

        {/* Columna izquierda — Perfil del empleado */}
        <div className="col-md-3">
          <div
            className="rounded p-3 text-white text-center mb-3"
            style={{ backgroundColor: "#4DB8B8" }}
          >
            {/* Avatar */}
            <div
              className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
              style={{
                width: 70,
                height: 70,
                backgroundColor: "rgba(255,255,255,0.3)",
                fontSize: 28,
              }}
            >
              👤
            </div>
            <strong>{empleadoMock.nombre}</strong>
            <div style={{ fontSize: "0.85rem" }}>{empleadoMock.puesto}</div>
          </div>

          <div className="card p-3 shadow-sm mb-3" style={{ fontSize: "0.82rem" }}>
            <div className="mb-1"><strong>Días solicitados:</strong><br />1 día / 1 día</div>
          </div>

          <div className="card p-3 shadow-sm" style={{ fontSize: "0.82rem" }}>
            <div className="mb-1 text-muted">Jefe Inmediato</div>
            <div className="mb-2">{empleadoMock.jefe}</div>
            <div className="mb-1 text-muted">Administrador Recursos Humanos</div>
            <div className="mb-2">{empleadoMock.adminRRHH}</div>
            <div className="mb-1 text-muted">{empleadoMock.emailRRHH}</div>
            <div>{empleadoMock.telefono}</div>
          </div>
        </div>

        {/* Columna derecha — Formulario */}
        <div className="col-md-9">

          {/* Resumen de días */}
          <div
            className="rounded p-3 mb-4 text-white d-flex gap-4"
            style={{ backgroundColor: "#4DB8B8", fontSize: "0.85rem" }}
          >
            <div><div className="fw-bold">{empleadoMock.diasCalendario}</div><div>Días calendario</div></div>
            <div><div className="fw-bold">{empleadoMock.diasHabiles}</div><div>Días hábiles</div></div>
            <div><div className="fw-bold">{empleadoMock.enProceso}</div><div>En proceso</div></div>
            <div><div className="fw-bold">{empleadoMock.aceptados}</div><div>Aceptados</div></div>
            <div><div className="fw-bold">{empleadoMock.totalDias}</div><div>Total de días</div></div>
          </div>

          <p className="mb-3">
            Ingresa la fecha de los días que desea disfrutar de sus vacaciones
          </p>

          <form onSubmit={handleSubmit}>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">Desde el</label>
                <input
                  type="date"
                  name="desde"
                  className="form-control"
                  value={form.desde}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Hasta el</label>
                <input
                  type="date"
                  name="hasta"
                  className="form-control"
                  value={form.hasta}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-check mb-2">
              <input type="checkbox" className="form-check-input" id="check1" />
              <label className="form-check-label" htmlFor="check1" style={{ fontSize: "0.85rem" }}>
                Si necesita días adicionales, comuníquese con su jefe para que los autorice.
              </label>
            </div>
            <div className="form-check mb-4">
              <input type="checkbox" className="form-check-input" id="check2" />
              <label className="form-check-label" htmlFor="check2" style={{ fontSize: "0.85rem" }}>
                Entiendo que la solicitud puede tomar unos días para ser procesada.
              </label>
            </div>

            <button type="submit" className="btn btn-dark-custom">
              Solicitar días de Vacaciones
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Vacaciones;