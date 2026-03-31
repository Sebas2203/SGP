import { pool } from "../database/db.js";



//CONSULTAS PARA CREACION DE LOS DASHBOARD 

//Solicitudes por estado 
export const solicitudesPorEstado = async () => {
  const [rows] = await pool.query(
    `SELECT 
E.TC_EST_NOMBRE,
COUNT(*) AS CANTIDAD
FROM TBSGP_H_SOLICITUD_PERMISO S
JOIN TBSGP_A_ESTADO_SOLICITUD E 
ON S.TN_EST_ID = E.TN_EST_ID
GROUP BY E.TC_EST_NOMBRE`
  );
  return rows;
};



//solicitudes por departamento 

export const solicitudesPorDepartamento = async () => {
  const [rows] = await pool.query(
    `SELECT 
D.TC_DEP_NOMBRE,
COUNT(*) AS TOTAL
FROM TBSGP_H_SOLICITUD_PERMISO S
JOIN TBSGP_A_USUARIO U 
ON S.TN_USU_ID = U.TN_USU_ID
JOIN TBSGP_A_DEPARTAMENTO D 
ON U.TN_DEP_ID = D.TN_DEP_ID
GROUP BY D.TC_DEP_NOMBRE`
  );
  return rows;
};

//solicitudes por mes 
export const solicitudesPorMes = async () => {
  const [rows] = await pool.query(
    `SELECT 
MONTH(TF_SOL_FECHA_INICIO) AS MES,
COUNT(*) AS TOTAL
FROM TBSGP_H_SOLICITUD_PERMISO
GROUP BY MONTH(TF_SOL_FECHA_INICIO)`
  );
  return rows;
};

//usuarios por departamento
export const usuariosPorDepartamento = async () => {
  const [rows] = await pool.query(
    `SELECT 
D.TC_DEP_NOMBRE,
COUNT(*) AS TOTAL
FROM TBSGP_A_USUARIO U
JOIN TBSGP_A_DEPARTAMENTO D 
ON U.TN_DEP_ID = D.TN_DEP_ID
GROUP BY D.TC_DEP_NOMBRE`
  );
  return rows;
};