import { useNavigate } from "react-router-dom";

function HomeEmpleado() {
  const navigate = useNavigate();

  // Datos del usuario (luego vendrán del backend / contexto)
  const usuario = {
    nombre: "Usuario Empleado",
    avatar: null,
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div style={{ maxWidth: "700px", width: "100%" }}>

        {/* Bienvenida */}
        <div className="text-center mb-4">
          <h2>¡Bienvenido {usuario.nombre}!</h2>
          <p className="text-muted">
            En el centro de solicitudes puedes buscar o solicitar tus permisos.
          </p>
        </div>

        {/* Cards */}
        <div className="row g-4">

          {/* Vacaciones */}
          <div className="col-md-6">
            <div className="card h-100 p-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Vacaciones Acumuladas</h5>
                <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
                  Aquí puedes ver las fechas en las que el área de
                  vacaciones ha aceptado o rechazado tus solicitudes.
                </p>
                <button
                  className="btn btn-dark-custom mt-2"
                  onClick={() => navigate("/vacaciones")}
                >
                  Solicitar Vacaciones
                </button>
              </div>
            </div>
          </div>

          {/* Incapacidades */}
          <div className="col-md-6">
            <div className="card h-100 p-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Incapacidades</h5>
                <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
                  Si te encuentras incapacitado, recuerda que debes
                  notificarlo para que el área de RRHH pueda procesarlo.
                </p>
                <button
                  className="btn btn-dark-custom mt-2"
                  onClick={() => navigate("/incapacidades")}
                >
                  Subir Incapacidad
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default HomeEmpleado;