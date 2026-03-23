import { pool } from "../database/db.js";

//buscar usuario por correo
export const findByCorreoOIdentificacion = async (correo, identificacion) => {
  const [rows] = await pool.query(
    `SELECT * FROM TBSGP_A_USUARIO 
     WHERE TC_USU_CORREO = ? OR TC_USU_IDENTIFICACION = ?`,
    [correo, identificacion],
  );
  return rows[0];
};

export const crearUsuario = async (
  depId,
  nombre,
  apellidos,
  identificacion,
  correo,
  password,
  fechaNacimiento,
) => {
  const [result] = await pool.query(
    `INSERT INTO TBSGP_A_USUARIO 
     (TN_DEP_ID, TN_ROL_ID, TC_USU_NOMBRE, TC_USU_APELLIDOS, TC_USU_IDENTIFICACION, TC_USU_CORREO, TC_USU_PASSWORD, TF_USU_FECHA_NACIMIENTO)
     VALUES (?, 2, ?, ?, ?, ?, ?, ?)`,
    [
      depId,
      nombre,
      apellidos,
      identificacion,
      correo,
      password,
      fechaNacimiento,
    ],
  );
  return result.insertId;
};
