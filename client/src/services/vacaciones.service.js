// client/src/services/vacaciones.service.js

const API_URL = 'http://localhost:4000/api';

function getToken() {
  return localStorage.getItem('token');
}

// ─── Obtiene el userId del token JWT guardado en localStorage ─────────────────
// El token contiene todos los datos del usuario — incluyendo TN_USU_ID
// Lo decodificamos para no tener que hacer otra llamada al backend
function getUserIdFromToken() {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.TN_USU_ID; // campo exacto según la tabla TBSGP_A_USUARIO
  } catch (e) {
    return null;
  }
}

// ─── SOLICITAR VACACIONES (Empleado) ─────────────────────────────────────────
// Endpoint: POST /api/addVacations
//
// Campos que espera el backend (leave.controller.js):
//   status    → siempre 1 (Pendiente en TBSGP_A_ESTADO_SOLICITUD)
//   userId    → TN_USU_ID del usuario logueado, lo sacamos del token
//   reason    → "Vacaciones" (fijo para esta pantalla)
//   startDate → fecha de inicio del formulario
//   endDate   → fecha de fin del formulario
export async function solicitarVacaciones(startDate, endDate) {
  const userId = getUserIdFromToken();

  if (!userId) {
    throw new Error('No hay sesión activa. Por favor iniciá sesión.');
  }

  const body = {
    status: 1,          // siempre Pendiente al crear
    userId,             // viene del token JWT
    reason: "Vacaciones", // fijo para esta pantalla
    startDate,
    endDate,
  };

  const response = await fetch(`${API_URL}/addVacations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify(body),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || result.message || 'Error al solicitar vacaciones');
  }

  return result;
  // Devuelve: { message: "Vacaciones solicitadas exitosamente", id: X }
}

// ─── OBTENER SOLICITUDES PENDIENTES (RRHH) ────────────────────────────────────
// Endpoint: GET /api/getSolicitudes
// Devuelve todas las solicitudes pendientes para que RRHH las gestione
export async function getSolicitudes() {
  const response = await fetch(`${API_URL}/getSolicitudes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Error al obtener solicitudes');
  }

  // El backend devuelve { success: true, data: [...] }
  return result.data;
}

// ─── ACEPTAR O RECHAZAR SOLICITUD (RRHH) ─────────────────────────────────────
// Endpoint: PUT /api/putEstado
//
// Campos que espera el backend (RRHH.controller.js):
//   solicitudId  → ID de la solicitud (TN_SOL_ID)
//   nuevoEstadoId → 2 = Aprobado, 3 = Rechazado
export async function actualizarEstadoSolicitud(solicitudId, nuevoEstadoId) {
  const response = await fetch(`${API_URL}/putEstado`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ solicitudId, nuevoEstadoId }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Error al actualizar estado');
  }

  return result;
  // Devuelve: { success: true, message: "Estado de la solicitud actualizado correctamente" }
}