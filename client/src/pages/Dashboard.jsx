import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale,
  BarElement, PointElement, LineElement, Tooltip, Legend, Filler } from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement,
  PointElement, LineElement, Tooltip, Legend, Filler);

const COLORS = ["#378ADD","#1D9E75","#D85A30","#D4537E","#BA7517","#7F77DD"];
const API = "http://localhost:4000/api";

function HomeDashboard() {
  const [estado, setEstado] = useState([]);
  const [mes, setMes] = useState([]);
  const [depto, setDepto] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch(`${API}/solicitudesEstado`).then(r => r.json()).then(setEstado);
    fetch(`${API}/solicitudesMes`).then(r => r.json()).then(setMes);
    fetch(`${API}/solicitudesDepartamento`).then(r => r.json()).then(setDepto);
    fetch(`${API}/usuariosDepartamento`).then(r => r.json()).then(setUsuarios);
  }, []);

  const total = estado.reduce((s, i) => s + i.CANTIDAD, 0);
  const aprobadas = estado.find(i => i.TC_EST_NOMBRE === "Aprobado")?.CANTIDAD ?? 0;
  const pendientes = estado.find(i => i.TC_EST_NOMBRE === "Pendiente")?.CANTIDAD ?? 0;

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h2>Dashboard administrativo</h2>
        <p className="text-muted">Resumen general del sistema</p>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {[["Total solicitudes", total], ["Aprobadas", aprobadas],
          ["Pendientes", pendientes], ["Usuarios", usuarios.reduce((s,i)=>s+i.CANTIDAD,0)]
        ].map(([label, val]) => (
          <div className="col-6 col-md-3" key={label}>
            <div className="card p-3 text-center shadow-sm">
              <small className="text-muted">{label}</small>
              <h3>{val}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficas */}
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h6>Solicitudes por estado</h6>
            <Pie data={{ labels: estado.map(i => i.TC_EST_NOMBRE),
              datasets: [{ data: estado.map(i => i.CANTIDAD), backgroundColor: COLORS, borderWidth: 0 }]
            }} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h6>Solicitudes por mes</h6>
            <Line data={{ labels: mes.map(i => i.MES),
              datasets: [{ label: "Solicitudes", data: mes.map(i => i.CANTIDAD),
                borderColor: "#378ADD", backgroundColor: "rgba(55,138,221,0.1)",
                tension: 0.4, fill: true }]
            }} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h6>Solicitudes por departamento</h6>
            <Bar options={{ indexAxis: "y" }}
              data={{ labels: depto.map(i => i.TC_DEP_NOMBRE),
                datasets: [{ label: "Solicitudes", data: depto.map(i => i.CANTIDAD),
                  backgroundColor: COLORS, borderRadius: 4, borderWidth: 0 }]
              }} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h6>Usuarios por departamento</h6>
            <Bar data={{ labels: usuarios.map(i => i.TC_DEP_NOMBRE),
              datasets: [{ label: "Usuarios", data: usuarios.map(i => i.CANTIDAD),
                backgroundColor: "#1D9E75", borderRadius: 4, borderWidth: 0 }]
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeDashboard;