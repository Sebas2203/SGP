import { useState } from "react";

const empleadoMock = {
  nombre: "Juan Perez",
  puesto: "Médico",
  jefe: "María López Cárdenas",
  adminRRHH: "María López Cárdenas",
  emailRRHH: "Maria@Vivit.co.cr",
  telefono: "+506 2223-4567",
};

function Incapacidades() {
  const [form, setForm] = useState({
    desde: "",
    hasta: "",
    archivo: null,
    aceptaCondiciones: false,
    entiendeProcesoL: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Solicitud incapacidad:", form);
    // TODO: conectar con backend (FormData para el archivo)
  };

  return (
    <div className="container mt-4">
      <div className="row g-4">

        {/* Columna izquierda — Perfil */}
        <div className="col-md-3">
          <div
            className="rounded p-3 text-white text-center mb-3"
            style={{ backgroundColor: "#4DB8B8" }}
          >
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
            <div className="text-muted mb-1">Días de incapacidad</div>
            <div>1 día / 1 día</div>
          </div>

          <div className="card p-3 shadow-sm" style={{ fontSize: "0.82rem" }}>
            <div className="text-muted mb-1">Jefe Inmediato</div>
            <div className="mb-2">{empleadoMock.jefe}</div>
            <div className="text-muted mb-1">Administrador Recursos Humanos</div>
            <div className="mb-2">{empleadoMock.adminRRHH}</div>
            <div className="mb-1">{empleadoMock.emailRRHH}</div>
            <div>{empleadoMock.telefono}</div>
          </div>
        </div>

        {/* Columna derecha — Formulario */}
        <div className="col-md-9">

          <p className="mb-1 fw-semibold">
            Adjunta aquí el documento oficial de tu incapacidad:
          </p>

          {/* Zona de subida de archivo */}
          <div
            className="border rounded p-4 text-center mb-4"
            style={{ borderStyle: "dashed", cursor: "pointer", backgroundColor: "#f9f9f9" }}
            onClick={() => document.getElementById("archivoInput").click()}
          >
            <div style={{ fontSize: 28 }}>⬆️</div>
            <div style={{ fontSize: "0.85rem", color: "#666" }}>
              {form.archivo ? form.archivo.name : "Haz clic para subir el archivo"}
            </div>
            <input
              id="archivoInput"
              type="file"
              name="archivo"
              accept=".pdf,.jpg,.png"
              style={{ display: "none" }}
              onChange={handleChange}
            />
          </div>

          <p className="mb-3">
            Ingresa la fecha de los días efectivos de tu incapacidad
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
              <input
                type="checkbox"
                name="aceptaCondiciones"
                className="form-check-input"
                id="check1"
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="check1" style={{ fontSize: "0.85rem" }}>
                Si la incapacidad, requiere días adicionales, comuníquese con RRHH para informarlo.
              </label>
            </div>
            <div className="form-check mb-4">
              <input
                type="checkbox"
                name="entiendeProcesoL"
                className="form-check-input"
                id="check2"
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="check2" style={{ fontSize: "0.85rem" }}>
                Entiendo que la incapacidad puede tomar unos días para ser procesada.
              </label>
            </div>

            <button type="submit" className="btn btn-dark-custom">
              Enviar datos a procesar
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Incapacidades;