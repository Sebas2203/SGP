import { useNavigate } from "react-router-dom";

function HomeRRHH() {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center mt-5">
      <div style={{ maxWidth: "750px", width: "100%" }}>

        <div className="text-center mb-4">
          <h2>¡Bienvenido usuario RRHH!</h2>
          <p className="text-muted">
            En el centro de solicitudes puedes administrar los permisos.
          </p>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="card h-100 p-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Gestión de vacaciones</h5>
                <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
                  Aquí puedes ver las solicitudes de vacaciones que han
                  hecho los empleados para aceptarlas o rechazarlas.
                </p>
                <button className="btn btn-dark-custom mt-2"
                  onClick={() => navigate("/registroVacaciones")}>
                  Gestionar vacaciones
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card h-100 p-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Gestión de incapacidades</h5>
                <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
                  Aquí puedes ver las incapacidades que han reportado los
                  empleados para aceptarlas o rechazarlas.
                </p>
                <button className="btn btn-dark-custom mt-2"
                  onClick={() => navigate("/registroIncapacidades")}>
                  Gestionar incapacidades
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Botón Dashboard */}
        <div className="card p-3 shadow-sm text-center">
          <h5 className="card-title mb-1">Dashboard administrativo</h5>
          <p className="text-muted mb-3" style={{ fontSize: "0.9rem" }}>
            Visualizá estadísticas generales: solicitudes por estado, por mes,
            por departamento y usuarios activos.
          </p>
          <div>
            <button className="btn btn-dark-custom"
              onClick={() => navigate("/dashboard")}>
              Ver dashboard
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HomeRRHH;