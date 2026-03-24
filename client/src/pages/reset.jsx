import { useState } from "react";

function Reset() {
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    console.log("Nueva contraseña:", form);
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card-custom p-4 w-50">

        <h4 className="mb-3">Restablecer contraseña</h4>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label>Nueva contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Confirmar contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-dark-custom w-100">
            Guardar nueva contraseña
          </button>

        </form>
      </div>
    </div>
  );
}

export default Reset;
