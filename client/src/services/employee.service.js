// GET /api/employee/:id → historial de solicitudes del empleado
// (NO es el perfil — devuelve sus vacaciones e incapacidades previas)
//
// Campos que devuelve cada solicitud:
//   "NUMERO SOLICITUD" → ID de la solicitud
//   MOTIVO             → "Vacaciones" o "Incapacidad"
//   "FECHA INICIO"     → fecha de inicio
//   "FECHA FIN"        → fecha de fin
//   ESTADO             → "Pendiente", "Aprobado", "Rechazado"

const API_URL = 'http://localhost:4000/api';

function getToken() {
  return localStorage.getItem('token');
}

// Obtiene el historial completo de solicitudes de un empleado
export async function getHistorialEmpleado(id) {
  const response = await fetch(`${API_URL}/employee/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Error al obtener historial');
  return result.data;
}