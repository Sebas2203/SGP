import { useState } from "react";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("JSON login:", form);
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
              placeholder="JuanPerez@vivit.co.cr"
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

          <button className="btn btn-dark-custom w-100">
            Iniciar Sesión
          </button>

          <div className="mt-3">
            <a href="/recuperacion">¿Olvidó su contraseña?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
