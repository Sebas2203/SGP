// client/src/services/usuario.service.js
//
// Lee los datos del usuario desde el token JWT.
// IMPORTANTE: usa decodeURIComponent + escape para manejar
// correctamente tildes y caracteres especiales en nombres
// como "Díaz", "García", "Pérez", etc.

export function getUsuarioActual() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    // Decodificación correcta de base64 con soporte de UTF-8
    // Esto resuelve el problema de tildes y caracteres especiales
    const base64 = token.split('.')[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const payload = JSON.parse(jsonPayload);

    return {
      id: payload.TN_USU_ID,
      nombre: payload.TC_USU_NOMBRE,
      apellidos: payload.TC_USU_APELLIDOS,
      correo: payload.TC_USU_CORREO,
      depId: payload.TN_DEP_ID,
      rolId: payload.TN_ROL_ID,
      nombreCompleto: `${payload.TC_USU_NOMBRE} ${payload.TC_USU_APELLIDOS}`,
    };
  } catch (e) {
    console.error('Error decodificando token:', e);
    return null;
  }
}