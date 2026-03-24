import { Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Inicio from "./pages/inicio";
import Register from "./pages/register";
import Recuperacion from "./pages/recuperacion";
import NotFound from "./pages/notfound";
import Reset from "./pages/reset";


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
          <Route path="*" element={<NotFound />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
