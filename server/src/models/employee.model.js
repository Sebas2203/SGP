import { pool } from "../database/db.js";

export class EmployeeMethods {
  //metodo para mostrar las solicitudes de un empleado en especifico (recibe el ID de dicho usuario)
  static async employeeID(id) {
    const [result] = await pool.query(
      `SELECT 
                s.TN_SOL_ID 'NUMERO SOLICITUD',
                s.TC_SOL_MOTIVO MOTIVO,
                s.TF_SOL_FECHA_INICIO 'FECHA INICIO',
                s.TF_SOL_FECHA_FIN 'FECHA FIN',
                e.TC_EST_NOMBRE ESTADO
            FROM TBSGP_H_SOLICITUD_PERMISO s
            INNER JOIN TBSGP_A_USUARIO u  ON s.TN_USU_ID = u.TN_USU_ID
            INNER JOIN TBSGP_A_ESTADO_SOLICITUD e ON s.TN_EST_ID = e.TN_EST_ID
            WHERE s.TN_USU_ID = ?;`,
      [id],
    );
    return result;
  }

  //metodo para filtrar las solicitudes de un empleado en especifico solicitud

  static async leaveID(id) {
    const [result] = await pool.query(
      `SELECT 
            s.TN_SOL_ID AS 'NUMERO SOLICITUD',
            s.TC_SOL_MOTIVO AS MOTIVO,
            s.TF_SOL_FECHA_INICIO AS 'FECHA INICIO',
            s.TF_SOL_FECHA_FIN AS 'FECHA FIN',
            e.TC_EST_NOMBRE AS ESTADO
        FROM TBSGP_H_SOLICITUD_PERMISO s
    INNER JOIN TBSGP_A_USUARIO u  ON s.TN_USU_ID = u.TN_USU_ID
    INNER JOIN TBSGP_A_ESTADO_SOLICITUD e ON s.TN_EST_ID = e.TN_EST_ID
    WHERE s.TN_SOL_ID = ?;`,
      [id],
    );
    return result;
  }
}
