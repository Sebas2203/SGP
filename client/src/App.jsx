import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login";
import Inicio from "./pages/inicio";
import Register from "./pages/register";
import Recuperacion from "./pages/recuperacion";
import NotFound from "./pages/notfound";
import Reset from "./pages/reset";

// Pantallas nuevas
import HomeEmpleado from "./pages/homeEmpleado";
import HomeRRHH from "./pages/homeRRHH";
import Vacaciones from "./pages/vacaciones";
import RegistroVacaciones from "./pages/registroVacaciones";
import Incapacidades from "./pages/Incapacidades";
import RegistroIncapacidades from "./pages/registroIncapacidades";

import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          {/* Redirige la raíz "/" automáticamente a /Inicio */}
          <Route path="/" element={<Navigate to="/Inicio" replace />} />

          {/* Rutas públicas */}
          <Route path="/Inicio" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recuperacion" element={<Recuperacion />} />
          <Route path="/reset" element={<Reset />} />

          {/* Rutas de empleado */}
          <Route path="/home-empleado" element={<HomeEmpleado />} />
          <Route path="/vacaciones" element={<Vacaciones />} />
          <Route path="/incapacidades" element={<Incapacidades />} />

          {/* Rutas de RRHH */}
          <Route path="/home-rrhh" element={<HomeRRHH />} />
          <Route path="/registro-vacaciones" element={<RegistroVacaciones />} />
          <Route path="/registro-incapacidades" element={<RegistroIncapacidades />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;