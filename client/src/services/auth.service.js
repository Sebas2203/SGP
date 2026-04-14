
// URL base del backend — incluye /api porque así está configurado en app.js
const API_URL = 'http://localhost:4000/api';

// ─── Decodifica el token JWT sin librería externa ─────────────────────────────
// El token tiene 3 partes separadas por puntos: header.payload.firma
// El payload (parte del medio) está en base64 y contiene los datos del usuario
export function decodificarToken(token) {
  try {
    const payload = token.split('.')[1];
    const decodificado = atob(payload);
    return JSON.parse(decodificado);
  } catch (e) {
    return null;
  }
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
// Endpoint: POST /api/login
// Recibe: { correo, password }
// Devuelve: { message, user, token }
export async function loginUser(data) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Error al iniciar sesión');
  }

  // Decodifica el token para obtener el rol del usuario
  const datosToken = decodificarToken(result.token);

  return {
    token: result.token,
    nombre: result.user,
    birthdate: result.birthdate,
    rolId: datosToken?.TN_ROL_ID ?? null,
    // TN_ROL_ID: 1 = Administrador (RRHH)
    // TN_ROL_ID: 2 = Empleado
  };
}

// ─── REGISTER ─────────────────────────────────────────────────────────────────
// Endpoint: POST /api/register
// Recibe: { nombre, apellidos, identificacion, correo, password, fechaNacimiento, depId }
// Devuelve: { message, token }
export async function registerUser(data) {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Error al registrar usuario');
  }

  // El register siempre asigna TN_ROL_ID = 2 (Empleado)
  return result;
}