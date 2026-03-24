import { useState } from "react";

function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    notificaciones: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("JSON register:", form);
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card-custom p-4 w-50">
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Confirmar Contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              name="notificaciones"
              className="form-check-input"
              onChange={handleChange}
            />
            <label className="form-check-label">
              Permiso para notificaciones
            </label>
          </div>

          <button className="btn btn-dark-custom w-100">
            Registrar
          </button>

        </form>
      </div>
    </div>
  );
}

export default Register;
