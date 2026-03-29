import { useNavigate } from "react-router-dom";

function HomeRRHH() {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center mt-5">
      <div style={{ maxWidth: "700px", width: "100%" }}>

        {/* Bienvenida */}
        <div className="text-center mb-4">
          <h2>¡Bienvenido Usuario RRHH!</h2>
          <p className="text-muted">
            En el centro de solicitudes puedes administrar los permisos.
          </p>
        </div>

        {/* Cards */}
        <div className="row g-4">

          {/* Gestión Vacaciones */}
          <div className="col-md-6">
            <div className="card h-100 p-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Gestión de Vacaciones</h5>
                <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
                  Aquí puedes ver las solicitudes de vacaciones que han
                  hecho los empleados para aceptarlas o rechazarlas.
                </p>
                <button
                  className="btn btn-dark-custom mt-2"
                  onClick={() => navigate("/registrovacaciones")}
                >
                  Gestionar Vacaciones
                </button>
              </div>
            </div>
          </div>

          {/* Gestión Incapacidades */}
          <div className="col-md-6">
            <div className="card h-100 p-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Gestión de Incapacidades</h5>
                <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
                  Aquí puedes ver las incapacidades que han reportado los
                  empleados para aceptarlas o rechazarlas.
                </p>
                <button
                  className="btn btn-dark-custom mt-2"
                  onClick={() => navigate("/registroincapacidades")}
                >
                  Gestionar Incapacidades
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default HomeRRHH;