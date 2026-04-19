import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth.service";
import { useAuth } from "../context/AuthContext"; // ← nuevo

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // ← nuevo
  const [form, setForm] = useState({ correo: "", password: "" });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      const result = await loginUser({ correo: form.correo, password: form.password });

      login(result); // ← reemplaza los 4 localStorage.setItem

      if (result.rolId === 1) {
        navigate("/homerrhh");
      } else {
        navigate("/homeempleado");
      }

    } catch (error) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card-custom p-4 w-50">
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="correo"
              className="form-control"
              placeholder="JuanPerez@vivit.co.cr"
              value={form.correo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <div className="alert alert-danger py-2" style={{ fontSize: "0.85rem" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-dark-custom w-100"
            disabled={cargando}
          >
            {cargando ? "Iniciando sesión..." : "Iniciar Sesión"}
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