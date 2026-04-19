import { Routes, Route, Navigate } from "react-router-dom";

// ← Agrega estos dos imports
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/login";
import Inicio from "./pages/inicio";
import Register from "./pages/register";
import Recuperacion from "./pages/recuperacion";
import NotFound from "./pages/notfound";
import Reset from "./pages/reset";
import HomeEmpleado from "./pages/HomeEmpleado";
import HomeRRHH from "./pages/homeRRHH";
import Vacaciones from "./pages/Vacaciones";
import RegistroVacaciones from "./pages/registroVacaciones";
import Incapacidades from "./pages/Incapacidades";
import RegistroIncapacidades from "./pages/registroIncapacidades";
import HomeDashboard from "./pages/Dashboard";
import NoAutorizado from "./pages/NoAutorizado";

import Navbar from "./components/navbar";

function App() {
  return (
    <AuthProvider>  {/* ← envuelve todo */}
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/Inicio" replace />} />

          {/* Rutas públicas — sin cambios */}
          <Route path="/Inicio"      element={<Inicio />} />
          <Route path="/login"       element={<Login />} />
          <Route path="/register"    element={<Register />} />
          <Route path="/recuperacion" element={<Recuperacion />} />
          <Route path="/reset"       element={<Reset />} />

          {/* Rutas de Empleado — protegidas con rolId 2 */}
          <Route element={<ProtectedRoute rolPermitido={2} />}>
            <Route path="/homeempleado"    element={<HomeEmpleado />} />
            <Route path="/vacaciones"      element={<Vacaciones />} />
            <Route path="/incapacidades"   element={<Incapacidades />} />
          </Route>

          {/* Rutas de RRHH — protegidas con rolId 1 */}
          <Route element={<ProtectedRoute rolPermitido={1} />}>
            <Route path="/homerrhh"               element={<HomeRRHH />} />
            <Route path="/registrovacaciones"     element={<RegistroVacaciones />} />
            <Route path="/registroincapacidades"  element={<RegistroIncapacidades />} />
            <Route path="/dashboard"              element={<HomeDashboard />} />
          </Route>

          {/* 404 */}
          <Route path="/no-autorizado" element={<NoAutorizado />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;