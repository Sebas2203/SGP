import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Recuperacion() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { email };

    console.log("Recuperación:", data);

    // Simula envío de correo y redirige
    navigate("/reset");
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div
        className="card-custom p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h4 className="mb-3">Recuperar contraseña</h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="JuanPerez@vivit.co.cr"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => navigate("/login")}
            >
              Cancelar
            </button>

            <button className="btn btn-dark-custom">
              Enviar correo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Recuperacion;
