// Lee los datos del usuario desde el token JWT en localStorage.
// IMPORTANTE: llamar esta función DENTRO del componente (no fuera),
// para que se ejecute cada vez que el componente se monta y el
// token ya esté disponible en localStorage.

export function getUsuarioActual() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));

    // Campos exactos confirmados del token:
    // TN_USU_ID, TN_DEP_ID, TN_ROL_ID, TC_USU_NOMBRE, TC_USU_APELLIDOS
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
    return null;
  }
}