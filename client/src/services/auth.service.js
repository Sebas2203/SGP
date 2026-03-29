const API_URL = 'http://localhost:4000/api';

// ─── Decodifica el token JWT sin librería externa ─────────────────────────────
// El token tiene 3 partes: header.payload.firma
// El payload del medio contiene los datos del usuario en base64
export function decodificarToken(token) {
  try {
    const payload = token.split('.')[1];   // toma la parte del medio
    const decodificado = atob(payload);    // base64 → texto
    return JSON.parse(decodificado);       // texto → objeto JS
  } catch (e) {
    return null;
  }
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
export async function loginUser(data) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    // data = { correo: "...", password: "..." }
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Error al iniciar sesión');
  }

  // Decodifica el token para leer el rol sin llamar al back de nuevo
  const datosToken = decodificarToken(result.token);

  return {
    token: result.token,
    nombre: result.user,
    rolId: datosToken?.TN_ROL_ID ?? null,
    // TN_ROL_ID: 1 = Administrador (RRHH)
    // TN_ROL_ID: 2 = Empleado
  };
}

// ─── REGISTER ─────────────────────────────────────────────────────────────────
export async function registerUser(data) {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    // data = { nombre, apellidos, identificacion,
    //          correo, password, fechaNacimiento, depId }
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Error al registrar usuario');
  }

  // El register siempre asigna TN_ROL_ID = 2 (Empleado)
  return result;
}