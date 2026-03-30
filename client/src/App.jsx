import { Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Inicio from "./pages/inicio";
import Register from "./pages/register";
import Recuperacion from "./pages/recuperacion";
import NotFound from "./pages/notfound";
import Reset from "./pages/reset";
import HomeEmpleado from "./pages/HomeEmpleado";
import HomeRRHH from "./pages/HomeRRHH";
import Vacaciones from "./pages/Vacaciones";
import RegistroVacaciones from "./pages/RegistroVacaciones";
import Incapacidades from "./pages/Incapacidades";
import RegistroIncapacidades from "./pages/RegistroIncapacidades";

import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/Inicio" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recuperacion" element={<Recuperacion />} />
          <Route path="/reset" element={<Reset />} />

          {/* Rutas de empleado */}
          <Route path="/homeempleado" element={<HomeEmpleado />} />
          <Route path="/vacaciones" element={<Vacaciones />} />
          <Route path="/incapacidades" element={<Incapacidades />} />

          {/* Rutas de RRHH */}
          <Route path="/homerrhh" element={<HomeRRHH />} />
          <Route path="/registrovacaciones" element={<RegistroVacaciones />} />
          <Route
            path="/registroincapacidades"
            element={<RegistroIncapacidades />}
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
