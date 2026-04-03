// client/src/services/incapacidades.service.js
//
// Usa los mismos endpoints que vacaciones pero:
//   - POST /api/addMedicalLeave en lugar de /addVacations
//   - reason: "Incapacidad" en lugar de "Vacaciones"
// El resto de los campos es idéntico

const API_URL = 'http://localhost:4000/api';

function getToken() {
  return localStorage.getItem('token');
}

// Obtiene el userId del token JWT — mismo helper que en vacaciones.service.js
function getUserIdFromToken() {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.TN_USU_ID;
  } catch (e) {
    return null;
  }
}

// ─── SOLICITAR INCAPACIDAD (Empleado) ────────────────────────────────────────
// Endpoint: POST /api/addMedicalLeave
//
// Campos que espera el backend (mismo leave.controller.js):
//   status    → siempre 1 (Pendiente)
//   userId    → TN_USU_ID del token
//   reason    → "Incapacidad" (fijo para esta pantalla)
//   startDate → fecha de inicio
//   endDate   → fecha de fin
//
// NOTA: El backend actual no maneja archivos adjuntos todavía.
// Cuando el back implemente la subida de archivos, se cambiará a FormData.
// Por ahora mandamos solo el JSON con los campos de texto.
export async function solicitarIncapacidad(startDate, endDate) {
  const userId = getUserIdFromToken();

  if (!userId) {
    throw new Error('No hay sesión activa. Por favor iniciá sesión.');
  }

  const body = {
    status: 1,
    userId,
    reason: "Incapacidad", // fijo — diferencia esta solicitud de una de vacaciones
    startDate,
    endDate,
  };

  const response = await fetch(`${API_URL}/addMedicalLeave`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify(body),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || result.message || 'Error al enviar incapacidad');
  }

  return result;
  // Devuelve: { message: "Permiso médico solicitado exitosamente", id: X }
}

// ─── OBTENER SOLICITUDES (RRHH) ───────────────────────────────────────────────
// Reutiliza el mismo endpoint GET /api/getSolicitudes que vacaciones
// El backend devuelve todas las solicitudes sin importar si son vacaciones o incapacidades
// Se pueden filtrar por reason === "Incapacidad" en el front si es necesario
export async function getIncapacidades() {
  const response = await fetch(`${API_URL}/getSolicitudes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Error al obtener incapacidades');
  }

  // Filtramos solo las que tienen reason === "Incapacidad"
  return result.data.filter(s => s.TC_SOL_MOTIVO === "Incapacidad");
}

// ─── ACEPTAR O RECHAZAR INCAPACIDAD (RRHH) ───────────────────────────────────
// Usa el mismo endpoint PUT /api/putEstado que vacaciones
// nuevoEstadoId: 2 = Aprobado, 3 = Rechazado
export async function actualizarEstadoIncapacidad(solicitudId, nuevoEstadoId) {
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
}