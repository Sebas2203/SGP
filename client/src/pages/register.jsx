// client/src/pages/register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.service";

// Departamentos según la tabla TBSGP_A_DEPARTAMENTO del SQL
const DEPARTAMENTOS = [
  { id: 1, nombre: "Recursos Humanos" },
  { id: 2, nombre: "Tecnología" },
  { id: 3, nombre: "Finanzas" },
  { id: 4, nombre: "Ventas" },
  { id: 5, nombre: "Operaciones" },
];

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    identificacion: "",
    correo: "",
    password: "",
    confirmPassword: "",
    fechaNacimiento: "",
    depId: "",
    notificaciones: false,
  });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setCargando(true);

    // Solo enviamos los campos que el backend espera
    // El rol (TN_ROL_ID) siempre será 2 (Empleado) — lo asigna el backend
    const payload = {
      nombre: form.nombre,
      apellidos: form.apellidos,
      identificacion: form.identificacion,
      correo: form.correo,
      password: form.password,
      fechaNacimiento: form.fechaNacimiento,
      depId: parseInt(form.depId), // asegurar que llegue como número
    };

    try {
      await registerUser(payload);
      // Redirige al login para que el usuario inicie sesión con sus credenciales
      navigate("/login");
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
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              placeholder="Juan"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Apellidos</label>
            <input
              type="text"
              name="apellidos"
              className="form-control"
              placeholder="Pérez Rodríguez"
              value={form.apellidos}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Identificación</label>
            <input
              type="text"
              name="identificacion"
              className="form-control"
              placeholder="1-1234-5678"
              value={form.identificacion}
              onChange={handleChange}
              required
            />
          </div>

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
            <label>Fecha de nacimiento</label>
            <input
              type="date"
              name="fechaNacimiento"
              className="form-control"
              value={form.fechaNacimiento}
              onChange={handleChange}
              required
            />
          </div>

          {/* Select con los departamentos de la DB — ya no es un input numérico */}
          <div className="mb-3">
            <label>Departamento</label>
            <select
              name="depId"
              className="form-control"
              value={form.depId}
              onChange={handleChange}
              required
            >
              <option value="">Seleccioná tu departamento</option>
              {DEPARTAMENTOS.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.nombre}
                </option>
              ))}
            </select>
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

          <div className="mb-3">
            <label>Confirmar contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              name="notificaciones"
              className="form-check-input"
              id="notif"
              checked={form.notificaciones}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="notif">
              Permiso para notificaciones
            </label>
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
            {cargando ? "Registrando..." : "Registrar"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Register;