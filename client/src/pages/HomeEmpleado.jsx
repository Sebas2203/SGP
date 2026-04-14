import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import  {checkBirthdayNotification}  from "../js/birthday";




function HomeEmpleado() {
  const navigate = useNavigate();

    useEffect(() => {
    const birthdate = localStorage.getItem('birthdate');
    if (birthdate) {
      checkBirthdayNotification(birthdate);
    }
  }, []);

  // Datos del usuario 
  const usuario = {
    nombre: "usuario empleado",
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
                <h5 className="card-title">Vacaciones</h5>
                <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
                  Aquí puedes solicitar tus vacaciones y revisar el estado de tus solicitudes anteriores. 
                  Recuerda que las vacaciones deben ser aprobadas por tu supervisor.
                </p>
                <button
                  className="btn btn-dark-custom mt-2"
                  onClick={() => navigate("/vacaciones")}
                >
                  Solicitar vacaciones
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
                  Subir incapacidad
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