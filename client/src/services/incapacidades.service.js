// client/src/services/incapacidades.service.js

const API_URL = 'http://localhost:4000/api';

function getToken() {
  return localStorage.getItem('token');
}

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

// ─── SOLICITAR INCAPACIDAD CON ARCHIVO ───────────────────────────────────────
// Endpoint: POST /api/addMedicalLeave
//
// Usa FormData porque necesita enviar el archivo junto con los datos.
// multer en el back recibe el archivo en el campo "archivo"
// y los demás campos en req.body.
//
// IMPORTANTE: No ponemos Content-Type en los headers —
// el navegador lo asigna automáticamente con el boundary correcto
// cuando el body es FormData.
export async function solicitarIncapacidad(startDate, endDate, archivo) {
  const userId = getUserIdFromToken();

  if (!userId) {
    throw new Error('No hay sesión activa. Por favor iniciá sesión.');
  }

  // Construimos el FormData con todos los campos
  const formData = new FormData();
  formData.append('status', 1);           // siempre Pendiente
  formData.append('userId', userId);       // del token JWT
  formData.append('reason', 'Incapacidad'); // fijo
  formData.append('startDate', startDate);
  formData.append('endDate', endDate);

  // Solo adjuntamos el archivo si fue seleccionado
  if (archivo) {
    formData.append('archivo', archivo);  // debe llamarse "archivo" — igual que en multer
  }

  const response = await fetch(`${API_URL}/addMedicalLeave`, {
    method: 'POST',
    headers: {
      // NO incluir Content-Type aquí — FormData lo maneja automáticamente
      'Authorization': `Bearer ${getToken()}`,
    },
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || result.message || 'Error al enviar incapacidad');
  }

  return result;
  // Devuelve: { message: "Permiso médico solicitado exitosamente", id: X, archivoUrl: "/uploads/..." }
}

// ─── OBTENER INCAPACIDADES (RRHH) ─────────────────────────────────────────────
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

  return result.data.filter(s => s.TC_SOL_MOTIVO === 'Incapacidad');
}

// ─── ACTUALIZAR ESTADO (RRHH) ─────────────────────────────────────────────────
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